'use client'

import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import { PhoneIcon } from '@heroicons/react/24/outline'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animations on mount
    setIsVisible(true)
  }, [])

  return (
    <section
      id="home"
      className="relative bg-white min-h-[90vh] flex items-center overflow-hidden"
      role="banner"
      aria-label="Hero section"
    >
      {/* Subtle background gradient - very light */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-white to-blue-50/30"></div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Column - Content (Bolt Style) */}
          <div className="max-w-2xl">
            {/* Service Badge - Minimal & Clean */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full mb-6 animate-fade-in"
              role="status"
              aria-live="polite"
            >
              <div
                className="w-2 h-2 bg-primary rounded-full animate-pulse"
                aria-hidden="true"
              ></div>
              <span className="text-sm font-medium text-gray-700">
                Always available across Viti Levu
              </span>
            </div>

            {/* BOLD Headline - Bolt Style */}
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 leading-[1.05] mb-6 tracking-tight animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}
            >
              Riding is the{' '}
              <span className="text-primary">
                new driving
              </span>
            </h1>

            {/* Subheadline - Clean and Simple */}
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Fast, safe, and affordable cab rides across Fiji. Book by phone, app coming soon.
            </p>

            {/* CTA Buttons - Bolt Style */}
            <div
              className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
              role="group"
              aria-label="Call to action buttons"
            >
              {/* Primary CTA - Bold Green */}
              <a
                href="tel:+6799680798"
                className="group relative inline-flex items-center justify-center gap-3 text-lg px-8 py-4 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] bg-primary text-white"
                aria-label="Call us now at +679 9680798"
              >
                <PhoneIcon
                  className="w-6 h-6"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <span>Call: +679 9680798</span>
              </a>

              {/* Secondary CTA - Outline */}
              <Button
                variant="secondary"
                href="/#drivers"
                className="text-lg px-8 py-4 rounded-xl font-bold border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
                size="lg"
                ariaLabel="Learn about becoming a driver"
              >
                Become a driver
              </Button>
            </div>

            {/* Quick Stats - Minimal */}
            <div
              className="flex flex-wrap gap-8 text-gray-600 animate-fade-in-up"
              style={{ animationDelay: '0.4s' }}
              role="list"
              aria-label="Key service features"
            >
              <div role="listitem">
                <div className="text-2xl font-bold text-gray-900">Always</div>
                <div className="text-sm">Available</div>
              </div>
              <div role="listitem">
                <div className="text-2xl font-bold text-gray-900">Island-Wide</div>
                <div className="text-sm">Coverage</div>
              </div>
              <div role="listitem">
                <div className="text-2xl font-bold text-gray-900">Verified</div>
                <div className="text-sm">Drivers</div>
              </div>
            </div>
          </div>

          {/* Right Column - Hero Image (Bolt Style) */}
          <div className="relative lg:h-[600px] h-[400px] rounded-3xl overflow-hidden shadow-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {/* Option 1: Use your existing hero image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url("/images/hero-1.png")`
              }}
            >
              {/* Light overlay for better image presentation */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>

            {/* Floating Service Badge on Image */}
            <div className="absolute bottom-8 left-8 right-8">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-gray-900 font-bold text-lg">Ready when you are</div>
                    <div className="text-gray-600 text-sm">Professional drivers waiting for your call</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Minimal Scroll Indicator */}
      <a
        href="#how-it-works"
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce hover:scale-110 transition-transform focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 rounded-full p-2"
        aria-label="Scroll down to learn more"
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2 hover:border-gray-600 transition-colors">
          <div className="w-1.5 h-3 bg-gray-400 rounded-full"></div>
        </div>
      </a>
    </section>
  )
}
