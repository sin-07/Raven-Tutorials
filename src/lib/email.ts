import dns from 'node:dns';
// Force IPv4 first so Brevo matches the user's whitelisted IPv4 address
try {
  dns.setDefaultResultOrder?.('ipv4first');
} catch {}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import nodemailer from 'nodemailer';

/**
 * Brevo & SMTP Transactional Email Utility
 * 
 * Supports Brevo API with automatic SMTP fallback (Nodemailer)
 * and detailed development console logging.
 */

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
const TIMEOUT_MS = 9000;

interface BrevoPayload {
  sender: { name: string; email: string };
  to: { email: string; name: string }[];
  subject: string;
  htmlContent: string;
}

function timeout(ms: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`TIMEOUT_${ms}ms`)), ms);
  });
}

/**
 * Send email via SMTP (Gmail or custom SMTP) if configured
 */
async function sendSmtpEmail(to: string, name: string, subject: string, html: string): Promise<boolean> {
  const host = process.env.SMTP_HOST || (process.env.GMAIL_USER ? 'smtp.gmail.com' : '');
  const port = parseInt(process.env.SMTP_PORT || '465');
  const user = process.env.SMTP_USER || process.env.GMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || process.env.GMAIL_PASS;

  if (!host || !user || !pass) {
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      tls: {
        rejectUnauthorized: false
      }
    });

    const senderEmail = process.env.BREVO_SENDER_EMAIL || user;
    await transporter.sendMail({
      from: `"${process.env.BREVO_SENDER_NAME || 'Raven Tutorials'}" <${senderEmail}>`,
      to: `"${name}" <${to}>`,
      subject,
      html
    });

    console.log(`✅ SMTP Email sent successfully to ${to}`);
    return true;
  } catch (err: any) {
    console.error('❌ SMTP dispatch failed:', err.message);
    return false;
  }
}

/**
 * Send email via Brevo API with timeout and SMTP fallback
 */
