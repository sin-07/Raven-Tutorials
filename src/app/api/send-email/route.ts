/**
 * Brevo Transactional Email API Route
 * 
 * WHY NODE.JS RUNTIME IS REQUIRED:
 * - Edge runtime has limited Node.js API support
 * - Edge has aggressive timeout limits (25s vs 60s for Node)
 * - Edge runtime can have DNS resolution issues with external APIs
 * - Node.js runtime provides more stable network connections on Vercel
 * 
 * WHY FETCH INSTEAD OF SDK:
 * - Brevo SDK uses axios which has connection pooling issues in serverless
 * - Native fetch is optimized for serverless cold starts
 * - Simpler, smaller bundle size, fewer dependencies
 */

import { NextRequest, NextResponse } from 'next/server';

// Force Node.js runtime - critical for reliable external API calls
export const runtime = 'nodejs';

// Increase function timeout for retries
export const maxDuration = 30;

// Brevo API endpoint for transactional emails
const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

interface BrevoEmailRequest {
  to: string;
  toName?: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
}

interface BrevoApiPayload {
  sender: { name: string; email: string };
  to: { email: string; name: string }[];
  subject: string;
  htmlContent: string;
  textContent?: string;
}

interface BrevoApiResponse {
  messageId?: string;
  code?: string;
  message?: string;
}

/**
 * Send email via Brevo Transactional API with retry logic
 */
async function sendWithBrevo(payload: BrevoApiPayload): Promise<{ success: boolean; data?: BrevoApiResponse; error?: string }> {
  const apiKey = process.env.BREVO_API_KEY;
  
  if (!apiKey) {
    return { success: false, error: 'BREVO_API_KEY not configured' };
  }

  const maxRetries = 3;
  const timeoutMs = 10000; // 10 seconds per attempt

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(BREVO_API_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data: BrevoApiResponse = await response.json().catch(() => ({}));

      if (response.ok) {
        console.log(`✅ Email sent successfully (attempt ${attempt}):`, data.messageId);
        return { success: true, data };
      }

      // Don't retry on 4xx client errors (bad request, unauthorized, etc.)
      if (response.status >= 400 && response.status < 500) {
        console.error(`❌ Brevo client error:`, response.status, data);
        return { success: false, error: data.message || `Client error: ${response.status}` };
      }

      // Server error - will retry
      console.warn(`⚠️ Brevo server error (attempt ${attempt}/${maxRetries}):`, response.status);
      
    } catch (err: any) {
      clearTimeout(timeoutId);
      
      const isTimeout = err.name === 'AbortError';
      const errorMsg = isTimeout ? 'Request timeout' : err.message;
      
      console.warn(`⚠️ Attempt ${attempt}/${maxRetries} failed:`, errorMsg);

      if (attempt === maxRetries) {
        return { success: false, error: `Failed after ${maxRetries} attempts: ${errorMsg}` };
      }
    }

    // Exponential backoff: wait 1s, 2s, 3s between retries
    if (attempt < maxRetries) {
      await new Promise(resolve => setTimeout(resolve, attempt * 1000));
    }
  }

  return { success: false, error: 'Max retries exceeded' };
}

/**
 * POST /api/send-email
 * 
 * Request body:
 * {
 *   "to": "recipient@example.com",
 *   "toName": "Recipient Name",
 *   "subject": "Email Subject",
 *   "htmlContent": "<p>Email HTML content</p>",
 *   "textContent": "Plain text fallback (optional)"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Validate environment variables
    const senderEmail = process.env.BREVO_SENDER_EMAIL;
    const senderName = process.env.BREVO_SENDER_NAME;

    if (!process.env.BREVO_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'Email service not configured (missing API key)' },
        { status: 500 }
      );
    }

    if (!senderEmail) {
      return NextResponse.json(
        { success: false, error: 'Email service not configured (missing sender email)' },
        { status: 500 }
      );
    }

    // Parse request body
    const body: BrevoEmailRequest = await request.json();

    // Validate required fields
    if (!body.to || !body.subject || !body.htmlContent) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: to, subject, htmlContent' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.to)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address format' },
        { status: 400 }
      );
    }

    // Build Brevo API payload
    const payload: BrevoApiPayload = {
      sender: {
        name: senderName || 'Raven Tutorials',
        email: senderEmail,
      },
      to: [
        {
          email: body.to,
          name: body.toName || body.to.split('@')[0],
        },
      ],
      subject: body.subject,
      htmlContent: body.htmlContent,
    };

    if (body.textContent) {
      payload.textContent = body.textContent;
    }

    // Send email
    const result = await sendWithBrevo(payload);

    if (result.success) {
      return NextResponse.json({
        success: true,
        messageId: result.data?.messageId,
        message: 'Email sent successfully',
      });
    }

    return NextResponse.json(
      { success: false, error: result.error },
      { status: 500 }
    );

  } catch (err: any) {
    console.error('❌ Send email route error:', err);
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/send-email - Health check / test endpoint
 */
export async function GET() {
  const isConfigured = !!(
    process.env.BREVO_API_KEY &&
    process.env.BREVO_SENDER_EMAIL
  );

  return NextResponse.json({
    service: 'Brevo Transactional Email',
    configured: isConfigured,
    runtime: 'nodejs',
    sender: isConfigured ? process.env.BREVO_SENDER_EMAIL : null,
  });
}
