import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Terms & Conditions | FIJI CAB CONNECT',
  description: 'Read the terms and conditions for using FIJI CAB CONNECT ride-hailing services.',
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Terms & Conditions
          </h1>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
            {/* Important Notice */}
            <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg">
              <p className="text-amber-900 font-semibold mb-2 flex items-center gap-2">
                <InformationCircleIcon className="w-6 h-6 text-primary" strokeWidth={1.5} aria-hidden="true" />
                Informational notice
              </p>
              <p className="text-amber-800 text-sm leading-relaxed">
                These terms and conditions are provided for informational purposes only as part of our marketing website. 
                They are not legally binding documents. Formal, legally binding terms and conditions will be established 
                before our app and platform features are available. App availability is subject to required approvals,
                including app store and privacy requirements.
              </p>
            </div>

            <p className="text-gray-600 text-sm">
              <strong>Last updated:</strong> Recently
            </p>

            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Acceptance of terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing or using the FIJI CAB CONNECT website, contacting us, or requesting a ride by phone, you agree to these terms.
                If you do not agree with any part of these terms, please do not use the website or contact channels.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Services provided
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                FIJI CAB CONNECT provides a marketing website and phone booking service that helps connect passengers with independent drivers.
                Drivers provide transportation services. FIJI CAB CONNECT is not a transportation provider.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our services are provided "as-is" without warranties of any kind, either express or implied.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                User responsibilities
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                As a user of FIJI CAB CONNECT, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Provide accurate and complete information</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Treat drivers and other users with respect</li>
                <li>Pay for services as agreed (cash payment to the driver)</li>
                <li>Not misuse or abuse the platform</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Driver responsibilities
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Drivers using FIJI CAB CONNECT must:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Hold a valid driver's license</li>
                <li>Maintain proper vehicle insurance</li>
                <li>Keep their vehicle in safe working condition</li>
                <li>Provide professional and safe service</li>
                <li>Comply with all traffic laws and regulations</li>
                <li>Treat passengers with respect</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Prohibited activities
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You may not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Use the platform for illegal activities</li>
                <li>Harass, threaten, or harm other users</li>
                <li>Attempt to hack or compromise the platform</li>
                <li>Interfere with the proper functioning of the platform</li>
                <li>Violate intellectual property rights</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Payment terms
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Payment for rides is due at the time of service. Current payment method:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Cash payment to driver</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Other payment options may be introduced in a future phase. Details will be communicated before they are available.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Cancellation policy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Rides may be cancelled by passengers or drivers. If you need to cancel, please contact your driver or call us.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Limitation of liability
              </h2>
              <p className="text-gray-700 leading-relaxed">
                FIJI CAB CONNECT is a technology platform that connects passengers with independent drivers. 
                We are not liable for the actions of drivers or passengers, accidents, injuries, property damage, 
                or other incidents that may occur during rides. Users assume all risks associated with using the platform.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Refusal of service and communications
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to refuse service or stop communications if these terms are violated or if we suspect misuse.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Changes to terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We may update these terms from time to time. Continued use of the platform after changes 
                constitutes acceptance of the new terms.
              </p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Governing law
              </h2>
              <p className="text-gray-700 leading-relaxed">
                These terms are governed by the laws of Fiji. Any disputes will be resolved in the courts of Fiji.
              </p>
            </section>

            {/* Contact */}
            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Contact Us
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have questions about these terms and conditions, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> <a href="mailto:info@fijicabconnect.com" className="text-primary hover:underline">info@fijicabconnect.com</a></p>
                <p><strong>Phone:</strong> <a href="tel:+6799680798" className="text-primary hover:underline">+679 9680798</a></p>
                <p><strong>Location:</strong> Viti Levu, Fiji Islands</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
