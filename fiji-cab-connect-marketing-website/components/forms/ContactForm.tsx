'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'app-launch-notification',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to send message')
      }

      setStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'app-launch-notification',
        message: '',
      })
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      setStatus('error')
      setErrorMessage('Please email us at info@fijicabconnect.com or call +679 9680798 to book by phone.')
      console.error('Form submission error:', error)
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <div className="bg-white rounded-3xl p-10 md:p-12 shadow-lg border border-gray-200">
      <h3 className="text-3xl md:text-4xl font-bold text-black mb-10">
        Get in touch
      </h3>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-base font-semibold text-gray-700 mb-3">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all text-lg"
            placeholder="Your full name"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-base font-semibold text-gray-700 mb-3">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all text-lg"
            placeholder="your@email.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-base font-semibold text-gray-700 mb-3">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all text-lg"
            placeholder="Your phone number"
          />
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-base font-semibold text-gray-700 mb-3">
            Subject *
          </label>
          <select
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all text-lg"
          >
            <option value="app-launch-notification">App Updates</option>
            <option value="booking">Phone Booking</option>
            <option value="driver">Become a Driver</option>
            <option value="tourist">Tourist Information</option>
            <option value="partnership">Partnership Opportunity</option>
            <option value="general">General Inquiry</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-base font-semibold text-gray-700 mb-3">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all resize-none text-lg"
            placeholder="Tell us how we can help you..."
          />
        </div>

        {/* Status Messages */}
        <div aria-live="polite" aria-atomic="true">
        {status === 'success' && (
          <div className="bg-green-50 border-2 border-green-200 text-green-800 px-6 py-5 rounded-xl" role="status">
            <p className="font-bold text-lg">Message sent successfully!</p>
            <p className="text-base mt-1">We’ll get back to you soon.</p>
          </div>
        )}

        {status === 'error' && (
          <div className="bg-red-50 border-2 border-red-200 text-red-800 px-6 py-5 rounded-xl" role="alert">
            <p className="font-bold text-lg">Something went wrong.</p>
            <p className="text-base mt-1">{errorMessage}</p>
          </div>
        )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          className="w-full text-xl py-6 rounded-full font-bold shadow-xl hover:shadow-2xl"
          loading={status === 'submitting'}
        >
          {status === 'submitting' ? 'Sending...' : 'Send message'}
        </Button>
      </form>
    </div>
  )
}
