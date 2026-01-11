import {
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  MapPinIcon,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  BoltIcon
} from '@heroicons/react/24/outline'
import Button from '@/components/ui/Button'

export default function ForTourists() {
  const features = [
    {
      icon: MapPinIcon,
      title: 'Airport pickups',
      description: 'Direct transportation from Nadi Airport to your resort or hotel. Reliable service for all arrivals.',
    },
    {
      icon: DevicePhoneMobileIcon,
      title: 'No app needed',
      description: 'Book through your web browser on any device. No downloads, no hassle - just open and book.',
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'English supported',
      description: 'All drivers speak English. Clear communication ensures a smooth, comfortable journey.',
    },
    {
      icon: GlobeAltIcon,
      title: 'Island travel',
      description: 'Explore Fiji with confidence. Travel between cities, beaches, and tourist destinations.',
    },
  ]

  const benefits = [
    {
      title: 'Safe',
      description: 'Verified drivers and secure transportation',
      icon: ShieldCheckIcon,
    },
    {
      title: 'Simple',
      description: 'Book in seconds, pay in cash',
      icon: BoltIcon,
    },
    {
      title: 'Local',
      description: 'Drivers know the best routes and places',
      icon: MapPinIcon,
    },
  ]

  return (
    <section id="tourists" className="bg-gradient-to-b from-white via-emerald-50/30 to-white py-24 md:py-32 relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header - Modern & Clean */}
        <div className="mb-20 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full mb-6">
            <span className="text-sm font-semibold text-primary uppercase tracking-wide">
              Visiting Fiji?
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 mb-6 leading-tight">
            Perfect for tourists
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
            Transportation made easy for visitors to the islands
          </p>
        </div>

        {/* Features Grid - Modern Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-primary/20 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-base leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* Why Choose Section - Split Layout */}
        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl overflow-hidden mb-16 shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left side - Heading */}
            <div className="p-12 md:p-16 flex flex-col justify-center">
              <h3 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                Why tourists choose{' '}
                <span className="text-yellow-300">FIJICAB</span>
              </h3>
              <p className="text-white/90 text-lg leading-relaxed">
                Join thousands of satisfied visitors who trust us for their Fiji transportation needs.
              </p>
            </div>

            {/* Right side - Benefits */}
            <div className="bg-white/10 backdrop-blur-sm p-12 md:p-16 flex flex-col justify-center space-y-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-12 h-12 text-white" strokeWidth={2} />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-2">{benefit.title}</h4>
                      <p className="text-white/80 text-base">{benefit.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* CTA Section - Clean & Modern */}
        <div className="bg-gray-50 rounded-3xl p-12 md:p-16 text-center border border-gray-200">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Planning your Fiji vacation?
          </h3>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Book your ride now and experience hassle-free transportation from the moment you land.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:+6799680798"
              className="inline-flex items-center gap-3 text-lg px-8 py-4 rounded-xl bg-primary text-white hover:bg-primary-dark font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all hover:scale-[1.02]"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              Call: +679 9680798
            </a>
            <a
              href="/#contact"
              className="text-lg px-8 py-4 rounded-xl bg-white text-gray-900 hover:bg-gray-50 border-2 border-gray-900 font-bold transition-all hover:scale-[1.02]"
            >
              Email us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
