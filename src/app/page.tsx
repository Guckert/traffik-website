// src/app/page.tsx
import { CheckoutButton } from '../components/CheckoutButton';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Website Audit Service
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Get a comprehensive analysis of your website's performance, SEO, and user experience
          </p>
          
          <div className="bg-slate-800/50 rounded-2xl p-8 mb-8 backdrop-blur">
            <h2 className="text-2xl font-bold mb-4">What you'll get:</h2>
            <ul className="text-left text-slate-300 space-y-2 mb-6">
              <li>✅ Performance analysis</li>
              <li>✅ SEO audit report</li>
              <li>✅ User experience review</li>
              <li>✅ Mobile responsiveness check</li>
              <li>✅ Security assessment</li>
              <li>✅ Actionable recommendations</li>
            </ul>
          </div>

          <div className="mb-8">
            <CheckoutButton />
          </div>

          <p className="text-sm text-slate-400">
            🔒 Secure payment powered by Stripe • 💰 30-day money-back guarantee
          </p>
        </div>
      </div>
    </main>
  );
}
