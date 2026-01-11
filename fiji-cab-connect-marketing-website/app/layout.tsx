import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Cab Connect - Ride Anywhere in Fiji | Fiji\'s First Cab-Hailing Platform',
  description: 'Professional taxi and cab service across the Fiji Islands. Call to book your ride with verified drivers. Cash payment accepted. App coming soon.',
  keywords: 'fiji taxi, cab booking fiji, nadi taxi, suva taxi, lautoka taxi, fiji transport, ride hailing fiji, taxi service fiji, book cab fiji',
  alternates: {
    canonical: 'https://fijicabconnect.com',
  },
  openGraph: {
    title: 'Cab Connect - Ride Anywhere in Fiji',
    description: 'Professional taxi and cab service across the Fiji Islands. Call to book your ride. Cash payment accepted.',
    type: 'website',
    locale: 'en_FJ',
    siteName: 'Cab Connect',
    url: 'https://fijicabconnect.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cab Connect - Ride Anywhere in Fiji',
    description: 'Professional taxi and cab service across the Fiji Islands. Call to book your ride.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FIJI CAB CONNECT',
    url: 'https://fijicabconnect.com',
    logo: 'https://fijicabconnect.com/logo/logo-horizontal.svg',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+679 9680798',
        contactType: 'customer service',
        areaServed: 'Fiji',
      },
    ],
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Taxi and Cab Service in Fiji',
    serviceType: 'Taxi service',
    areaServed: 'Viti Levu, Fiji',
    provider: {
      '@type': 'Organization',
      name: 'FIJI CAB CONNECT',
      url: 'https://fijicabconnect.com',
    },
  }

  return (
    <html lang="en-FJ" className={plusJakartaSans.variable}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/logo/favicon.svg" />
        <link rel="alternate icon" type="image/x-icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      </head>
      <body className={plusJakartaSans.className}>
        {children}
      </body>
    </html>
  )
}
