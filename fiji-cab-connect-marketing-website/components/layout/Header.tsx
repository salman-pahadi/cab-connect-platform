'use client'

import { useState } from 'react'
import { Bars3Icon, PhoneIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Button from '@/components/ui/Button'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Ride', href: '/#home' },
    { name: 'How it works', href: '/#how-it-works' },
    { name: 'Features', href: '/#features' },
    { name: 'Tourists', href: '/#tourists' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'Safety', href: '/#safety' },
    { name: 'FAQ', href: '/#faq' },
    { name: 'Drive', href: '/#drivers' },
    { name: 'App', href: '/#app-coming-soon', badge: 'Soon' },
  ]

  // Compact desktop nav: keep key items visible at lg widths, show full nav at xl+
  const compactDesktopNavNames = new Set(['Ride', 'How it works', 'Features', 'Drive', 'App'])
  const compactDesktopNavigation = navigation.filter((item) => compactDesktopNavNames.has(item.name))

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-50">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-50 focus:bg-white focus:text-black focus:px-6 focus:py-3 focus:rounded-xl focus:shadow-lg focus:border focus:border-gray-200"
      >
        Skip to main content
      </a>
      <nav className="max-w-7xl mx-auto px-6 lg:px-20" aria-label="Global">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Cab Connect */}
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5 flex items-center">
              <Image
                src="/logo/logo-horizontal.svg"
                alt="Cab Connect"
                width={260}
                height={52}
                priority
                className="h-9 sm:h-10 md:h-11 w-auto"
              />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-black"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Desktop navigation - Compact on lg, full on xl */}
          <div className="hidden lg:flex xl:hidden lg:gap-x-4 lg:items-center">
            {compactDesktopNavigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative text-xs font-medium leading-6 text-black hover:text-primary transition-colors inline-flex items-center gap-2 whitespace-nowrap"
              >
                {item.name}
                {item.badge && (
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-primary text-white rounded-full">
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </div>

          <div className="hidden xl:flex xl:gap-x-6 xl:items-center">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative text-sm font-medium leading-6 text-black hover:text-primary transition-colors inline-flex items-center gap-2 whitespace-nowrap"
              >
                {item.name}
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs font-bold bg-primary text-white rounded-full">
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </div>

          {/* Desktop CTA - Phone + Contact */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-3">
            <a
              href="tel:+6799680798"
              className="inline-flex items-center gap-2 px-4 py-2 bg-black hover:bg-gray-900 text-white rounded-full font-semibold text-sm transition-all"
              aria-label="Call to book by phone"
            >
              <PhoneIcon className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
              Call now
            </a>
            <Button variant="primary" href="/#contact" className="rounded-full px-5 py-2 text-sm font-semibold">
              Contact
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile menu - Full screen modal */}
      {mobileMenuOpen && (
        <>
          {/* Portal backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Full-screen menu */}
          <div className="fixed inset-0 z-50 bg-white flex flex-col lg:hidden h-screen" onClick={(e) => e.stopPropagation()}>
            {/* Top bar - Logo + Close */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
              <Image
                src="/logo/logo-horizontal.svg"
                alt="Cab Connect"
                width={160}
                height={32}
                className="h-8 w-auto"
              />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable navigation - grows to fill space */}
            <nav className="flex-1 min-h-0 overflow-y-auto px-4 py-6">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full px-4 py-3 text-left rounded-lg text-base font-semibold text-black hover:bg-primary/10 transition-colors"
                  >
                    <span className="flex items-center justify-between">
                      {item.name}
                      {item.badge && (
                        <span className="text-xs font-bold bg-primary text-white px-2 py-1 rounded-full ml-2">
                          {item.badge}
                        </span>
                      )}
                    </span>
                  </a>
                ))}
              </div>
            </nav>

            {/* Bottom CTA section - fixed at bottom */}
            <div className="border-t border-gray-200 bg-white px-4 py-6 space-y-3 flex-shrink-0">
              <a
                href="tel:+6799680798"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-black text-white rounded-full font-semibold text-base hover:bg-gray-900 transition-colors"
              >
                <PhoneIcon className="w-5 h-5" />
                Call: +679 9680798
              </a>
              <Button
                variant="primary"
                href="/#contact"
                className="w-full rounded-full py-3 text-base font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact us
              </Button>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
