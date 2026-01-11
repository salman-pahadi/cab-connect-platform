import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Privacy Policy | FIJI CAB CONNECT',
  description: 'Learn how FIJI CAB CONNECT collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Privacy Policy
          </h1>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
            {/* Important Notice */}
            <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg">
              <p className="text-amber-900 font-semibold mb-2 flex items-center gap-2">
                <InformationCircleIcon className="w-6 h-6 text-primary" strokeWidth={1.5} aria-hidden="true" />
                Informational notice
              </p>
              <p className="text-amber-800 text-sm leading-relaxed">
                This privacy policy is provided for informational purposes only as part of our marketing website.
                It is not a legally binding document.
                Before our app and platform features are available, we will publish a formal privacy policy as required.
                App availability is subject to required approvals, including app store and privacy requirements.
              </p>
            </div>

            <p className="text-gray-600 text-sm">
              <strong>Last updated:</strong> Recently
            </p>

            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Information we collect
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you visit our website or contact us, we may collect the following types of information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Contact details you choose to provide (name, email, phone number)</li>
                <li>Message content you submit through our contact form</li>
                <li>Basic device and usage information (such as browser type) for website performance and security</li>
                <li>Communication records and support inquiries</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                App features are coming soon. When those services are available, additional information may be collected to provide those services.
                Details will be published before those features are available.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                How we use your information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Respond to your inquiries</li>
                <li>Support phone booking requests and general service questions</li>
                <li>Improve our website experience</li>
                <li>Protect against misuse and security issues</li>
                <li>Comply with applicable legal obligations</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Data storage and security
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We take reasonable measures to protect your personal information from unauthorized access, 
                loss, misuse, or alteration. Your data is handled using standard security practices.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Information sharing
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Service providers who help operate our website and communications</li>
                <li>Partners or contractors helping respond to your inquiry (when needed)</li>
                <li>Law enforcement when legally required</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Your rights
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Access your personal information</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent for data processing</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Cookies and similar technologies
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Our website uses cookies and similar technologies to enhance your experience, analyze usage, 
                and provide personalized content. You can control cookie preferences through your browser settings.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Children’s privacy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Our services are not intended for children. We do not knowingly collect personal information from children.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Changes to this policy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any significant 
                changes by posting the new policy on this page and updating the "Last updated" line above.
              </p>
            </section>

            {/* Contact */}
            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Contact Us
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have questions about this privacy policy or how we handle your personal information, 
                please contact us:
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
