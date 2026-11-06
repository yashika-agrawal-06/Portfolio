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

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(str) {
  return String(str).replace(/[<>]/g, '').slice(0, 2000);
}

// Parse comma-separated ALLOWED_ORIGINS and return matching origin or first allowed
function getCorsOrigin(requestOrigin) {
  const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map(o => o.trim())
    .filter(Boolean);
  
  if (allowedOrigins.length === 0) return '*';
  
  // If request origin is in allowed list, echo it back
  if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
    return requestOrigin;
  }
  
  // Default to first allowed origin
  return allowedOrigins[0];
}

function corsHeaders(requestOrigin) {
  return {
    'Access-Control-Allow-Origin': getCorsOrigin(requestOrigin),
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
  };
}

export const handler = async (event) => {
  const requestOrigin = event.headers?.origin || event.headers?.Origin || '';
  
  if (event.httpMethod === 'OPTIONS' || event.requestContext?.http?.method === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders(requestOrigin), body: '' };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      headers: corsHeaders(requestOrigin),
      body: JSON.stringify({ error: 'Invalid JSON' }),
    };
  }

  // Honeypot check - silently drop if filled
  if (body.website && body.website.trim() !== '') {
    return { statusCode: 200, headers: corsHeaders(requestOrigin), body: JSON.stringify({ ok: true }) };
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
      headers: corsHeaders(requestOrigin),
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
    return { statusCode: 200, headers: corsHeaders(requestOrigin), body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error('SES send error:', err);
    return { statusCode: 500, headers: corsHeaders(requestOrigin), body: JSON.stringify({ error: 'Failed to send email' }) };
  }
};
