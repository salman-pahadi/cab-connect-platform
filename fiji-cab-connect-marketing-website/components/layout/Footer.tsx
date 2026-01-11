import Image from 'next/image'

export default function Footer() {
  const links = [
    { name: 'Ride', href: '/#home' },
    { name: 'App Coming Soon', href: '/#app-coming-soon' },
    { name: 'Drive', href: '/#drivers' },
    { name: 'Features', href: '/#features' },
    { name: 'FAQ', href: '/#faq' },
    { name: 'Contact', href: '/#contact' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
  ]

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-24">
        {/* Top Section - LARGER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Brand */}
          <div>
            <Image
              src="/logo/logo-white.svg"
              alt="Cab Connect"
              width={260}
              height={50}
              className="h-12 w-auto mb-6"
            />
            <p className="text-gray-300 text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed md:leading-relaxed">
              Fiji&apos;s first ride-hailing platform for tourists and locals across Fiji. Led by an experienced local operator with deep roots in Fiji&apos;s taxi industry. Book by phone with professional, verified drivers and pay your driver in cash. App updates coming soon, subject to required approvals.
            </p>
          </div>

          {/* Contact - LARGER */}
          <div className="lg:text-right">
            <p className="text-base font-semibold text-gray-500 mb-6 tracking-wider uppercase">Contact us</p>
            <a href="mailto:info@fijicabconnect.com" className="text-2xl md:text-3xl font-bold hover:text-primary transition-colors block mb-4">
              info@fijicabconnect.com
            </a>
            <a href="tel:+6799680798" className="text-2xl md:text-3xl font-bold hover:text-primary transition-colors block mb-6">
              +679 9680798
            </a>
            <p className="text-xl text-gray-400">
              Viti Levu, Fiji Islands
            </p>
          </div>
        </div>

        {/* Bottom Section - LARGER */}
        <div className="pt-10 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Links - Larger */}
          <div className="flex flex-wrap gap-8">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-base text-gray-400 hover:text-white transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-500">
            © Cab Connect. Operating in Fiji.
          </p>
        </div>
      </div>
    </footer>
  )
}
