import { 
  ShieldCheckIcon, 
  CurrencyDollarIcon, 
  ClockIcon, 
  MapPinIcon, 
  GlobeAltIcon, 
  BoltIcon 
} from '@heroicons/react/24/outline'

export default function Features() {
  const features = [
    {
      icon: ShieldCheckIcon,
      title: 'Verified & trusted drivers',
      description: 'Every driver is thoroughly background-checked and verified. Your safety is our top priority with professional, licensed drivers.',
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Fair & transparent pricing',
      description: 'See your fare upfront before you book. No surge pricing, no hidden fees. Pay what you see on the app or agree upon.',
    },
    {
      icon: ClockIcon,
      title: 'Always available',
      description: 'Need a ride early morning? We\'ve got you covered. Book anytime, day or night, across all major Fiji destinations.',
    },
    {
      icon: MapPinIcon,
      title: 'GPS Navigation',
      description: 'Our drivers use GPS navigation to find the fastest routes. Share your trip details with family for added security.',
    },
    {
      icon: GlobeAltIcon,
      title: 'Local expertise',
      description: 'Our drivers know Fiji inside out. Get local recommendations and the fastest routes to your destination.',
    },
    {
      icon: BoltIcon,
      title: 'Instant ride matching',
      description: 'Request a ride and get matched with a nearby driver quickly. Fast connections across the islands.',
    },
  ]

  return (
    <section id="features" className="relative bg-white py-24 md:py-32 overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="mb-20 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <span className="text-sm font-semibold text-primary uppercase tracking-wide">
              Why choose us
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 mb-6 leading-tight">
            Built for everyone
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
            Professional rides at your fingertips. Every journey is safe, comfortable, and reliable.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div 
                key={index} 
                className="group relative bg-white p-8 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Icon with gradient background */}
                <div className="mb-6 inline-flex p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10 transition-colors">
                  <Icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" strokeWidth={2} />
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-tight">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
