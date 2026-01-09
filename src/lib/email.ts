// Native fetch implementation for Brevo - works reliably in Vercel serverless

interface SendOTPEmailParams {
  to: string;
  studentName: string;
  otp: string;
}

interface SendWelcomeEmailParams {
  to: string;
  studentName: string;
  registrationId: string;
  password: string;
}

interface BrevoEmailPayload {
  sender: { name: string; email: string };
  to: { email: string; name: string }[];
  subject: string;
  htmlContent: string;
}

async function sendBrevoEmail(payload: BrevoEmailPayload): Promise<boolean> {
  const apiKey = process.env.BREVO_API_KEY;
  
  if (!apiKey) {
    console.error('BREVO_API_KEY not configured');
    return false;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000); // 30s timeout

  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      console.log('Brevo success:', data.messageId || 'sent');
      return true;
    }

    const error = await res.text();
    console.error('Brevo API error:', res.status, error);
    return false;
  } catch (err: any) {
    clearTimeout(timeout);
    if (err.name === 'AbortError') {
      console.error('Brevo request timed out after 30s');
    } else {
      console.error('Brevo request failed:', err.name, err.message, err.cause?.code || '');
    }
    return false;
  }
}

function getOTPEmailHTML(studentName: string, otp: string): string {
  return `<!DOCTYPE html>
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
}

function getWelcomeEmailHTML(studentName: string, to: string, registrationId: string, password: string): string {
  return `<!DOCTYPE html>
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
<a href="https://www.raventutorials.in/login" style="display:inline-block;background:#2563eb;color:#fff;text-decoration:none;padding:12px 32px;border-radius:6px;font-weight:600">Login →</a>
</div>
</div>
<div style="background:#f8fafc;padding:20px;text-align:center;border-top:1px solid #e2e8f0">
<p style="color:#64748b;font-size:12px;margin:0">© ${new Date().getFullYear()} Raven Tutorials</p>
</div>
</div>
</body></html>`;
}

export async function sendOTPEmail({ to, studentName, otp }: SendOTPEmailParams): Promise<boolean> {
  const success = await sendBrevoEmail({
    sender: {
      name: process.env.BREVO_SENDER_NAME || 'Raven Tutorials',
      email: process.env.BREVO_SENDER_EMAIL || 'raventutorials@gmail.com'
    },
    to: [{ email: to, name: studentName }],
    subject: 'Verify Your Email - Raven Tutorials',
    htmlContent: getOTPEmailHTML(studentName, otp)
  });

  console.log(success ? `✓ OTP sent to ${to}` : `✗ OTP failed for ${to}`);
  return success;
}

export async function sendWelcomeEmail({ to, studentName, registrationId, password }: SendWelcomeEmailParams): Promise<boolean> {
  const success = await sendBrevoEmail({
    sender: {
      name: process.env.BREVO_SENDER_NAME || 'Raven Tutorials',
      email: process.env.BREVO_SENDER_EMAIL || 'raventutorials@gmail.com'
    },
    to: [{ email: to, name: studentName }],
    subject: 'Welcome to Raven Tutorials - Your Credentials',
    htmlContent: getWelcomeEmailHTML(studentName, to, registrationId, password)
  });

  console.log(success ? `✓ Welcome email sent to ${to}` : `✗ Welcome email failed for ${to}`);
  return success;
}
