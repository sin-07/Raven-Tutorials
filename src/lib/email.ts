/**
 * Brevo Transactional Email Utility
 * 
 * Simple, direct email sending for Vercel serverless
 * Single fetch request with 8s timeout - no retries
 */

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

interface BrevoPayload {
  sender: { name: string; email: string };
  to: { email: string; name: string }[];
  subject: string;
  htmlContent: string;
}

/**
 * Send email via Brevo API
 * - Single request with 8s timeout
 * - Detailed error logging
 * - Returns boolean success/failure
 */
async function sendBrevoEmail(payload: BrevoPayload): Promise<boolean> {
  const apiKey = process.env.BREVO_API_KEY;
  
  if (!apiKey) {
    console.error('❌ BREVO_API_KEY not configured');
    return false;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);
  const startTime = Date.now();

  try {
    const res = await fetch(BREVO_API_URL, {
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

    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      console.log(`✅ Email sent in ${duration}ms:`, data.messageId || 'success');
      return true;
    }

    const errorData = await res.text().catch(() => 'Unable to read response');
    console.error(`❌ Brevo API error ${res.status} (${duration}ms):`, errorData);
    return false;

  } catch (err: any) {
    clearTimeout(timeoutId);
    const duration = Date.now() - startTime;
    
    if (err.name === 'AbortError') {
      console.error(`❌ Request timeout after ${duration}ms - check network/firewall`);
    } else {
      console.error(`❌ Request failed (${duration}ms):`, err.name, err.message);
      if (err.cause) {
        console.error('   Cause:', err.cause);
      }
    }
    return false;
  }
}

function getSender() {
  return {
    name: process.env.BREVO_SENDER_NAME || 'Raven Tutorials',
    email: process.env.BREVO_SENDER_EMAIL || 'noreply@raventutorials.in',
  };
}

// ============================================
// OTP Email
// ============================================

interface SendOTPEmailParams {
  to: string;
  studentName: string;
  otp: string;
}

export async function sendOTPEmail({ to, studentName, otp }: SendOTPEmailParams): Promise<boolean> {
  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;background:#f4f7fa;margin:0;padding:20px">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden">
<div style="background:#2563eb;padding:30px;text-align:center">
<h1 style="color:#fff;margin:0;font-size:24px">RAVEN Tutorials</h1>
</div>
<div style="padding:30px">
<h2 style="color:#1e293b;margin:0 0 16px">Hello ${studentName}!</h2>
<p style="color:#475569;font-size:15px;line-height:1.6">Use the code below to verify your email:</p>
<div style="background:#eff6ff;border:2px solid #2563eb;border-radius:8px;padding:20px;text-align:center;margin:24px 0">
<p style="color:#1e40af;font-size:12px;margin:0 0 8px;font-weight:600">VERIFICATION CODE</p>
<div style="font-size:32px;font-weight:bold;color:#1d4ed8;letter-spacing:6px;font-family:monospace">${otp}</div>
<p style="color:#64748b;font-size:11px;margin:12px 0 0">Expires in 10 minutes</p>
</div>
</div>
<div style="background:#f8fafc;padding:20px;text-align:center;border-top:1px solid #e2e8f0">
<p style="color:#64748b;font-size:12px;margin:0">© ${new Date().getFullYear()} Raven Tutorials</p>
</div>
</div>
</body></html>`;

  const success = await sendBrevoEmail({
    sender: getSender(),
    to: [{ email: to, name: studentName }],
    subject: 'Verify Your Email - Raven Tutorials',
    htmlContent: html,
  });

  console.log(success ? `✓ OTP sent to ${to}` : `✗ OTP failed for ${to}`);
  return success;
}

// ============================================
// Welcome Email
// ============================================

interface SendWelcomeEmailParams {
  to: string;
  studentName: string;
  registrationId: string;
  password: string;
}

export async function sendWelcomeEmail({ to, studentName, registrationId, password }: SendWelcomeEmailParams): Promise<boolean> {
  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;background:#f4f7fa;margin:0;padding:20px">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden">
<div style="background:#2563eb;padding:30px;text-align:center">
<h1 style="color:#fff;margin:0;font-size:24px">RAVEN Tutorials</h1>
</div>
<div style="padding:30px">
<h2 style="color:#1e293b;margin:0 0 16px;text-align:center">Congratulations, ${studentName}!</h2>
<p style="color:#475569;font-size:15px;text-align:center">Your admission is confirmed!</p>
<div style="background:#f0fdf4;border:2px solid #22c55e;border-radius:8px;padding:20px;margin:24px 0">
<h3 style="color:#166534;font-size:14px;margin:0 0 16px;text-align:center">LOGIN CREDENTIALS</h3>
<div style="background:#fff;border-radius:6px;padding:12px;margin-bottom:8px">
<p style="color:#64748b;font-size:11px;margin:0 0 4px">Registration ID</p>
<p style="color:#1e293b;font-size:16px;font-weight:bold;margin:0;font-family:monospace">${registrationId}</p>
</div>
<div style="background:#fff;border-radius:6px;padding:12px;margin-bottom:8px">
<p style="color:#64748b;font-size:11px;margin:0 0 4px">Email</p>
<p style="color:#1e293b;font-size:14px;margin:0">${to}</p>
</div>
<div style="background:#fff;border-radius:6px;padding:12px">
<p style="color:#64748b;font-size:11px;margin:0 0 4px">Password</p>
<p style="color:#1e293b;font-size:16px;font-weight:bold;margin:0;font-family:monospace">${password}</p>
</div>
</div>
<div style="text-align:center;margin:24px 0">
<a href="https://www.raventutorials.in/login" style="display:inline-block;background:#2563eb;color:#fff;text-decoration:none;padding:12px 32px;border-radius:6px;font-weight:600">Login Now →</a>
</div>
</div>
<div style="background:#f8fafc;padding:20px;text-align:center;border-top:1px solid #e2e8f0">
<p style="color:#64748b;font-size:12px;margin:0">© ${new Date().getFullYear()} Raven Tutorials</p>
</div>
</div>
</body></html>`;

  const success = await sendBrevoEmail({
    sender: getSender(),
    to: [{ email: to, name: studentName }],
    subject: 'Welcome to Raven Tutorials - Your Credentials',
    htmlContent: html,
  });

  console.log(success ? `✓ Welcome email sent to ${to}` : `✗ Welcome email failed for ${to}`);
  return success;
}
