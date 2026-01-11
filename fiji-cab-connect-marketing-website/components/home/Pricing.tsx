import { 
  CurrencyDollarIcon, 
  DevicePhoneMobileIcon, 
  BanknotesIcon, 
  CheckCircleIcon 
} from '@heroicons/react/24/outline'

export default function Pricing() {
  const pricingFeatures = [
    {
      icon: CurrencyDollarIcon,
      title: 'Transparent Pricing',
      description: 'See your fare upfront before you book. No surprises, no hidden fees.',
    },
    {
      icon: DevicePhoneMobileIcon,
      title: 'Real-Time Estimates',
      description: 'Get instant fare estimates based on distance and time.',
    },
    {
      icon: BanknotesIcon,
      title: 'Simple Cash Payment',
      description: 'Pay your driver in cash at the end of your trip. Simple and convenient.',
    },
    {
      icon: CheckCircleIcon,
      title: 'Fair Rates',
      description: 'Competitive pricing with no surge charges during peak times.',
    },
  ]

  const fareStructure = [
    { label: 'Base Fare', description: 'Starting rate for every trip' },
    { label: 'Per Kilometer', description: 'Standard distance-based rate' },
    { label: 'Per Minute', description: 'Waiting time charge' },
    { label: 'Airport Pickup', description: 'Additional airport service fee' },
  ]

  return (
    <section id="pricing" className="relative bg-gradient-to-b from-white to-gray-50 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <span className="text-sm font-semibold text-primary uppercase tracking-wide">
              Transparent Pricing
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 mb-6 leading-tight">
            Fair fares, always
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
            Know your fare before you ride. No hidden fees, no surprises.
          </p>
        </div>

        {/* Pricing Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pricingFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div 
                key={index} 
                className="group text-center p-8 rounded-2xl bg-white border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-6 inline-flex p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10 transition-colors">
                  <Icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" strokeWidth={2} />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* Fare Structure */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-10 text-center">How Fares Work</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {fareStructure.map((item, index) => (
              <div key={index} className="flex items-start p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <CheckCircleIcon className="w-7 h-7 text-primary flex-shrink-0 mr-4 mt-0.5" strokeWidth={2} />
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{item.label}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Call to Action */}
          <div className="mt-10 p-8 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border-2 border-primary/20 text-center">
            <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Get Your Fare Estimate</h4>
            <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
              Call us for a fare quote before you book. Our team is ready to provide accurate pricing.
            </p>
            <a 
              href="/#contact" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
            >
              Request Fare Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
