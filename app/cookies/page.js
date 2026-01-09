import Layout from '../../components/Layout'
import Card from '../../components/Card'

export const metadata = {
  title: 'Cookie Policy - Holivo',
  description: 'Holivo Cookie Policy - How we use cookies and similar technologies',
}

export default function CookiePolicy() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        {/* Header */}
        <section className="space-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
            Cookie Policy
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
                This Cookie Policy explains how Holivo uses cookies and similar technologies on getholivo.com.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">What Are Cookies?</h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Cookies are small text files stored on your device that help websites function properly and improve user experience.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">How We Use Cookies</h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                We use cookies to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-700 ml-4">
                <li>Ensure basic website functionality</li>
                <li>Analyse site usage and performance</li>
                <li>Improve content and user experience</li>
              </ul>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                We do not use cookies to store sensitive personal information.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Third-Party Cookies</h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Some cookies may be set by third-party analytics or service providers. These cookies are governed by their own privacy policies.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Managing Cookies</h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                You can control or disable cookies through your browser settings. Disabling cookies may affect site functionality.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Contact</h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                If you have questions about our Cookie Policy, contact:
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
