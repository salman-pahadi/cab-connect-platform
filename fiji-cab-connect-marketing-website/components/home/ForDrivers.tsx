import Button from '@/components/ui/Button'
import { 
  ClockIcon, 
  BanknotesIcon, 
  UserCircleIcon, 
  ChatBubbleBottomCenterTextIcon,
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
  UsersIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'

export default function ForDrivers() {
  const benefits = [
    {
      icon: ClockIcon,
      title: 'Flexible hours',
      desc: 'Drive when you want, where you want'
    },
    {
      icon: BanknotesIcon,
      title: 'Weekly payouts',
      desc: 'Get paid every week, direct to your bank'
    },
    {
      icon: UserCircleIcon,
      title: 'Your own boss',
      desc: 'Complete freedom and independence'
    },
    {
      icon: ChatBubbleBottomCenterTextIcon,
      title: 'Full support',
      desc: 'Driver support team always ready to help'
    },
  ]

  const stats = [
    { number: 'Growing', label: 'Active drivers earning daily', icon: ArrowTrendingUpIcon },
    { number: 'Always', label: 'Support when you need it', icon: UsersIcon },
    { number: 'Free', label: 'Join at no cost', icon: ShieldCheckIcon },
    { number: 'Clear', label: 'Transparent earnings', icon: CurrencyDollarIcon },
  ]

  return (
    <section id="drivers" className="relative bg-gradient-to-b from-white via-primary/5 to-white py-24 md:py-32 overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Content - LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                For drivers
              </span>
            </div>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 mb-6 leading-tight">
              Earn with<br />every ride
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
              Turn your car into income. Join Fiji's fastest-growing ride-hailing platform and start earning today.
            </p>

            {/* Benefits Grid - Modern Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                    <Icon className="w-8 h-8 text-primary mb-3" strokeWidth={2} />
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.desc}</p>
                  </div>
                )
              })}
            </div>

            {/* CTA */}
            <Button 
              variant="primary" 
              href="/#contact" 
              size="lg"
              className="text-lg font-bold rounded-xl"
            >
              Join as founding driver
            </Button>
          </div>

          {/* Stats Grid - RIGHT */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div 
                  key={index}
                  className="group bg-gradient-to-br from-primary to-primary-dark text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <Icon className="w-12 h-12 mb-3 group-hover:scale-110 transition-transform duration-300" strokeWidth={2} />
                  <div className="text-3xl font-black mb-2">{stat.number}</div>
                  <p className="text-white/90 text-sm leading-relaxed">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