async function sendBrevoEmail(payload: BrevoPayload): Promise<boolean> {
  // First try SMTP if configured
  const smtpSent = await sendSmtpEmail(
    payload.to[0].email, 
    payload.to[0].name, 
    payload.subject, 
    payload.htmlContent
  );
  if (smtpSent) return true;

  const apiKey = process.env.BREVO_API_KEY;
  
  if (!apiKey) {
    console.error('❌ BREVO_API_KEY not configured');
    return false;
  }

  if (!payload.sender.email || !payload.sender.email.includes('@')) {
    console.error('❌ Invalid sender email:', payload.sender.email);
    return false;
  }

  const startTime = Date.now();
  console.log(`📧 Sending email to ${payload.to[0].email} from ${payload.sender.email}`);

  try {
    const fetchPromise = fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify(payload),
    });

    const res = await Promise.race([fetchPromise, timeout(TIMEOUT_MS)]) as Response;
    const duration = Date.now() - startTime;

    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      console.log(`✅ Email sent in ${duration}ms:`, data.messageId || 'success');
      return true;
    }

    const errorText = await res.text().catch(() => 'Unable to read response');
    console.error(`❌ Brevo API error ${res.status} (${duration}ms):`, errorText);
    
    if (res.status === 401) {
      console.error('   → ⚠️ Brevo Error 401: Unrecognized IP address.');
      console.error('   → To resolve in Brevo: Whitelist your IP at https://app.brevo.com/security/authorised_ips');
      console.error('   → OR configure Gmail/SMTP in .env with GMAIL_USER and GMAIL_APP_PASSWORD');
    } else if (res.status === 400 || res.status === 403) {
      console.error('   → Sender email not verified. Verify at: https://app.brevo.com/settings/senders');
    }
    
    return false;

  } catch (err: any) {
    const duration = Date.now() - startTime;
    if (err.message?.startsWith('TIMEOUT_')) {
      console.error(`❌ Request timeout after ${duration}ms`);
    } else {
      console.error(`❌ Request failed (${duration}ms):`, err.message);
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
// OTP Email (Cartoonish Style)
// ============================================

interface SendOTPEmailParams {
  to: string;
  studentName: string;
  otp: string;
}

export async function sendOTPEmail({ to, studentName, otp }: SendOTPEmailParams): Promise<boolean> {
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Verification OTP - Raven Tutorials</title>
</head>
<body style="font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background-color:#f6fcf8;margin:0;padding:24px 12px;">
  <div style="max-width:520px;margin:0 auto;background-color:#f0fdf4;border-radius:24px;overflow:hidden;border:3px solid #000000;box-shadow:6px 6px 0px #000000;">
    
    <!-- Comic Header Banner -->
    <div style="background-color:#86efac;padding:28px 20px;text-align:center;border-bottom:3px solid #000000;">
      <div style="display:inline-block;background-color:#000000;color:#ffffff;padding:5px 16px;border-radius:999px;font-size:12px;font-weight:900;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:10px;">
        RAVEN TUTORIALS
      </div>
      <h1 style="color:#000000;margin:0;font-size:26px;font-weight:900;letter-spacing:-0.5px;">Email Verification</h1>
      <p style="color:#166534;margin:6px 0 0;font-size:13px;font-weight:700;">Student Admission Portal</p>
    </div>

    <!-- Content Body -->
    <div style="padding:28px 24px;color:#000000;">
      <p style="font-size:16px;margin:0 0 10px;font-weight:800;">Hello <span style="background-color:#dcfce7;border:1.5px solid #000000;padding:2px 8px;border-radius:6px;">${studentName}</span> 👋</p>
      <p style="color:#374151;font-size:14px;line-height:1.6;margin:0 0 20px;font-weight:500;">
        Thank you for starting your admission with Raven Tutorials! Please use the secret 6-digit verification code below to verify your email address:
      </p>

      <!-- Cartoon OTP Box -->
      <div style="background-color:#ffffff;border:3px solid #000000;border-radius:18px;box-shadow:4px 4px 0px #000000;padding:22px;text-align:center;margin:24px 0;">
        <span style="display:inline-block;background-color:#dcfce7;border:1.5px solid #000000;border-radius:6px;padding:3px 10px;font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:1.5px;color:#000000;">
          CONFIRMATION CODE
        </span>
        <div style="font-size:38px;font-weight:900;color:#000000;letter-spacing:8px;font-family:'Courier New',Courier,monospace;margin:12px 0;">
          ${otp}
        </div>
        <p style="margin:0;font-size:12px;font-weight:700;color:#15803d;">
          ⏱ Valid for 10 minutes • Do not share with anyone
        </p>
      </div>

      <!-- Security Notice -->
      <div style="background-color:#ffffff;border:2px solid #000000;border-radius:12px;padding:12px 16px;margin-bottom:20px;">
        <p style="color:#4b5563;font-size:12px;line-height:1.5;margin:0;">
          💡 If you did not request this verification code, you can safely disregard this email.
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color:#e6f9ee;padding:16px;text-align:center;border-top:2px solid #000000;">
      <p style="color:#1f2937;font-size:11px;font-weight:700;margin:0;">
        © ${new Date().getFullYear()} Raven Tutorials • Premier Coaching & LMS
      </p>
    </div>

  </div>
</body>
</html>`;

  // Always log OTP clearly to server console so registration flow can never be blocked
  console.log(`\n======================================================`);
  console.log(`📬 [ADMISSION OTP DISPATCH]`);
  console.log(`📬 Recipient: ${to} (${studentName})`);
  console.log(`📬 OTP CODE:  ${otp}`);
  console.log(`======================================================\n`);

  const success = await sendBrevoEmail({
    sender: getSender(),
    to: [{ email: to, name: studentName }],
    subject: 'Verify Your Email - Raven Tutorials',
    htmlContent: html,
  });

  console.log(success ? `✓ OTP sent to ${to}` : `✗ OTP email delivery failed for ${to}`);
  return success;
}

// ============================================
// Welcome Email & Official Fee Receipt (Cartoonish Style)
// ============================================

export interface SendWelcomeEmailParams {
  to: string;
  studentName: string;
  registrationId: string;
  password: string;
  amount?: number;
  paymentId?: string;
  standard?: string;
  date?: Date | string;
}

export async function sendWelcomeEmail({
  to,
  studentName,
  registrationId,
  password,
  amount = 1000,
  paymentId = '',
  standard = '',
  date = new Date()
}: SendWelcomeEmailParams): Promise<boolean> {
  const receiptNo = `REC-2026-${registrationId.replace(/^RT-/, '')}`;
  const formattedDate = new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Admission Confirmed - Raven Tutorials</title>
</head>
<body style="font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background-color:#f6fcf8;margin:0;padding:24px 12px;">
  <div style="max-width:540px;margin:0 auto;background-color:#f0fdf4;border-radius:24px;overflow:hidden;border:3px solid #000000;box-shadow:6px 6px 0px #000000;">
    
    <!-- Comic Header Banner -->
    <div style="background-color:#86efac;padding:30px 20px;text-align:center;border-bottom:3px solid #000000;">
      <div style="display:inline-block;background-color:#000000;color:#ffffff;padding:5px 16px;border-radius:999px;font-size:12px;font-weight:900;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:10px;">
        RAVEN TUTORIALS
      </div>
      <h1 style="color:#000000;margin:0;font-size:28px;font-weight:900;letter-spacing:-0.5px;">🎉 Admission Confirmed!</h1>
      <p style="color:#166534;margin:6px 0 0;font-size:13px;font-weight:700;">Official Registration & Fee Invoice</p>
    </div>

    <!-- Content Body -->
    <div style="padding:28px 24px;color:#000000;">
      <p style="font-size:16px;margin:0 0 10px;font-weight:800;">
        Welcome to the family, <span style="background-color:#dcfce7;border:1.5px solid #000000;padding:2px 8px;border-radius:6px;">${studentName}</span>! 🚀
      </p>
      <p style="color:#374151;font-size:14px;line-height:1.6;margin:0 0 20px;font-weight:500;">
        Your student profile has been registered and verified. Below are your student portal login credentials and your official payment fee receipt.
      </p>

      <!-- 1. Cartoon Credentials Box -->
      <div style="background-color:#ffffff;border:2.5px solid #000000;border-radius:16px;box-shadow:4px 4px 0px #000000;padding:18px;margin-bottom:24px;">
        <div style="display:inline-block;background-color:#dcfce7;border:1.5px solid #000000;border-radius:6px;padding:3px 10px;font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">
          🔑 STUDENT LOGIN CREDENTIALS
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:13px;">
          <tr style="border-bottom:1.5px dashed #000000;">
            <td style="padding:8px 0;color:#6b7280;font-weight:700;">Registration ID</td>
            <td style="padding:8px 0;text-align:right;font-family:monospace;font-weight:900;color:#000000;font-size:15px;">${registrationId}</td>
          </tr>
          <tr style="border-bottom:1.5px dashed #000000;">
            <td style="padding:8px 0;color:#6b7280;font-weight:700;">Login Email</td>
            <td style="padding:8px 0;text-align:right;font-weight:800;color:#000000;">${to}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#6b7280;font-weight:700;">Password (DOB)</td>
            <td style="padding:8px 0;text-align:right;font-family:monospace;font-weight:900;color:#000000;font-size:15px;">${password}</td>
          </tr>
        </table>
        
        <div style="text-align:center;margin-top:16px;">
          <a href="https://www.raventutorials.in/login" style="display:inline-block;background-color:#4ade80;color:#000000;border:2px solid #000000;box-shadow:3px 3px 0px #000000;padding:10px 24px;border-radius:10px;font-weight:900;text-decoration:none;font-size:13px;">
            Go to Student Login Portal →
          </a>
        </div>
      </div>

      <!-- 2. Cartoon Admission Fee Bill / Receipt Box -->
      <div style="background-color:#ffffff;border:2.5px solid #000000;border-radius:16px;box-shadow:4px 4px 0px #000000;padding:18px;margin-bottom:20px;">
        <table style="width:100%;border-collapse:collapse;margin-bottom:12px;">
          <tr>
            <td style="vertical-align:middle;">
              <span style="display:inline-block;background-color:#bbf7d0;border:1.5px solid #000000;border-radius:6px;padding:3px 10px;font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:1px;">
                🧾 OFFICIAL FEE RECEIPT
              </span>
            </td>
            <td style="vertical-align:middle;text-align:right;">
              <span style="font-size:11px;font-weight:800;color:#374151;font-family:monospace;">
                ${receiptNo}
              </span>
            </td>
          </tr>
        </table>

        <table style="width:100%;border-collapse:collapse;font-size:12px;margin-bottom:12px;">
          <tr>
            <td style="padding:4px 0;color:#6b7280;font-weight:700;">Student:</td>
            <td style="padding:4px 0;text-align:right;font-weight:800;color:#000000;">${studentName}</td>
          </tr>
          ${standard ? `
          <tr>
            <td style="padding:4px 0;color:#6b7280;font-weight:700;">Class / Standard:</td>
            <td style="padding:4px 0;text-align:right;font-weight:800;color:#000000;">${standard}</td>
          </tr>` : ''}
          <tr>
            <td style="padding:4px 0;color:#6b7280;font-weight:700;">Date:</td>
            <td style="padding:4px 0;text-align:right;font-weight:800;color:#000000;">${formattedDate}</td>
          </tr>
          <tr>
            <td style="padding:4px 0;color:#6b7280;font-weight:700;">Payment Mode:</td>
            <td style="padding:4px 0;text-align:right;font-weight:800;color:#000000;">Online (Razorpay)</td>
          </tr>
          ${paymentId ? `
          <tr>
            <td style="padding:4px 0;color:#6b7280;font-weight:700;">Transaction ID:</td>
            <td style="padding:4px 0;text-align:right;font-family:monospace;font-weight:800;color:#000000;">${paymentId}</td>
          </tr>` : ''}
        </table>

        <!-- Itemized Fee Table -->
        <table style="width:100%;border-collapse:collapse;border:2px solid #000000;border-radius:8px;overflow:hidden;margin-bottom:14px;font-size:12px;">
          <thead>
            <tr style="background-color:#dcfce7;border-bottom:2px solid #000000;">
              <th style="padding:8px;text-align:left;font-weight:900;color:#000000;">Particulars</th>
              <th style="padding:8px;text-align:right;font-weight:900;color:#000000;">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid #e5e7eb;">
              <td style="padding:8px;color:#374151;font-weight:600;">Admission & Student LMS Enrollment</td>
              <td style="padding:8px;text-align:right;font-weight:800;color:#000000;">₹${amount}</td>
            </tr>
            <tr style="border-bottom:1.5px solid #000000;">
              <td style="padding:8px;color:#374151;font-weight:600;">Taxes & Educational Surcharge</td>
              <td style="padding:8px;text-align:right;font-weight:800;color:#15803d;">₹0 (Included)</td>
            </tr>
            <tr style="background-color:#f0fdf4;">
              <td style="padding:8px;font-weight:900;color:#000000;font-size:13px;">Total Amount Paid</td>
              <td style="padding:8px;text-align:right;font-weight:900;color:#000000;font-size:14px;">₹${amount}</td>
            </tr>
          </tbody>
        </table>

        <!-- Official Stamp Badge -->
        <div style="text-align:center;padding-top:4px;">
          <div style="display:inline-block;background-color:#dcfce7;border:2px solid #000000;border-radius:8px;padding:6px 14px;font-size:11px;font-weight:900;color:#166534;letter-spacing:1px;box-shadow:2px 2px 0px #000000;">
            PAID & VERIFIED ✓ RAVEN ACADEMIC COUNCIL
          </div>
        </div>
      </div>

    </div>

    <!-- Footer -->
    <div style="background-color:#e6f9ee;padding:16px;text-align:center;border-top:2px solid #000000;">
      <p style="color:#1f2937;font-size:11px;font-weight:700;margin:0;">
        © ${new Date().getFullYear()} Raven Tutorials • All Rights Reserved
      </p>
    </div>

  </div>
</body>
</html>`;

  const success = await sendBrevoEmail({
    sender: getSender(),
    to: [{ email: to, name: studentName }],
    subject: 'Welcome to Raven Tutorials - Your Credentials & Fee Receipt',
    htmlContent: html,
  });

  console.log(success ? `✓ Welcome email sent to ${to}` : `✗ Welcome email failed for ${to}`);
  return success;
}

// ============================================
// Absence Notification Email (Cartoonish Style)
// ============================================

interface SendAbsenceEmailParams {
  to: string;
  studentName: string;
  subject: string;
  date: string;
  className: string;
}

export async function sendAbsenceNotificationEmail({ to, studentName, subject, date, className }: SendAbsenceEmailParams): Promise<boolean> {
  const formattedDate = new Date(date).toLocaleDateString('en-IN', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Attendance Alert - Raven Tutorials</title>
</head>
<body style="font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background-color:#f6fcf8;margin:0;padding:24px 12px;">
  <div style="max-width:520px;margin:0 auto;background-color:#fff1f2;border-radius:24px;overflow:hidden;border:3px solid #000000;box-shadow:6px 6px 0px #000000;">
    
    <!-- Header Banner -->
    <div style="background-color:#fca5a5;padding:28px 20px;text-align:center;border-bottom:3px solid #000000;">
      <div style="display:inline-block;background-color:#000000;color:#ffffff;padding:5px 16px;border-radius:999px;font-size:12px;font-weight:900;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:10px;">
        RAVEN TUTORIALS
      </div>
      <h1 style="color:#000000;margin:0;font-size:26px;font-weight:900;letter-spacing:-0.5px;">⚠️ Attendance Alert</h1>
      <p style="color:#991b1b;margin:6px 0 0;font-size:13px;font-weight:700;">Class Absence Notification</p>
    </div>

    <!-- Content Body -->
    <div style="padding:28px 24px;color:#000000;">
      <p style="font-size:16px;margin:0 0 10px;font-weight:800;">Dear <span style="background-color:#fee2e2;border:1.5px solid #000000;padding:2px 8px;border-radius:6px;">${studentName}</span>,</p>
      <p style="color:#374151;font-size:14px;line-height:1.6;margin:0 0 20px;font-weight:500;">
        This is an official notice to inform you that you were marked <strong style="color:#b91c1c;">ABSENT</strong> for the following scheduled class:
      </p>

      <div style="background-color:#ffffff;border:2.5px solid #000000;border-radius:16px;box-shadow:4px 4px 0px #000000;padding:18px;margin-bottom:20px;">
        <table style="width:100%;border-collapse:collapse;font-size:13px;">
          <tr style="border-bottom:1.5px dashed #000000;">
            <td style="padding:8px 0;color:#6b7280;font-weight:700;">Subject</td>
            <td style="padding:8px 0;text-align:right;font-weight:900;color:#000000;">${subject}</td>
          </tr>
          <tr style="border-bottom:1.5px dashed #000000;">
            <td style="padding:8px 0;color:#6b7280;font-weight:700;">Class</td>
            <td style="padding:8px 0;text-align:right;font-weight:900;color:#000000;">${className}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#6b7280;font-weight:700;">Date</td>
            <td style="padding:8px 0;text-align:right;font-weight:900;color:#b91c1c;">${formattedDate}</td>
          </tr>
        </table>
      </div>

      <div style="background-color:#ffffff;border:2px solid #000000;border-radius:12px;padding:12px 16px;margin-bottom:16px;">
        <p style="color:#4b5563;font-size:12px;line-height:1.5;margin:0;">
          💡 Regular attendance is vital for academic excellence. If this is an error, please reach out to your instructor within 24 hours.
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color:#fee2e2;padding:16px;text-align:center;border-top:2px solid #000000;">
      <p style="color:#1f2937;font-size:11px;font-weight:700;margin:0;">
        © ${new Date().getFullYear()} Raven Tutorials • Attendance Management
      </p>
    </div>

  </div>
</body>
</html>`;

  const success = await sendBrevoEmail({
    sender: getSender(),
    to: [{ email: to, name: studentName }],
    subject: `Attendance Alert: Absent on ${formattedDate}`,
    htmlContent: html,
  });

  console.log(success ? `✓ Absence notification sent to ${to}` : `✗ Absence notification failed for ${to}`);
  return success;
}

// ============================================
// Test Result Email (Cartoonish Style)
// ============================================

interface SendTestResultEmailParams {
  to: string;
  studentName: string;
  testTitle: string;
  subject: string;
  marksObtained: number;
  totalMarks: number;
  passingMarks: number;
  status: 'Pass' | 'Fail';
  submittedAt: Date;
  violationsCount?: number;
}

export async function sendTestResultEmail({
  to,
  studentName,
  testTitle,
  subject,
  marksObtained,
  totalMarks,
  passingMarks,
  status,
  submittedAt,
  violationsCount = 0
}: SendTestResultEmailParams): Promise<boolean> {
  const formattedDate = submittedAt.toLocaleDateString('en-IN', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const percentage = ((marksObtained / totalMarks) * 100).toFixed(2);
  const isPassed = status === 'Pass';

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Test Result - Raven Tutorials</title>
</head>
<body style="font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background-color:#f6fcf8;margin:0;padding:24px 12px;">
  <div style="max-width:520px;margin:0 auto;background-color:#f0fdf4;border-radius:24px;overflow:hidden;border:3px solid #000000;box-shadow:6px 6px 0px #000000;">
    
    <!-- Comic Header Banner -->
    <div style="background-color:${isPassed ? '#86efac' : '#fca5a5'};padding:28px 20px;text-align:center;border-bottom:3px solid #000000;">
      <div style="display:inline-block;background-color:#000000;color:#ffffff;padding:5px 16px;border-radius:999px;font-size:12px;font-weight:900;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:10px;">
        RAVEN TUTORIALS
      </div>
      <h1 style="color:#000000;margin:0;font-size:26px;font-weight:900;letter-spacing:-0.5px;">Test Completed!</h1>
      <p style="color:#166534;margin:6px 0 0;font-size:13px;font-weight:700;">Academic Performance Report</p>
    </div>

    <!-- Content Body -->
    <div style="padding:28px 24px;color:#000000;">
      <p style="font-size:16px;margin:0 0 10px;font-weight:800;">Dear <span style="background-color:#dcfce7;border:1.5px solid #000000;padding:2px 8px;border-radius:6px;">${studentName}</span>,</p>
      <p style="color:#374151;font-size:14px;line-height:1.6;margin:0 0 20px;font-weight:500;">
        Your submission for <strong>${testTitle}</strong> (${subject}) has been evaluated:
      </p>

      <!-- Score Card -->
      <div style="background-color:#ffffff;border:2.5px solid #000000;border-radius:16px;box-shadow:4px 4px 0px #000000;padding:18px;margin-bottom:20px;">
        <table style="width:100%;border-collapse:collapse;margin-bottom:14px;">
          <tr>
            <td>
              <span style="font-size:11px;font-weight:900;color:#6b7280;text-transform:uppercase;">Score Obtained</span>
              <div style="font-size:28px;font-weight:900;color:#000000;">${marksObtained} / ${totalMarks}</div>
            </td>
            <td style="text-align:right;">
              <span style="font-size:11px;font-weight:900;color:#6b7280;text-transform:uppercase;">Percentage</span>
              <div style="font-size:28px;font-weight:900;color:#000000;">${percentage}%</div>
            </td>
          </tr>
        </table>

        <div style="text-align:center;padding-top:8px;border-top:1.5px dashed #000000;">
          <div style="display:inline-block;background-color:${isPassed ? '#4ade80' : '#f87171'};color:#000000;border:2px solid #000000;border-radius:8px;padding:6px 20px;font-size:14px;font-weight:900;box-shadow:2px 2px 0px #000000;">
            ${isPassed ? 'RESULT: PASSED 🎉' : 'RESULT: NEEDS IMPROVEMENT 💪'}
          </div>
        </div>
      </div>

      <p style="color:#4b5563;font-size:13px;line-height:1.6;margin:0;">
        ${isPassed ? '⭐ Excellent performance! Keep practicing to maintain your high score.' : '📚 Keep your chin up! Review the solution key in your portal and take the practice test again.'}
      </p>
    </div>

    <!-- Footer -->
    <div style="background-color:#e6f9ee;padding:16px;text-align:center;border-top:2px solid #000000;">
      <p style="color:#1f2937;font-size:11px;font-weight:700;margin:0;">
        © ${new Date().getFullYear()} Raven Tutorials • Online Test Center
      </p>
    </div>

  </div>
</body>
</html>`;

  const emailSuccess = await sendBrevoEmail({
    sender: getSender(),
    to: [{ email: to, name: studentName }],
    subject: `Test Result: ${testTitle} - ${status}`,
    htmlContent: html,
  });

  console.log(emailSuccess ? `✓ Test result sent to ${to}` : `✗ Test result email failed for ${to}`);
  return emailSuccess;
}
