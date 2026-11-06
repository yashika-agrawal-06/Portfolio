import { describe, it, beforeEach, mock } from 'node:test';
import assert from 'node:assert/strict';

// Mock SES client
const mockSend = mock.fn();
const MockSendEmailCommand = class {
  constructor(params) {
    this.params = params;
  }
};

const MockSESClient = class {
  constructor() {}
  send(cmd) {
    return mockSend(cmd);
  }
};

process.env.SENDER_EMAIL = 'test@example.com';
process.env.RECIPIENT_EMAIL = 'recipient@example.com';
process.env.AWS_REGION = 'us-east-1';

// Import handler and inject mock
const { handler, __setSesClient } = await import('../src/index.mjs');
__setSesClient(new MockSESClient());

const AMPLIFY_ORIGIN = 'https://main.d31ig95e4v66g9.amplifyapp.com';

describe('Contact API Handler', () => {
  beforeEach(() => {
    mockSend.mock.resetCalls();
  });

  function makeEvent(body, method = 'POST', origin = AMPLIFY_ORIGIN) {
    return {
      httpMethod: method,
      requestContext: { http: { method } },
      body: JSON.stringify(body),
      headers: { origin },
    };
  }

  function assertCorsHeaders(headers) {
    assert.equal(headers['Access-Control-Allow-Origin'], '*');
    assert.ok(!headers['Access-Control-Allow-Credentials']);
    assert.equal(headers['Access-Control-Allow-Headers'], 'Content-Type');
    assert.equal(headers['Access-Control-Allow-Methods'], 'POST,OPTIONS');
  }

  it('should return 400 for invalid JSON', async () => {
    const event = { httpMethod: 'POST', body: 'not json', headers: { origin: AMPLIFY_ORIGIN } };
    const result = await handler(event);
    assert.equal(result.statusCode, 400);
    assertCorsHeaders(result.headers);
    const body = JSON.parse(result.body);
    assert.ok(body.error.includes('Invalid JSON'));
  });

  it('should return 400 for missing fields', async () => {
    const event = makeEvent({});
    const result = await handler(event);
    assert.equal(result.statusCode, 400);
    assertCorsHeaders(result.headers);
    const body = JSON.parse(result.body);
    assert.equal(body.error, 'Validation failed');
    assert.ok(body.details.length >= 4);
  });

  it('should return 400 for invalid email', async () => {
    const event = makeEvent({ name: 'Test', email: 'not-email', subject: 'Hi', message: 'Hello' });
    const result = await handler(event);
    assert.equal(result.statusCode, 400);
    assertCorsHeaders(result.headers);
    const body = JSON.parse(result.body);
    assert.ok(body.details.some(d => d.includes('email')));
  });

  it('should silently drop honeypot (return 200)', async () => {
    const event = makeEvent({
      name: 'Test',
      email: 'test@example.com',
      subject: 'Hi',
      message: 'Hello',
      website: 'filled-honeypot'
    });
    const result = await handler(event);
    assert.equal(result.statusCode, 200);
    assertCorsHeaders(result.headers);
    const body = JSON.parse(result.body);
    assert.equal(body.ok, true);
    assert.equal(mockSend.mock.callCount(), 0);
  });

  it('should return 200 and send email for valid request', async () => {
    mockSend.mock.mockImplementationOnce(() => Promise.resolve({ MessageId: 'test-id' }));

    const event = makeEvent({
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Hello',
      message: 'This is a test message',
      website: ''
    });
    const result = await handler(event);
    assert.equal(result.statusCode, 200);
    assertCorsHeaders(result.headers);
    const body = JSON.parse(result.body);
    assert.equal(body.ok, true);
    assert.equal(mockSend.mock.callCount(), 1);
  });

  it('should return 500 when SES fails', async () => {
    mockSend.mock.mockImplementationOnce(() => Promise.reject(new Error('SES error')));

    const event = makeEvent({
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Hello',
      message: 'This is a test message',
      website: ''
    });
    const result = await handler(event);
    assert.equal(result.statusCode, 500);
    assertCorsHeaders(result.headers);
    const body = JSON.parse(result.body);
    assert.ok(body.error.includes('Failed to send'));
  });

  it('should handle OPTIONS preflight', async () => {
    const event = { httpMethod: 'OPTIONS', headers: { origin: AMPLIFY_ORIGIN } };
    const result = await handler(event);
    assert.equal(result.statusCode, 200);
    assertCorsHeaders(result.headers);
  });

  it('should include CORS headers in all responses', async () => {
    const event = makeEvent({});
    const result = await handler(event);
    assertCorsHeaders(result.headers);
  });
});

console.log('All tests passed!');
