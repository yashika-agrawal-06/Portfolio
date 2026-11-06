import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

// Allow dependency injection for testing
let sesClient = null;

function getSesClient() {
  if (sesClient) return sesClient;
  if (!globalThis.__sesClient) {
    globalThis.__sesClient = new SESClient({ region: process.env.AWS_REGION || 'us-east-1' });
  }
  return globalThis.__sesClient;
}

export function __setSesClient(client) {
  sesClient = client;
}

// Shared CORS headers - wildcard for all origins
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
};

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(str) {
  return String(str).replace(/[<>]/g, '').slice(0, 2000);
}

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS' || event.requestContext?.http?.method === 'OPTIONS') {
    return { statusCode: 200, headers: CORS_HEADERS, body: '' };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Invalid JSON' }),
    };
  }

  // Honeypot check - silently drop if filled
  if (body.website && body.website.trim() !== '') {
    return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify({ ok: true }) };
  }

  const { name, email, subject, message } = body;

  // Validation
  const errors = [];
  if (!name || !name.trim()) errors.push('Name is required');
  if (!email || !validateEmail(email)) errors.push('Valid email is required');
  if (!subject || !subject.trim()) errors.push('Subject is required');
  if (!message || !message.trim()) errors.push('Message is required');

  if (errors.length > 0) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Validation failed', details: errors }),
    };
  }

  const sender = process.env.SENDER_EMAIL;
  const recipient = process.env.RECIPIENT_EMAIL;

  const sesParams = {
    Source: sender,
    Destination: { ToAddresses: [recipient] },
    ReplyToAddresses: [email.trim()],
    Message: {
      Subject: { Data: `[Portfolio Contact] ${sanitize(subject.trim())}`, Charset: 'UTF-8' },
      Body: {
        Text: {
          Data: `Name: ${sanitize(name.trim())}\nEmail: ${sanitize(email.trim())}\n\n${sanitize(message.trim())}`,
          Charset: 'UTF-8',
        },
      },
    },
  };

  try {
    const client = getSesClient();
    await client.send(new SendEmailCommand(sesParams));
    return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error('SES send error:', err);
    return { statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Failed to send email' }) };
  }
};
