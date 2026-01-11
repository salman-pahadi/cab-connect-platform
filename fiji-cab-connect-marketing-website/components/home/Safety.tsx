import { 
  ShieldCheckIcon, 
  MapPinIcon, 
  PhoneIcon, 
  StarIcon, 
  TruckIcon, 
  LockClosedIcon 
} from '@heroicons/react/24/outline'

export default function Safety() {
  const safetyFeatures = [
    {
      icon: ShieldCheckIcon,
      title: 'Verified Drivers',
      description: 'Every driver undergoes thorough background checks and verification before joining our platform.',
    },
    {
      icon: MapPinIcon,
      title: 'Trip Sharing',
      description: 'Share your trip details with family and friends for added peace of mind and safety.',
    },
    {
      icon: PhoneIcon,
      title: 'Always Available Support',
      description: 'Emergency support available anytime. One-tap access to help when you need it.',
    },
    {
      icon: StarIcon,
      title: 'Driver Ratings',
      description: 'Rate your driver after every trip. We maintain high standards with our rating system.',
    },
    {
      icon: TruckIcon,
      title: 'Vehicle Inspections',
      description: 'All vehicles are regularly inspected and meet safety standards for your protection.',
    },
    {
      icon: LockClosedIcon,
      title: 'Secure Service',
      description: 'Your personal information is protected and secure. Simple cash payment at the end of your ride.',
    },
  ]

  const trustBadges = [
    { label: 'Licensed Drivers' },
    { label: 'Background Checked' },
    { label: 'Insured Vehicles' },
    { label: 'Safety Training' },
  ]

  return (
    <section id="safety" className="relative bg-gradient-to-b from-white via-gray-50 to-white py-24 md:py-32 overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="mb-20 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <span className="text-sm font-semibold text-primary uppercase tracking-wide">
              Safety First
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 mb-6 leading-tight">
            Your safety is our priority
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
            Every trip is designed with your security and comfort in mind.
          </p>
        </div>

        {/* Safety Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {safetyFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div 
                key={index} 
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-primary/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* Trust Badges */}
        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-10 md:p-16 shadow-2xl">
          <h3 className="text-4xl md:text-5xl font-black text-white text-center mb-12">Our Safety Commitments</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {trustBadges.map((badge, index) => (
              <div key={index} className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all">
                <ShieldCheckIcon className="w-12 h-12 text-white mx-auto mb-4" strokeWidth={2} />
                <div className="text-lg font-semibold text-white">{badge.label}</div>
              </div>
            ))}
          </div>
          
          <div className="text-center pt-8 border-t border-white/20">
            <p className="text-xl text-white/90 mb-6">
              Need help or have safety concerns? Our support team is always here for you.
            </p>
            <a 
              href="/#contact" 
              className="inline-block bg-white hover:bg-gray-100 text-primary px-10 py-5 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
