import { NextRequest, NextResponse } from 'next/server'

interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const formData: ContactFormData = await request.json()

    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get environment variables
    const apiKey = process.env.BREVO_API_KEY
    const senderEmail = process.env.BREVO_SENDER_EMAIL || 'info@fijicabconnect.com'
    const recipientEmails = process.env.BREVO_RECIPIENT_EMAIL || 'mihussain1984@gmail.com'
    const bccEmail = process.env.BREVO_BCC_EMAIL || ''

    if (!apiKey) {
      console.error('BREVO_API_KEY is not set')
      return NextResponse.json(
        { success: false, error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // Map subject codes to labels
    const subjectLabels: { [key: string]: string } = {
      'booking': 'Phone Booking',
      'driver': 'Become a Driver',
      'tourist': 'Tourist Information',
      'partnership': 'Partnership Opportunity',
      'app-launch-notification': 'App Updates',
      'general': 'General Inquiry'
    }

    const subjectLabel = subjectLabels[formData.subject] || 'General Inquiry'

    // Prepare email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0A84FF; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>Name:</strong> ${formData.name}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> ${formData.email}</p>
          ${formData.phone ? `<p style="margin: 10px 0;"><strong>Phone:</strong> ${formData.phone}</p>` : ''}
          <p style="margin: 10px 0;"><strong>Subject:</strong> ${subjectLabel}</p>
        </div>

        <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #10b981; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Message:</h3>
          <p style="color: #4b5563; line-height: 1.6; white-space: pre-wrap;">${formData.message}</p>
        </div>

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        
        <p style="color: #9ca3af; font-size: 12px; text-align: center;">
          Sent from FIJICAB Contact Form<br>
          <a href="https://fijicabconnect.com" style="color: #0A84FF;">fijicabconnect.com</a>
        </p>
      </div>
    `

    const textContent = `
New Contact Form Submission

Name: ${formData.name}
Email: ${formData.email}
${formData.phone ? `Phone: ${formData.phone}` : ''}
Subject: ${subjectLabel}

Message:
${formData.message}

---
Sent from FIJICAB Contact Form
https://fijicabconnect.com
    `.trim()

    // Parse multiple recipient emails (comma or semicolon separated)
    const recipients = recipientEmails
      .split(/[,;]/)
      .map(email => email.trim())
      .filter(email => email)
      .map(email => ({ email, name: 'Fiji Cab Connect' }))

    // Prepare BCC if provided
    const bccList = bccEmail
      .split(/[,;]/)
      .map(email => email.trim())
      .filter(email => email)
      .map(email => ({ email }))

    // Prepare Brevo API request
    const brevoPayload = {
      sender: { 
        email: senderEmail, 
        name: 'FIJICAB Contact Form' 
      },
      to: recipients,
      ...(bccList.length > 0 && { bcc: bccList }),
      subject: `FIJI CAB CONNECT - ${subjectLabel} from ${formData.name}`,
      htmlContent,
      textContent,
      replyTo: {
        email: formData.email,
        name: formData.name
      }
    }

    // Send email via Brevo API
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify(brevoPayload),
    })

    const responseData = await response.json()

    if (!response.ok) {
      console.error('Brevo API Error:', responseData)
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to send email',
          details: responseData 
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      messageId: responseData.messageId
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 })
}
