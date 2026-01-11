'use client'

import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      category: 'For Passengers',
      questions: [
        {
          q: 'How do I book a ride?',
          a: 'Book your ride now by calling +679 9680798. Our service is available and ready to serve you. Our app booking platform is coming soon for even more convenience.',
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept cash payment at the end of your trip. Simple and convenient - just pay your driver directly.',
        },
        {
          q: 'Is it safe to ride with FIJICAB?',
          a: 'Safety is our top priority. All drivers undergo thorough background checks and verification. Every vehicle is regularly inspected to meet safety standards.',
        },
        {
          q: 'Where do you operate in Fiji?',
          a: 'We\'re launching across Viti Levu, including Nadi, Suva, Lautoka, and Denarau. Service expansion to other islands is planned based on demand.',
        },
        {
          q: 'Can I book a ride before arriving in Fiji?',
          a: 'Yes! Call us at +679 9680798 before you arrive to arrange airport pickup or pre-book rides during your stay. Perfect for tourists planning ahead.',
        },
        {
          q: 'Do I need to download an app?',
          a: 'Not right now! Book by phone at +679 9680798 - no app needed. Our booking app is coming soon and will make reservations even easier.',
        },
        {
          q: 'When will the booking app be available?',
          a: 'Our app booking platform is currently in development and will be launching soon. For now, enjoy convenient phone booking at +679 9680798. Join our contact list to be notified when the app launches.',
        },
      ],
    },
    {
      category: 'For Drivers',
      questions: [
        {
          q: 'How do I join as a driver?',
          a: 'We\'re actively recruiting professional drivers! Contact us using the form below and select "Become a Driver". We\'ll guide you through our simple onboarding process.',
        },
        {
          q: 'What do I need to become a driver?',
          a: 'You need a valid driver\'s license, a registered vehicle in good condition, and a smartphone with internet access. Full requirements provided during registration.',
        },
        {
          q: 'How much can I earn?',
          a: 'Earnings vary based on hours worked and rides completed. Contact us for detailed information about driver compensation and flexible schedule options.',
        },
        {
          q: 'When can I start driving?',
          a: 'We\'re recruiting founding drivers now! Early drivers will be ready for our platform launch. Contact us today to secure your spot.',
        },
        {
          q: 'Do I need special insurance?',
          a: 'Yes, drivers must have valid commercial vehicle insurance. We can provide guidance on insurance requirements during the registration process.',
        },
      ],
    },
  ]

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const globalIndex = categoryIndex * 100 + questionIndex
    setOpenIndex(openIndex === globalIndex ? null : globalIndex)
  }

  return (
    <section id="faq" className="bg-white py-40 md:py-56">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <div className="mb-32 text-center max-w-4xl mx-auto">
          <p className="text-base font-semibold text-primary mb-6 tracking-wider uppercase">
            Frequently Asked Questions
          </p>
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-black mb-8 leading-[0.95]">
            Got questions?
          </h2>
          <p className="text-2xl md:text-3xl text-gray-600 leading-relaxed font-light">
            Everything you need to know about FIJICAB
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              {/* Category Header */}
              <h3 className="text-3xl font-black text-black mb-8 pb-4 border-b-2 border-primary">
                {category.category}
              </h3>

              {/* Questions */}
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const globalIndex = categoryIndex * 100 + questionIndex
                  const isOpen = openIndex === globalIndex

                  return (
                    <div
                      key={questionIndex}
                      className="border border-gray-200 rounded-2xl overflow-hidden hover:border-primary transition-colors"
                    >
                      {/* Question */}
                      <button
                        onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                        className="w-full text-left p-6 flex items-center justify-between gap-4 bg-white hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-lg font-bold text-black pr-4">
                          {faq.q}
                        </span>
                        <ChevronDownIcon
                          className={`w-6 h-6 text-primary flex-shrink-0 transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {/* Answer */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isOpen ? 'max-h-96' : 'max-h-0'
                        }`}
                      >
                        <div className="p-6 pt-0 text-gray-600 text-lg leading-relaxed">
                          {faq.a}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="text-xl text-gray-600 mb-8">
            Still have questions? We're here to help.
          </p>
          <a
            href="/#contact"
            className="inline-block bg-primary hover:bg-primary-dark text-white px-12 py-5 rounded-full font-bold text-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            Contact us
          </a>
        </div>
      </div>
    </section>
  )
}
