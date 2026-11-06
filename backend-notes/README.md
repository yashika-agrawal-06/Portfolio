# Backend Setup: Contact Form API

This document describes how to set up the backend for the contact form using **AWS Lambda + API Gateway + Amazon SES**.

## Architecture Overview

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐     ┌─────────────┐
│  Frontend   │────▶│ API Gateway  │────▶│   Lambda    │────▶│ Amazon SES  │
│  (React)    │     │  (REST API)  │     │  (Node.js)  │     │  (Email)    │
└─────────────┘     └──────────────┘     └─────────────┘     └─────────────┘
                           │                    │
                           ▼                    ▼
                    ┌──────────────┐     ┌─────────────┐
                    │  CloudWatch  │     │  DynamoDB   │
                    │    Logs      │     │  (Optional) │
                    └──────────────┘     └─────────────┘
```

## Prerequisites

- AWS Account with appropriate permissions
- AWS CLI configured (`aws configure`)
- Node.js 18+ installed
- Verified email address/domain in Amazon SES

## Step 1: Verify Email in Amazon SES

1. Go to **Amazon SES Console** → **Verified identities**
2. Click **Create identity** → **Email address**
3. Enter your email (e.g., `yashika@example.com`)
4. Check your email and click the verification link
5. **Optional**: For production, request **Production Access** to send to unverified emails

## Step 2: Create Lambda Function

### 2.1 Create the Function Code

Create a directory and file structure:

```
contact-api/
├── package.json
├── index.js
└── .gitignore
```

**package.json:**
```json
{
  "name": "contact-api",
  "version": "1.0.0",
  "description": "Contact form handler for portfolio",
  "main": "index.js",
  "dependencies": {
    "@aws-sdk/client-ses": "^3.450.0",
    "@aws-sdk/client-dynamodb": "^3.450.0",
    "@aws-sdk/lib-dynamodb": "^3.450.0"
  }
}
```

**index.js:**
```javascript
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const ses = new SESClient({ region: process.env.AWS_REGION || "us-east-1" });
const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({ region: process.env.AWS_REGION || "us-east-1" }));

const FROM_EMAIL = process.env.FROM_EMAIL; // Verified SES identity
const TO_EMAIL = process.env.TO_EMAIL;     // Where you receive messages
const TABLE_NAME = process.env.TABLE_NAME; // Optional: DynamoDB table for logging

export const handler = async (event) => {
  console.log("Received event:", JSON.stringify(event, null, 2));

  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return corsResponse(200, {});
  }

  try {
    // Parse body
    const body = event.body ? JSON.parse(event.body) : {};
    const { name, email, subject, message } = body;

    // Validate input
    const errors = validateInput({ name, email, subject, message });
    if (errors.length > 0) {
      return corsResponse(400, { success: false, message: "Validation failed", errors });
    }

    // Send email via SES
    await sendEmail({ name, email, subject, message });

    // Optionally log to DynamoDB
    if (TABLE_NAME) {
      await logSubmission({ name, email, subject, message });
    }

    return corsResponse(200, { 
      success: true, 
      message: "Message sent successfully!" 
    });

  } catch (error) {
    console.error("Error:", error);
    return corsResponse(500, { 
      success: false, 
      message: error.message || "Internal server error" 
    });
  }
};

function validateInput(data) {
  const errors = [];
  if (!data.name?.trim()) errors.push("Name is required");
  if (!data.email?.trim()) errors.push("Email is required");
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push("Invalid email format");
  if (!data.subject?.trim()) errors.push("Subject is required");
  if (!data.message?.trim()) errors.push("Message is required");
  else if (data.message.trim().length < 10) errors.push("Message must be at least 10 characters");
  return errors;
}

async function sendEmail({ name, email, subject, message }) {
  const command = new SendEmailCommand({
    Source: FROM_EMAIL,
    Destination: { ToAddresses: [TO_EMAIL] },
    ReplyToAddresses: [email],
    Message: {
      Subject: { Data: `[Portfolio] ${subject}`, Charset: "UTF-8" },
      Body: {
        Text: {
          Data: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
          Charset: "UTF-8"
        },
        Html: {
          Data: `
            <h2>New Portfolio Contact</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>
          `,
          Charset: "UTF-8"
        }
      }
    }
  });
  await ses.send(command);
}

async function logSubmission(data) {
  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: {
      id: crypto.randomUUID(),
      ...data,
      timestamp: new Date().toISOString(),
      source: "portfolio-contact-form"
    }
  });
  await ddb.send(command);
}

function corsResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  };
}
```

### 2.2 Deploy Lambda

```bash
cd contact-api
npm install
zip -r function.zip .
aws lambda create-function \
  --function-name portfolio-contact-form \
  --runtime nodejs18.x \
  --handler index.handler \
  --zip-file fileb://function.zip \
  --role arn:aws:iam::YOUR_ACCOUNT_ID:role/lambda-ses-role \
  --environment Variables={FROM_EMAIL=verified@example.com,TO_EMAIL=your@email.com,AWS_REGION=us-east-1,TABLE_NAME=portfolio-contacts}
```

### 2.3 Create IAM Role for Lambda

Create a role with these policies:
- `AWSLambdaBasicExecutionRole`
- `AmazonSESFullAccess` (or custom policy for `ses:SendEmail`)
- `AmazonDynamoDBFullAccess` (if using DynamoDB logging)

## Step 3: Create API Gateway

### 3.1 Create REST API

```bash
aws apigateway create-rest-api \
  --name portfolio-contact-api \
  --endpoint-configuration types=REGIONAL
