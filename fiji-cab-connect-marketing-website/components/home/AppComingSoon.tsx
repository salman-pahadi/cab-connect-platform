'use client'

import { useState } from 'react'
import {
  DevicePhoneMobileIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

export default function AppComingSoon() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    try {
      const mailto = `mailto:info@fijicabconnect.com?subject=${encodeURIComponent(
        'FIJI CAB CONNECT - App updates'
      )}&body=${encodeURIComponent(
        `Please keep me updated about the FIJI CAB CONNECT app.\n\nEmail: ${email}`
      )}`

      window.location.href = mailto

      setStatus('success')
      setEmail('')

      setTimeout(() => setStatus('idle'), 5000)
    } catch (error: unknown) {
      setStatus('error')
      const errorMsg = error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      setErrorMessage(errorMsg || 'Something went wrong. Please try again.')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const appHighlights = [
    {
      icon: DevicePhoneMobileIcon,
      title: 'App updates',
      description: 'The FIJI CAB CONNECT app is coming soon. We’ll share updates as features become available.',
    },
    {
      icon: SparklesIcon,
      title: 'Launch readiness',
      description: 'App availability is subject to required approvals, including app store and privacy requirements.',
    },
  ]

  return (
    <section id="app-coming-soon" className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 py-24 md:py-32 overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

        {/* Section Header */}
        <div className="text-center mb-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <SparklesIcon className="w-5 h-5 text-primary" strokeWidth={1.5} />
            <span className="text-sm font-semibold text-primary uppercase tracking-wide">
              Coming soon
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 mb-6 leading-tight">
            Our app is<br />coming soon
          </h2>

          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Our mobile app is coming soon. Get updates as we prepare for release.
          </p>
        </div>

        {/* App Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {appHighlights.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-primary/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* Email Capture Section - Featured Card */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-10 md:p-16 shadow-2xl">
          <div className="text-center mb-10">
            <h3 className="text-4xl md:text-5xl font-black text-white mb-6">
              Get app updates
            </h3>
            <p className="text-xl text-white/90 leading-relaxed">
              Share your email and we’ll send updates when the app is ready.
            </p>
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-5 rounded-xl text-lg text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-primary/30 outline-none shadow-lg"
              />
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="px-10 py-5 bg-gray-900 hover:bg-black text-white rounded-xl font-bold text-lg transition-all hover:scale-[1.02] shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Opening email...' : 'Email me updates'}
              </button>
            </div>

            {/* Status Messages */}
            {status === 'success' && (
              <div className="bg-white/20 border-2 border-white/50 text-white px-6 py-4 rounded-xl backdrop-blur-sm" role="status">
                <p className="font-semibold text-lg">Email draft opened</p>
                <p className="text-sm text-white/90">Send it to request app updates.</p>
              </div>
            )}

            {status === 'error' && (
              <div className="bg-red-500/20 border-2 border-red-300 text-white px-6 py-4 rounded-xl backdrop-blur-sm">
                <p className="font-semibold text-lg">Something went wrong.</p>
                <p className="text-sm text-white/90">{errorMessage}</p>
              </div>
            )}
          </form>

          <p className="mt-10 text-center text-white/80 text-sm">
            App availability is subject to required approvals.
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 bg-gray-100 rounded-3xl p-10 md:p-12 border border-gray-200">
          <p className="text-2xl font-bold text-gray-900 mb-4">
            Need a ride right now?
          </p>
          <p className="text-lg text-gray-600 mb-8">
            Call us! No app needed yet.
          </p>
          <a
            href="tel:+6799680798"
            className="inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark text-white px-10 py-5 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
          >
            <DevicePhoneMobileIcon className="w-6 h-6" strokeWidth={1.5} />
            Call: +679 9680798
          </a>
        </div>
      </div>
    </section>
  )
}
