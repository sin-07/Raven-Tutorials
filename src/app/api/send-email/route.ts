/**
 * Brevo Transactional Email API Route
 * 
 * CRITICAL: Node.js runtime required for stable external API calls
 * Edge runtime causes DNS/timeout issues with Brevo API
 */

import { NextRequest, NextResponse } from 'next/server';

// MUST use Node.js runtime - Edge has network reliability issues
export const runtime = 'nodejs';
export const maxDuration = 10;

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
/**
 * Send email via Brevo with 8s timeout
 */
async function sendWithBrevo(payload: BrevoApiPayload): Promise<{ success: boolean; data?: BrevoApiResponse; error?: string }> {
  const apiKey = process.env.BREVO_API_KEY;
  
  if (!apiKey) {
    return { success: false, error: 'BREVO_API_KEY not configured' };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);
  const startTime = Date.now();

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
    const duration = Date.now() - startTime;

    const data: BrevoApiResponse = await response.json().catch(() => ({}));

    if (response.ok) {
      console.log(`✅ Email sent in ${duration}ms:`, data.messageId);
      return { success: true, data };
    }

    console.error(`❌ Brevo error ${response.status} (${duration}ms):`, data);
    return { success: false, error: data.message || `API error: ${response.status}` };

  } catch (err: any) {
    clearTimeout(timeoutId);
    const duration = Date.now() - startTime;
    
    if (err.name === 'AbortError') {
      const error = `Request timeout after ${duration}ms`;
      console.error(`❌ ${error}`);
      return { success: false, error };
    }
    
    const error = `${err.name}: ${err.message}`;
    console.error(`❌ Request failed (${duration}ms):`, error);
    if (err.cause) {
      console.error('   Cause:', err.cause);
    }
    return { success: false, error };
  }
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
