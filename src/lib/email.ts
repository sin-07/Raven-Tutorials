import * as brevo from '@getbrevo/brevo';

// Lazy initialization - will be set when first email is sent
let apiInstance: brevo.TransactionalEmailsApi | null = null;

function getBrevoInstance(): brevo.TransactionalEmailsApi {
  if (!apiInstance) {
    apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY || '');
  }
  return apiInstance;
}

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

export async function sendOTPEmail({ to, studentName, otp }: SendOTPEmailParams): Promise<boolean> {
  try {
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    
    sendSmtpEmail.subject = 'Verify Your Email - Raven Tutorials Admission';
    sendSmtpEmail.sender = {
      name: process.env.BREVO_SENDER_NAME || 'Raven Tutorials',
      email: process.env.BREVO_SENDER_EMAIL || 'raventutorials@gmail.com'
    };
    sendSmtpEmail.to = [{ email: to, name: studentName }];
    sendSmtpEmail.htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification - Raven Tutorials</title>
      </head>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">RAVEN Tutorials</h1>
            <p style="color: #bfdbfe; margin: 10px 0 0; font-size: 14px;">Excellence in Education</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #1e293b; margin: 0 0 20px; font-size: 24px;">Hello ${studentName}!</h2>
            
            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 25px;">
              Thank you for applying to Raven Tutorials! Please use the verification code below to confirm your email address and proceed with your admission.
            </p>
            
            <!-- OTP Box -->
            <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border: 2px solid #2563eb; border-radius: 12px; padding: 25px; text-align: center; margin: 30px 0;">
              <p style="color: #1e40af; font-size: 14px; margin: 0 0 10px; font-weight: 600;">YOUR VERIFICATION CODE</p>
              <div style="font-size: 36px; font-weight: 800; color: #1d4ed8; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                ${otp}
              </div>
              <p style="color: #64748b; font-size: 12px; margin: 15px 0 0;">
                This code expires in 10 minutes
              </p>
            </div>
            
            <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 25px 0 0;">
              <strong>Security Notice:</strong> If you didn't request this code, please ignore this email. Do not share this code with anyone.
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f8fafc; padding: 25px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 13px; margin: 0 0 10px;">
              Bajrangpuri, Patna - 800007
            </p>
            <p style="color: #64748b; font-size: 13px; margin: 0 0 10px;">
              +91 8618281816 | raventutorials@gmail.com
            </p>
            <p style="color: #94a3b8; font-size: 12px; margin: 15px 0 0;">
              © ${new Date().getFullYear()} Raven Tutorials. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    await getBrevoInstance().sendTransacEmail(sendSmtpEmail);
    console.log(`OTP email sent successfully to ${to}`);
    return true;
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return false;
  }
}

export async function sendWelcomeEmail({ to, studentName, registrationId, password }: SendWelcomeEmailParams): Promise<boolean> {
  try {
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    
    sendSmtpEmail.subject = 'Welcome to Raven Tutorials! Your Login Credentials';
    sendSmtpEmail.sender = {
      name: process.env.BREVO_SENDER_NAME || 'Raven Tutorials',
      email: process.env.BREVO_SENDER_EMAIL || 'raventutorials@gmail.com'
    };
    sendSmtpEmail.to = [{ email: to, name: studentName }];
    sendSmtpEmail.htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Raven Tutorials</title>
      </head>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">RAVEN Tutorials</h1>
            <p style="color: #bfdbfe; margin: 10px 0 0; font-size: 14px;">Welcome to Excellence</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            
            <h2 style="color: #1e293b; margin: 0 0 20px; font-size: 24px; text-align: center;">
              Congratulations, ${studentName}!
            </h2>
            
            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 25px; text-align: center;">
              Your admission has been confirmed! Welcome to the Raven Tutorials family. We're excited to have you on board.
            </p>
            
            <!-- Credentials Box -->
            <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border: 2px solid #22c55e; border-radius: 12px; padding: 25px; margin: 30px 0;">
              <h3 style="color: #166534; font-size: 16px; margin: 0 0 20px; text-align: center;">YOUR LOGIN CREDENTIALS</h3>
              
              <div style="background: white; border-radius: 8px; padding: 15px; margin-bottom: 10px;">
                <p style="color: #64748b; font-size: 12px; margin: 0 0 5px;">Registration ID</p>
                <p style="color: #1e293b; font-size: 18px; font-weight: 700; margin: 0; font-family: 'Courier New', monospace;">${registrationId}</p>
              </div>
              
              <div style="background: white; border-radius: 8px; padding: 15px; margin-bottom: 10px;">
                <p style="color: #64748b; font-size: 12px; margin: 0 0 5px;">Email</p>
                <p style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0;">${to}</p>
              </div>
              
              <div style="background: white; border-radius: 8px; padding: 15px;">
                <p style="color: #64748b; font-size: 12px; margin: 0 0 5px;">Password (Your Date of Birth)</p>
                <p style="color: #1e293b; font-size: 18px; font-weight: 700; margin: 0; font-family: 'Courier New', monospace;">${password}</p>
              </div>
            </div>
            
            <!-- Login Button -->
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://www.raventutorials.in/login" style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; text-decoration: none; padding: 15px 40px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                Login to Your Dashboard →
              </a>
            </div>
            
            <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 25px 0 0; text-align: center;">
              <strong>Keep your credentials safe!</strong><br>
              Do not share your login details with anyone.
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f8fafc; padding: 25px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 13px; margin: 0 0 10px;">
              Bajrangpuri, Patna - 800007
            </p>
            <p style="color: #64748b; font-size: 13px; margin: 0 0 10px;">
              +91 8618281816 | raventutorials@gmail.com
            </p>
            <p style="color: #94a3b8; font-size: 12px; margin: 15px 0 0;">
              © ${new Date().getFullYear()} Raven Tutorials. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    await getBrevoInstance().sendTransacEmail(sendSmtpEmail);
    console.log(`Welcome email sent successfully to ${to}`);
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
}
