import ContactForm from '@/components/forms/ContactForm'
import ServiceAreaMap from '@/components/ui/ServiceAreaMap'
import {
  MapPinIcon,
  BuildingOfficeIcon,
  HomeModernIcon
} from '@heroicons/react/24/outline'

export default function ContactCTA() {
  return (
    <section id="contact" className="bg-gray-50 py-40 md:py-56">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-20">
          {/* Left Column - Info - LARGER */}
          <div className="lg:col-span-2">
            <p className="text-base font-semibold text-primary mb-6 tracking-wider uppercase">Get in touch</p>

            <h2 className="text-6xl md:text-7xl font-black tracking-tight text-black mb-12 leading-[0.95]">
              Let's talk
            </h2>

            <p className="text-xl md:text-2xl text-gray-600 mb-14 leading-relaxed">
              Book your ride by phone or email us for more information. We're here to help.
            </p>

            <div className="space-y-10">
              {/* Email */}
              <div>
                <p className="text-base font-semibold text-gray-500 mb-3 tracking-wide uppercase">Email</p>
                <a
                  href="mailto:info@fijicabconnect.com"
                  className="text-2xl md:text-3xl font-bold text-black hover:text-primary transition-colors"
                >
                  info@fijicabconnect.com
                </a>
              </div>

              {/* Phone */}
              <div>
                <p className="text-base font-semibold text-gray-500 mb-3 tracking-wide uppercase">Phone</p>
                <a
                  href="tel:+6799680798"
                  className="text-2xl md:text-3xl font-bold text-black hover:text-primary transition-colors"
                >
                  +679 9680798
                </a>
              </div>

              {/* Location */}
              <div>
                <p className="text-base font-semibold text-gray-500 mb-3 tracking-wide uppercase">Location</p>
                <p className="text-2xl md:text-3xl font-bold text-black">
                  Viti Levu, Fiji Islands
                </p>
              </div>

              {/* Hours */}
              <div>
                <p className="text-base font-semibold text-gray-500 mb-3 tracking-wide uppercase">Hours</p>
                <p className="text-xl text-gray-600">
                  Always Available<br />
                  <span className="text-lg text-gray-500">We're always here to help!</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form - LARGER */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>

        {/* Premium Service Area Section */}
        <div className="mt-32">
          {/* Section Header - Premium */}
          <div className="text-center mb-16">
            <p className="text-base font-semibold text-primary mb-4 tracking-wider uppercase">Coverage</p>
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-black text-black mb-6 tracking-tight leading-tight">
              Our Service Area
            </h3>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Reliable rides across Fiji's main island
            </p>
          </div>

          {/* Premium Location Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {/* Nadi */}
            <div className="group relative bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 hover:shadow-premium-colored transition-all duration-300 hover:-translate-y-1 cursor-default border border-primary/20">
              <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full animate-pulse-subtle"></div>
              <MapPinIcon className="w-12 h-12 text-primary mb-3" strokeWidth={1.5} />
              <h4 className="text-xl font-bold text-black mb-1 group-hover:text-primary transition-colors">Nadi</h4>
              <p className="text-sm text-gray-600">International Gateway</p>
            </div>

            {/* Suva */}
            <div className="group relative bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 hover:shadow-premium-colored transition-all duration-300 hover:-translate-y-1 cursor-default border border-primary/20">
              <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full animate-pulse-subtle"></div>
              <BuildingOfficeIcon className="w-12 h-12 text-primary mb-3" strokeWidth={1.5} />
              <h4 className="text-xl font-bold text-black mb-1 group-hover:text-primary transition-colors">Suva</h4>
              <p className="text-sm text-gray-600">Capital City</p>
            </div>

            {/* Lautoka */}
            <div className="group relative bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 hover:shadow-premium-colored transition-all duration-300 hover:-translate-y-1 cursor-default border border-primary/20">
              <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full animate-pulse-subtle"></div>
              <HomeModernIcon className="w-12 h-12 text-primary mb-3" strokeWidth={1.5} />
              <h4 className="text-xl font-bold text-black mb-1 group-hover:text-primary transition-colors">Lautoka</h4>
              <p className="text-sm text-gray-600">Sugar City</p>
            </div>

            {/* Denarau */}
            <div className="group relative bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 hover:shadow-premium-colored transition-all duration-300 hover:-translate-y-1 cursor-default border border-primary/20">
              <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full animate-pulse-subtle"></div>
              <MapPinIcon className="w-12 h-12 text-primary mb-3" strokeWidth={1.5} />
              <h4 className="text-xl font-bold text-black mb-1 group-hover:text-primary transition-colors">Denarau</h4>
              <p className="text-sm text-gray-600">Resort Hub</p>
            </div>
          </div>

          {/* Premium Map Container */}
          <div className="relative">
            {/* Glassmorphism Frame */}
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 rounded-3xl blur-xl"></div>

            {/* Custom Illustrated Map */}
            <div className="relative rounded-3xl overflow-hidden shadow-premium-lg border border-gray-200 bg-white p-6">
              <ServiceAreaMap />

              {/* Map Footer Stats */}
              <div className="mt-6 grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-black text-black mb-1">Viti Levu</div>
                  <div className="text-sm text-gray-600">Main Island</div>
                </div>
                <div className="border-l border-r border-gray-200">
                  <div className="text-2xl font-black text-black mb-1">Always</div>
                  <div className="text-sm text-gray-600">Available</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-black mb-1">Fast</div>
                  <div className="text-sm text-gray-600">Response</div>
                </div>
              </div>
            </div>
          </div>

          {/* Coverage Details */}
          <div className="mt-10 text-center">
            <p className="text-lg text-gray-600 mb-4">
              <span className="font-semibold text-black">Full coverage</span> across Nadi, Suva, Lautoka, Denarau, and surrounding areas
            </p>
            <div className="inline-flex items-center gap-2 px-5 py-3 bg-primary/10 rounded-full border border-primary/20">
              <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-semibold text-primary">Expanding to more locations soon</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
