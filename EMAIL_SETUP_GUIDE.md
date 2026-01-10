# Brevo Email Setup Guide for Vercel

## Common Issue: Email Sending Fails with 403/400 Error

If you're getting "failed" errors when sending emails through Brevo on Vercel, the most common cause is **unverified sender email**.

## Solution Steps

### 1. Verify Your Sender Email in Brevo

1. Go to [Brevo Dashboard](https://app.brevo.com/)
2. Navigate to **Settings → Senders & IP**
3. Click **Add a new sender**
4. Add your sender email: `noreply@raventutorials.in`
5. Brevo will send a verification email to that address
6. Verify the email by clicking the link

### 2. Option A: Use Custom Domain (Recommended for Production)

If you own `raventutorials.in`, you need to configure DNS records:

1. In Brevo, go to **Settings → Senders & IP → Domains**
2. Add your domain: `raventutorials.in`
3. Brevo will provide DNS records (SPF, DKIM, DMARC)
4. Add these records to your domain's DNS settings (where you bought the domain):
   
   **Example DNS Records:**
   ```
   Type: TXT
   Name: @
   Value: v=spf1 include:spf.brevo.com ~all
   
   Type: TXT
   Name: mail._domainkey
   Value: [Brevo will provide this]
   
   Type: TXT  
   Name: _dmarc
   Value: v=DMARC1; p=none; rua=mailto:dmarc@raventutorials.in
   ```

5. Wait for DNS propagation (can take up to 48 hours)
6. Verify domain in Brevo

### 2. Option B: Use Personal Email (Quick Fix for Testing)

If you don't have access to DNS or need a quick solution:

1. In Brevo, add and verify your personal email (e.g., `your-email@gmail.com`)
2. Update your `.env` file:
   ```env
   BREVO_SENDER_EMAIL=your-email@gmail.com
   BREVO_SENDER_NAME=Raven Tutorials
   ```
3. Update the same in Vercel environment variables
4. Redeploy your app

### 3. Update Vercel Environment Variables

**Critical:** Environment variables in `.env` are NOT automatically used on Vercel!

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project → **Settings** → **Environment Variables**
3. Add/Update these variables:
   ```
   BREVO_API_KEY=your-brevo-api-key-here
   BREVO_SENDER_EMAIL=your-verified-email@example.com
   BREVO_SENDER_NAME=Raven Tutorials
   ```
4. Make sure to set them for **Production**, **Preview**, and **Development** environments
5. **Redeploy** your application after updating environment variables

### 4. Test Email Sending

After setup, test with this API endpoint:

```bash
curl -X POST https://your-app.vercel.app/api/send-email
```

Check Vercel logs for detailed error messages:
```bash
vercel logs
```

## Troubleshooting

### Error: 403 Forbidden
- **Cause:** Sender email not verified in Brevo
- **Fix:** Verify the sender email in Brevo settings

### Error: 400 Bad Request
- **Cause:** Invalid sender email format or unverified domain
- **Fix:** Use a verified email or complete domain verification

### Error: 401 Unauthorized
- **Cause:** Invalid API key
- **Fix:** Generate a new API key in Brevo → Settings → API Keys

### Emails Not Sending on Vercel (but work locally)
- **Cause:** Environment variables not set in Vercel
- **Fix:** Add all email-related env vars in Vercel dashboard and redeploy

### Timeout Errors
- **Cause:** Network issues or Brevo API slowness
- **Fix:** Already handled in code with 8s timeout. Check Brevo status page.

## Quick Checklist

- [ ] Sender email verified in Brevo
- [ ] Domain verified (if using custom domain)
- [ ] Environment variables set in Vercel dashboard
- [ ] Redeployed after env var changes
- [ ] Tested with the test endpoint
- [ ] Checked Vercel logs for specific errors

## Additional Resources

- [Brevo Email Authentication Guide](https://help.brevo.com/hc/en-us/articles/209467485)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
- [SPF/DKIM Setup Guide](https://help.brevo.com/hc/en-us/articles/208929129)

## Support

If issues persist:
1. Check [Brevo Status Page](https://status.brevo.com/)
2. Review Vercel deployment logs
3. Test API key with Brevo's API documentation
4. Contact Brevo support with specific error codes