```

Note the `id` from the response (e.g., `abc123xyz`).

### 3.2 Create Resource & Method

```bash
# Get parent resource ID
aws apigateway get-resources --rest-api-id abc123xyz

# Create /contact resource
aws apigateway create-resource \
  --rest-api-id abc123xyz \
  --parent-id PARENT_ID \
  --path-part contact

# Create POST method
aws apigateway put-method \
  --rest-api-id abc123xyz \
  --resource-id RESOURCE_ID \
  --http-method POST \
  --authorization-type NONE

# Create OPTIONS method for CORS
aws apigateway put-method \
  --rest-api-id abc123xyz \
  --resource-id RESOURCE_ID \
  --http-method OPTIONS \
  --authorization-type NONE
```

### 3.3 Integrate with Lambda

```bash
# Add Lambda integration
aws apigateway put-integration \
  --rest-api-id abc123xyz \
  --resource-id RESOURCE_ID \
  --http-method POST \
  --type AWS_PROXY \
  --integration-http-method POST \
  --uri arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:YOUR_ACCOUNT_ID:function:portfolio-contact-form/invocations

# Add Lambda permission for API Gateway
aws lambda add-permission \
  --function-name portfolio-contact-form \
  --statement-id apigateway-invoke \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:us-east-1:YOUR_ACCOUNT_ID:abc123xyz/*/POST/contact"
```

### 3.4 Enable CORS

```bash
# Add OPTIONS integration
aws apigateway put-integration \
  --rest-api-id abc123xyz \
  --resource-id RESOURCE_ID \
  --http-method OPTIONS \
  --type MOCK \
  --request-templates '{"application/json": "{\"statusCode\": 200}"}'

# Add OPTIONS method response
aws apigateway put-method-response \
  --rest-api-id abc123xyz \
  --resource-id RESOURCE_ID \
  --http-method OPTIONS \
  --status-code 200 \
  --response-parameters '{"method.response.header.Access-Control-Allow-Headers": true, "method.response.header.Access-Control-Allow-Methods": true, "method.response.header.Access-Control-Allow-Origin": true}'

aws apigateway put-integration-response \
  --rest-api-id abc123xyz \
  --resource-id RESOURCE_ID \
  --http-method OPTIONS \
  --status-code 200 \
  --response-parameters '{"method.response.header.Access-Control-Allow-Headers": "\"Content-Type\"", "method.response.header.Access-Control-Allow-Methods": "\"POST, OPTIONS\"", "method.response.header.Access-Control-Allow-Origin": "\"*\""}'
```

### 3.5 Deploy API

```bash
aws apigateway create-deployment \
  --rest-api-id abc123xyz \
  --stage-name prod
```

Your API URL will be: `https://abc123xyz.execute-api.us-east-1.amazonaws.com/prod/contact`

## Step 4: Configure Frontend

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your API URL:
   ```
   VITE_CONTACT_API_URL=https://abc123xyz.execute-api.us-east-1.amazonaws.com/prod/contact
   ```

3. Rebuild and deploy:
   ```bash
   npm run build
   ```

## Step 5: Optional - DynamoDB Table for Logging

```bash
aws dynamodb create-table \
  --table-name portfolio-contacts \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST
```

Update Lambda environment variable `TABLE_NAME=portfolio-contacts`.

## Testing

### Test Lambda Directly
```bash
aws lambda invoke \
  --function-name portfolio-contact-form \
  --payload '{"name":"Test","email":"test@example.com","subject":"Test","message":"Hello world this is a test message"}' \
  response.json
```

### Test API Endpoint
```bash
curl -X POST https://abc123xyz.execute-api.us-east-1.amazonaws.com/prod/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Hello world this is a test message"}'
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| CORS errors | Verify OPTIONS method and integration responses |
| SES "Email not verified" | Verify sender email in SES console |
| Lambda timeout | Increase timeout (default 3s, set to 10-30s) |
| 502 Bad Gateway | Check Lambda logs in CloudWatch |
| 403 Forbidden | Check Lambda resource policy for API Gateway |

## Cost Estimation (Monthly)

| Service | Free Tier | Estimated Cost (Low Volume) |
|---------|-----------|------------------------------|
| Lambda | 1M requests | ~$0.00 |
| API Gateway | 1M requests | ~$0.00 |
| SES | 62K emails | ~$0.00 |
| DynamoDB | 25 GB storage | ~$0.00 |
| CloudWatch | 10 custom metrics | ~$0.00 |

**Total: Essentially free for portfolio-level traffic**

## Security Considerations

- ✅ CORS configured for specific origin (update in production)
- ✅ Input validation on both client and server
- ✅ SES sandbox mode limits sending to verified emails
- ✅ No sensitive data in frontend code
- ⚠️ Consider adding rate limiting (API Gateway usage plans)
- ⚠️ Consider adding honeypot field for spam protection
- ⚠️ For production: Use custom domain + WAF

## Alternative: Serverless Framework

For easier deployment, consider the Serverless Framework:

```yaml
# serverless.yml
service: portfolio-contact

provider:
  name: aws
  runtime: nodejs18.x
  region: us-east-1
  environment:
    FROM_EMAIL: ${env:FROM_EMAIL}
    TO_EMAIL: ${env:TO_EMAIL}

functions:
  contact:
    handler: index.handler
    events:
      - http:
          path: contact
          method: post
          cors: true
      - http:
          path: contact
          method: options
          cors: true
```

Deploy with: `serverless deploy`

## Support

For issues, check:
- CloudWatch Logs: `/aws/lambda/portfolio-contact-form`
- API Gateway CloudWatch Logs
- SES Sending Statistics