import Layout from '../../components/Layout'
import Card from '../../components/Card'

export const metadata = {
  title: 'Privacy Policy - Holivo',
  description: 'Holivo Privacy Policy - How we collect, use, and safeguard your information',
}

export default function PrivacyPolicy() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        {/* Header */}
        <section className="space-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Last updated: 06/01/2026
          </p>
        </section>

        {/* Content */}
        <Card className="border-slate-200">
          <div className="prose prose-sm sm:prose-base max-w-none space-y-6">
            <div className="space-y-4">
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Holivo (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit getholivo.com.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Information We Collect</h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                We may collect:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-700 ml-4">
                <li>Personal information you voluntarily provide (such as email address via contact forms)</li>
                <li>Usage data (pages visited, device type, browser type)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                We do not collect payment details or sensitive personal data directly.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">How We Use Your Information</h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                We use your information to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-700 ml-4">
                <li>Operate and improve the Holivo platform</li>
                <li>Respond to enquiries and support requests</li>
                <li>Analyse usage and improve user experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Third-Party Services</h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Holivo may redirect users to trusted third-party travel providers to complete bookings. We are not responsible for the privacy practices of external websites.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Data Security</h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                We take reasonable technical and organisational measures to protect your data but cannot guarantee absolute security.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Your Rights</h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Depending on your location, you may have the right to access, correct, or delete your personal data.
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                To make a request, contact: <a href="mailto:hello@getholivo.com" className="text-teal-600 hover:text-teal-700 underline">hello@getholivo.com</a>
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Contact</h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                If you have questions about this Privacy Policy, contact us at:
              </p>
              <p className="text-sm sm:text-base text-slate-700">
                <a href="mailto:hello@getholivo.com" className="text-teal-600 hover:text-teal-700 underline">hello@getholivo.com</a>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  )
}
