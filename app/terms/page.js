import Layout from '../../components/Layout'
import Card from '../../components/Card'

export const metadata = {
  title: 'Terms & Conditions - Holivo',
  description: 'Holivo Terms & Conditions - Terms of use for our travel comparison platform',
}

export default function TermsAndConditions() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        {/* Header */}
        <section className="space-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
            Terms & Conditions
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
                Welcome to Holivo. By accessing or using getholivo.com, you agree to be bound by these Terms & Conditions.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Use of the Website</h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Holivo provides a travel comparison platform for flights, hotels, and related services. Results may include mock or sample data during development phases.
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                You agree to use the website lawfully and not to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-700 ml-4">
                <li>Misuse or disrupt the service</li>
                <li>Attempt unauthorised access to systems</li>
                <li>Copy or resell content without permission</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">No Booking Responsibility</h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Holivo does not sell travel products directly. When you choose an offer, you will be redirected to third-party providers who handle bookings, payments, and fulfilment.
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                We are not responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-700 ml-4">
                <li>Prices, availability, or accuracy of third-party offers</li>
                <li>Cancellations, refunds, or disputes with providers</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Intellectual Property</h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                All content, branding, and design on Holivo is owned by Holivo unless otherwise stated. Unauthorised use is prohibited.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Limitation of Liability</h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Holivo is provided &quot;as is&quot; without warranties of any kind. We are not liable for losses arising from use of the platform or third-party services.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Changes to These Terms</h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                We may update these Terms at any time. Continued use of the site constitutes acceptance of any changes.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Contact</h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                For questions regarding these Terms, contact:
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
