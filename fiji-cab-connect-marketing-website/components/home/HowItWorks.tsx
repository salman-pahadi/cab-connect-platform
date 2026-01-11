import { PhoneIcon, MapPinIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export default function HowItWorks() {
  const steps = [
    {
      icon: PhoneIcon,
      number: '01',
      title: 'Call to book',
      description: 'Call +679 9680798 and tell us your pickup location and destination. Available now - book in seconds.',
    },
    {
      icon: MapPinIcon,
      number: '02',
      title: 'Get matched',
      description: 'Our system finds the nearest verified driver. See their photo, rating, and vehicle details instantly.',
    },
    {
      icon: CheckCircleIcon,
      number: '03',
      title: 'Enjoy your ride',
      description: 'Enjoy a safe, comfortable ride with our professional drivers. Pay in cash and rate your experience.',
    },
  ]

  return (
    <section id="how-it-works" className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 py-24 md:py-32 overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="mb-20 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <span className="text-sm font-semibold text-primary uppercase tracking-wide">
              How it works
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 mb-6 leading-tight">
            Simple.<br />Fast.<br />Reliable.
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
            Getting a ride has never been easier. Three simple steps to your destination.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="group relative">
                {/* Connector line (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent z-0"></div>
                )}
                
                {/* Card */}
                <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 z-10">
                  {/* Number Badge */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white font-black text-lg shadow-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon 
                      className="w-8 h-8 text-primary" 
                      strokeWidth={2} 
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-gradient-to-br from-primary to-primary-hover rounded-3xl p-10 md:p-16 shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
            Ready to ride?
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Book your first ride now and experience hassle-free transportation in Fiji.
          </p>
          <a 
            href="tel:+6799680798" 
            className="inline-flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-primary px-10 py-5 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] shadow-lg"
          >
            <PhoneIcon className="w-6 h-6" strokeWidth={2.5} />
            Call: +679 9680798
          </a>
        </div>
      </div>
    </section>
  )
}
