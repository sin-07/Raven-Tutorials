import * as brevo from '@getbrevo/brevo';

// Types
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

// Initialize Brevo API client
function getBrevoClient(): brevo.TransactionalEmailsApi {
  const apiInstance = new brevo.TransactionalEmailsApi();
  apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY || ''
  );
  return apiInstance;
}

// OTP Email Template
function getOTPEmailHTML(studentName: string, otp: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f7fa; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <div style="background: #2563eb; padding: 30px; text-align: center;">
      <h1 style="color: #fff; margin: 0; font-size: 24px;">RAVEN Tutorials</h1>
      <p style="color: #bfdbfe; margin: 8px 0 0; font-size: 14px;">Excellence in Education</p>
    </div>
    <div style="padding: 30px;">
      <h2 style="color: #1e293b; margin: 0 0 16px;">Hello ${studentName}!</h2>
      <p style="color: #475569; font-size: 15px; line-height: 1.6;">
        Thank you for applying to Raven Tutorials! Use the code below to verify your email.
      </p>
      <div style="background: #eff6ff; border: 2px solid #2563eb; border-radius: 8px; padding: 20px; text-align: center; margin: 24px 0;">
        <p style="color: #1e40af; font-size: 12px; margin: 0 0 8px; font-weight: 600;">VERIFICATION CODE</p>
        <div style="font-size: 32px; font-weight: bold; color: #1d4ed8; letter-spacing: 6px; font-family: monospace;">
          ${otp}
        </div>
        <p style="color: #64748b; font-size: 11px; margin: 12px 0 0;">Expires in 10 minutes</p>
      </div>
      <p style="color: #64748b; font-size: 13px;">
        If you didn't request this, please ignore this email.
      </p>
    </div>
    <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
      <p style="color: #64748b; font-size: 12px; margin: 0;">Bajrangpuri, Patna - 800007 | +91 8618281816</p>
      <p style="color: #94a3b8; font-size: 11px; margin: 8px 0 0;">© ${new Date().getFullYear()} Raven Tutorials</p>
    </div>
  </div>
</body>
</html>`;
}

// Welcome Email Template
function getWelcomeEmailHTML(studentName: string, to: string, registrationId: string, password: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f7fa; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <div style="background: #2563eb; padding: 30px; text-align: center;">
      <h1 style="color: #fff; margin: 0; font-size: 24px;">RAVEN Tutorials</h1>
      <p style="color: #bfdbfe; margin: 8px 0 0; font-size: 14px;">Welcome to Excellence</p>
    </div>
    <div style="padding: 30px;">
      <h2 style="color: #1e293b; margin: 0 0 16px; text-align: center;">Congratulations, ${studentName}!</h2>
      <p style="color: #475569; font-size: 15px; line-height: 1.6; text-align: center;">
        Your admission is confirmed! Welcome to the Raven Tutorials family.
      </p>
      <div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 8px; padding: 20px; margin: 24px 0;">
        <h3 style="color: #166534; font-size: 14px; margin: 0 0 16px; text-align: center;">YOUR LOGIN CREDENTIALS</h3>
        <div style="background: #fff; border-radius: 6px; padding: 12px; margin-bottom: 8px;">
          <p style="color: #64748b; font-size: 11px; margin: 0 0 4px;">Registration ID</p>
          <p style="color: #1e293b; font-size: 16px; font-weight: bold; margin: 0; font-family: monospace;">${registrationId}</p>
        </div>
        <div style="background: #fff; border-radius: 6px; padding: 12px; margin-bottom: 8px;">
          <p style="color: #64748b; font-size: 11px; margin: 0 0 4px;">Email</p>
          <p style="color: #1e293b; font-size: 14px; font-weight: 600; margin: 0;">${to}</p>
        </div>
        <div style="background: #fff; border-radius: 6px; padding: 12px;">
          <p style="color: #64748b; font-size: 11px; margin: 0 0 4px;">Password (Date of Birth)</p>
          <p style="color: #1e293b; font-size: 16px; font-weight: bold; margin: 0; font-family: monospace;">${password}</p>
        </div>
      </div>
      <div style="text-align: center; margin: 24px 0;">
        <a href="https://www.raventutorials.in/login" style="display: inline-block; background: #2563eb; color: #fff; text-decoration: none; padding: 12px 32px; border-radius: 6px; font-weight: 600; font-size: 14px;">
          Login to Dashboard →
        </a>
      </div>
      <p style="color: #64748b; font-size: 13px; text-align: center;">
        Keep your credentials safe. Do not share with anyone.
      </p>
    </div>
    <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
      <p style="color: #64748b; font-size: 12px; margin: 0;">Bajrangpuri, Patna - 800007 | +91 8618281816</p>
      <p style="color: #94a3b8; font-size: 11px; margin: 8px 0 0;">© ${new Date().getFullYear()} Raven Tutorials</p>
    </div>
  </div>
</body>
</html>`;
}

// Send OTP Email
export async function sendOTPEmail({ to, studentName, otp }: SendOTPEmailParams): Promise<boolean> {
  try {
    const apiInstance = getBrevoClient();
    const sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.subject = 'Verify Your Email - Raven Tutorials';
    sendSmtpEmail.htmlContent = getOTPEmailHTML(studentName, otp);
    sendSmtpEmail.sender = {
      name: process.env.BREVO_SENDER_NAME || 'Raven Tutorials',
      email: process.env.BREVO_SENDER_EMAIL || 'raventutorials@gmail.com'
    };
    sendSmtpEmail.to = [{ email: to, name: studentName }];

    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(`✓ OTP email sent to ${to}`);
    return true;
  } catch (error: any) {
    console.error(`✗ OTP email failed for ${to}:`, error?.body?.message || error.message);
    return false;
  }
}

// Send Welcome Email
export async function sendWelcomeEmail({ to, studentName, registrationId, password }: SendWelcomeEmailParams): Promise<boolean> {
  try {
    const apiInstance = getBrevoClient();
    const sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.subject = 'Welcome to Raven Tutorials - Your Credentials';
    sendSmtpEmail.htmlContent = getWelcomeEmailHTML(studentName, to, registrationId, password);
    sendSmtpEmail.sender = {
      name: process.env.BREVO_SENDER_NAME || 'Raven Tutorials',
      email: process.env.BREVO_SENDER_EMAIL || 'raventutorials@gmail.com'
    };
    sendSmtpEmail.to = [{ email: to, name: studentName }];

    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(`✓ Welcome email sent to ${to}`);
    return true;
  } catch (error: any) {
    console.error(`✗ Welcome email failed for ${to}:`, error?.body?.message || error.message);
    return false;
  }
}
