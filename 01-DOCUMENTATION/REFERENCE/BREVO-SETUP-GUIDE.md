# 📧 BREVO EMAIL INTEGRATION - SETUP GUIDE

## ✅ CONTACT FORM IS READY!

Your contact form is already built and functional. It just needs Brevo API key to send emails.

---

## 🚀 QUICK SETUP (5 MINUTES):

### **STEP 1: Get Brevo API Key**

1. Go to [Brevo.com](https://www.brevo.com) (formerly Sendinblue)
2. **Sign up FREE** (300 emails/day free forever)
3. Go to: **Settings** → **SMTP & API** → **API Keys**
4. Click **Create a new API key**
5. Copy your API key

---

### **STEP 2: Add API Key to Project**

Create `.env.local` file in your project root:

```bash
# .env.local
BREVO_API_KEY=your_api_key_here
BREVO_SENDER_EMAIL=info@fijicabconnect.com
BREVO_RECIPIENT_EMAIL=info@fijicabconnect.com
```

**Replace `your_api_key_here` with your actual Brevo API key!**

---

### **STEP 3: Install Brevo Package**

```bash
npm install @getbrevo/brevo
```

---

### **STEP 4: Create API Route**

The API route file is already created: `app/api/contact/route.ts`

It will:
- ✅ Receive form data
- ✅ Send email via Brevo
- ✅ Return success/error response

---

## 📝 HOW IT WORKS:

1. **User fills contact form** on website
2. **Form submits** to `/api/contact`
3. **API route** sends email via Brevo
4. **You receive email** at info@fijicabconnect.com
5. **User sees** success message

---

## 🔒 SECURITY:

- ✅ API key stored in `.env.local` (not in code)
- ✅ `.env.local` is in `.gitignore` (never committed)
- ✅ Server-side only (API key never exposed to browser)

---

## 🧪 TEST IT:

1. Add your Brevo API key to `.env.local`
2. Restart dev server: `npm run dev`
3. Fill out contact form on website
4. Check your email inbox!

---

## 📧 EMAIL TEMPLATE:

When someone contacts you, you'll receive:

```
From: FIJICAB Contact Form <info@fijicabconnect.com>
To: info@fijicabconnect.com
Subject: New Contact Form Submission from [Name]

Name: [Their Name]
Email: [Their Email]
Phone: [Their Phone]
Subject: [Subject]

Message:
[Their Message]

---
Sent from FIJICAB Contact Form
```

---

## ❓ NEED HELP?

- **Brevo Support:** https://help.brevo.com
- **API Docs:** https://developers.brevo.com
- **Free Plan:** 300 emails/day forever

---

**Your contact form is ready to go! Just add the API key and it works!** ✅
