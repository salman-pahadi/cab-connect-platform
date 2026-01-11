import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/home/Hero'
import HowItWorks from '@/components/home/HowItWorks'
import Features from '@/components/home/Features'
import ForTourists from '@/components/home/ForTourists'
import Pricing from '@/components/home/Pricing'
import Safety from '@/components/home/Safety'
import ForDrivers from '@/components/home/ForDrivers'
import AppComingSoon from '@/components/home/AppComingSoon'
import FAQ from '@/components/home/FAQ'
import ContactCTA from '@/components/home/ContactCTA'

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <HowItWorks />
        <Features />
        <ForTourists />
        <Pricing />
        <Safety />
        <ForDrivers />
        <AppComingSoon />
        <FAQ />
        <ContactCTA />
      </main>
      <Footer />
    </>
  )
}
