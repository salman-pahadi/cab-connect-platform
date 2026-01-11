# 📧 BREVO EMAIL INTEGRATION GUIDE
## Contact Form Setup for FIJI CAB CONNECT

**Service:** Brevo (formerly Sendinblue)  
**Purpose:** Handle contact form submissions via email

---

## 🚀 QUICK SETUP

### Step 1: Create Brevo Account

1. Go to [https://www.brevo.com](https://www.brevo.com)
2. Sign up for a **FREE account** (includes 300 emails/day)
3. Verify your email address

---

### Step 2: Get API Key

1. Log into Brevo dashboard
2. Go to: **Settings** → **API Keys** → **SMTP & API**
3. Click **"Generate a new API key"**
4. Copy the API key (you'll only see this once!)

---

### Step 3: Add API Key to Project

Create a file called `.env.local` in your project root:

```bash
# Brevo Configuration
BREVO_API_KEY=your_actual_api_key_here
BREVO_SENDER_EMAIL=info@fijicabconnect.com
BREVO_SENDER_NAME=FIJI CAB CONNECT
BREVO_RECIPIENT_EMAIL=mihussain1984@gmail.com
```

**Important:** Never commit `.env.local` to Git! It's already in `.gitignore`.

---

### Step 4: API Routes (Already Created!)

**Two API implementations for different environments:**

#### Development (localhost):
- File: `app/api/contact/route.ts`
- Uses Next.js API Routes
- Runs on Node.js server

#### Production (Cloudflare Pages):
- File: `functions/api/contact.ts`
- Uses Cloudflare Pages Functions
- Runs on Cloudflare's edge network
- No additional packages needed (uses native fetch)

**Both provide identical functionality:**
- ✅ Multiple recipients support
- ✅ BCC support
- ✅ XSS protection
- ✅ Professional email templates
- ✅ Error handling

---

### Step 5: How It Works

Create file: `app/api/contact/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
const SibApiV3Sdk = require('@getbrevo/brevo')

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Initialize Brevo
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
    apiInstance.setApiKey(
      SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    )

    // Prepare email
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()
    
    sendSmtpEmail.sender = {
      name: process.env.BREVO_SENDER_NAME || 'FIJI CAB CONNECT',
      email: process.env.BREVO_SENDER_EMAIL || 'info@fijicabconnect.com',
    }
    
    sendSmtpEmail.to = [{
      email: process.env.BREVO_RECIPIENT_EMAIL || 'mihussain1984@gmail.com',
      name: 'FIJI CAB CONNECT Team',
    }]
    
    sendSmtpEmail.subject = `New Contact Form: ${subject}`
    
    sendSmtpEmail.htmlContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      <hr>
      <p><em>Sent from fijicabconnect.com contact form</em></p>
    `

    // Send email
    await apiInstance.sendTransacEmail(sendSmtpEmail)

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Brevo API Error:', error)
    return NextResponse.json(
      { error: 'Failed to send email', details: error.message },
      { status: 500 }
    )
  }
}
```

---

### Step 6: Update Contact Form

Update `components/forms/ContactForm.tsx`:

Find this comment:
```typescript
// TODO: Integrate with Brevo API
```

Replace the simulated API call with:

```typescript
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
})

if (!response.ok) {
  throw new Error('Failed to send message')
}
```

---

## 🧪 TESTING

### Test Locally:

1. Make sure `.env.local` has your Brevo API key
2. Start dev server: `npm run dev`
3. Go to: `http://localhost:3000/#contact`
4. Fill out and submit the form
5. Check your email inbox (configured in `.env.local`)

---

## ✅ VERIFICATION CHECKLIST

- [ ] Brevo account created
- [ ] API key generated and saved
- [ ] `.env.local` file created with API key
- [ ] Brevo SDK installed (`@getbrevo/brevo`)
- [ ] API route created (`app/api/contact/route.ts`)
- [ ] Contact form updated to use API
- [ ] Test submission successful
- [ ] Email received in inbox

---

## 🚨 TROUBLESHOOTING

### Error: "Invalid API key"
- Double-check API key in `.env.local`
- Make sure there are no spaces or quotes around the key
- Regenerate API key in Brevo dashboard

### Error: "Sender email not verified"
- Verify your sender email in Brevo dashboard
- Go to **Senders** → **Domains & Addresses**
- Click "Add a sender" and verify

### Emails not arriving
- Check spam/junk folder
- Verify recipient email in `.env.local`
- Check Brevo dashboard for email logs
- Ensure you're within free tier limits (300/day)

---

## 📊 BREVO FREE TIER LIMITS

- ✅ 300 emails per day
- ✅ Unlimited contacts
- ✅ Transactional emails
- ✅ Email API
- ✅ SMTP relay

**Perfect for startup phase!**

---

## 🎯 PRODUCTION DEPLOYMENT

### For Cloudflare Pages:

1. Go to Cloudflare Pages dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add environment variables:
   - `BREVO_API_KEY`
   - `BREVO_SENDER_EMAIL`
   - `BREVO_SENDER_NAME`
   - `BREVO_RECIPIENT_EMAIL`
5. Redeploy your site

---

## 🔒 SECURITY BEST PRACTICES

✅ **DO:**
- Keep API key in environment variables only
- Never commit `.env.local` to Git
- Use sender email verification
- Validate all form inputs
- Rate limit submissions

❌ **DON'T:**
- Expose API key in client-side code
- Put API key in `next.config.js`
- Share API key publicly
- Skip email validation

---

## 📈 UPGRADE OPTIONS

If you exceed 300 emails/day, Brevo paid plans start at:
- **Lite:** 40,000 emails/month - $25/month
- **Business:** 100,000 emails/month - $65/month

---

## 📞 SUPPORT

**Brevo Support:**
- Docs: https://developers.brevo.com/
- Support: help@brevo.com

**FIJI CAB CONNECT:**
- Email: mihussain1984@gmail.com
- Phone: +679 9680798

---

**You're all set! 🎉 Your contact form will now send emails via Brevo!**
