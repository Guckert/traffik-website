// FILE: app/page.tsx
'use client';

import { useEffect } from "react";
import { Check, Rocket, Zap, LineChart, ShieldCheck } from "lucide-react";
import { CheckoutButton } from "@/components/CheckoutButton";

// Simple badge component
const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full border border-cyan-400/40 px-3 py-1 text-xs font-medium text-cyan-300/90">
    {children}
  </span>
);

// Secondary button
const Ghost = ({ href = "#plans", children }: { href?: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/0 px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/30"
  >
    {children}
  </a>
);

// Primary link-style button for non-Checkout routes
const PrimaryLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/30"
  >
    {children}
  </a>
);

export default function TraffikLanding() {
  // JSON-LD for Organization + two Products (Audit, Keyword Research)
  useEffect(() => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://traffik.nz";

    const org = document.createElement("script");
    org.type = "application/ld+json";
    org.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "traffik",
      url: origin,
      sameAs: [origin],
      logo: `${origin}/logo.png`,
    });

    const audit = document.createElement("script");
    audit.type = "application/ld+json";
    audit.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Job-Winning Website Audit",
      description:
        "Fast, actionable AI-assisted website audit that prioritises fixes and maps a 90-day plan.",
      brand: { "@type": "Organization", name: "traffik" },
      sku: "AUDIT-159",
      offers: {
        "@type": "Offer",
        price: "159.00",
        priceCurrency: "NZD",
        availability: "https://schema.org/InStock",
        url: `${origin}/checkout/audit`,
      },
    });

    const kw = document.createElement("script");
    kw.type = "application/ld+json";
    kw.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Keyword Research Report",
      description:
        "Trade-focused keyword and demand analysis to target the jobs that ring the phone.",
      brand: { "@type": "Organization", name: "traffik" },
      sku: "KW-350",
      offers: {
        "@type": "Offer",
        price: "350.00",
        priceCurrency: "NZD",
        availability: "https://schema.org/InStock",
        url: `${origin}/checkout/keywords`,
      },
    });

    document.head.appendChild(org);
    document.head.appendChild(audit);
    document.head.appendChild(kw);
    return () => {
      document.head.removeChild(org);
      document.head.removeChild(audit);
      document.head.removeChild(kw);
    };
  }, []);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-cyan-300 selection:text-black">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#top" className="text-lg font-bold tracking-tight" aria-label="traffik home">
            traffik
          </a>
          <nav className="hidden gap-6 text-sm text-white/80 md:flex" aria-label="Primary">
            <a href="#services" className="hover:text-white">Services</a>
            <a href="#audit" className="hover:text-white">$159 Audit</a>
            <a href="#plans" className="hover:text-white">Pricing</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <Ghost href="#plans">View Plans</Ghost>
            {/* Stripe checkout for $159 audit */}
            <CheckoutButton />
          </div>
        </div>
      </header>

      {/* Hero (rewritten to “win more jobs”) */}
      <section id="top" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,229,255,0.15),_rgba(0,0,0,0))]" />
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-20 md:grid-cols-2">
          <div>
            <div className="mb-4"><Badge>Win More Jobs</Badge></div>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-6xl">
              Get Found First. Phone Rings More.
            </h1>
            <p className="mb-8 max-w-xl text-lg text-white/80">
              Don’t get buried by Google or AI search. We make sure customers find you — not your competitors.
              Start with a<span className="text-white"> $159 job-winning audit</span>.
            </p>
            <div className="flex flex-wrap gap-3">
              <CheckoutButton />
              <Ghost href="#plans">See Plans</Ghost>
            </div>
            <p className="mt-3 text-xs text-white/60">Delivered in 48 hours. Money-back if no high-impact fixes.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-2xl">
            <div className="mb-3 flex items-center gap-2 text-sm text-white/70">
              <Zap className="h-4 w-4" aria-hidden /> Core Web Vitals Snapshot
            </div>
            <div className="grid grid-cols-3 gap-4 text-center" aria-label="Core Web Vitals">
              {[
                { k: "LCP", v: "1.1s" },
                { k: "CLS", v: "0.03" },
                { k: "TTI", v: "1.8s" },
              ].map((m) => (
                <div key={m.k} className="rounded-xl bg-white/5 p-4">
                  <div className="text-xs text-white/60">{m.k}</div>
                  <div className="text-2xl font-semibold">{m.v}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl bg-gradient-to-r from-cyan-400/20 to-transparent p-4 text-sm text-white/80">
              Optimised for Google + AI search answers. Schema, speed, and content clusters baked in.
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-t border-white/10 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: <Rocket className="h-5 w-5" aria-hidden />, title: "AI Websites",
                desc: "High-performance builds with SSR/SSG, pristine Core Web Vitals, and conversion-first UX.",
              },
              {
                icon: <LineChart className="h-5 w-5" aria-hidden />, title: "Visibility Engine",
                desc: "Technical fixes, content clusters, and trust signals that push you to the top.",
              },
              {
                icon: <ShieldCheck className="h-5 w-5" aria-hidden />, title: "Conversion Optimisation",
                desc: "A/B tests and copy experiments that turn traffic into booked jobs.",
              },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-white/10 p-6">
                <div className="mb-3 text-cyan-300">{c.icon}</div>
                <h3 className="mb-2 text-xl font-semibold">{c.title}</h3>
                <p className="text-white/80">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audit Offer */}
      <section id="audit" className="border-t border-white/10 bg-white/[0.02] py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-3 text-3xl font-bold">Website Audit — $159</h2>
              <p className="mb-5 text-white/80">
                Fast, actionable, and part human. We identify 10+ high-impact fixes and deliver a clear 90-day plan.
              </p>
              <ul className="mb-6 space-y-2 text-white/90">
                {[
                  "Core Web Vitals & speed report with prioritised fixes",
                  "Top 10 technical issues (indexability, canonicals, mobile)",
                  "AI keyword gap analysis and suggested pages",
                  "3 on-page rewrites (Title, H1, Meta, Intro)",
                  "Backlink snapshot + 5 link opportunities",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="mt-1 h-4 w-4 text-cyan-300" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                {/* Stripe checkout for $159 */}
                <CheckoutButton label="Buy Audit — $159" />
                <Ghost href="#faq">See FAQ</Ghost>
              </div>
              <p className="mt-3 text-xs text-white/60">
                Delivered in 48 hours. Full refund if we don&apos;t find 3+ high-impact fixes.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 p-6">
              <h3 className="mb-4 text-lg font-semibold">What you&apos;ll receive</h3>
              <div className="space-y-3 text-sm text-white/80">
                <div className="rounded-xl bg-white/5 p-4">PDF executive summary + interactive dashboard</div>
                <div className="rounded-xl bg-white/5 p-4">Prioritised, plain-English recommendations</div>
                <div className="rounded-xl bg-white/5 p-4">Option to have us implement fixes or start a growth plan</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Plans (3 offers: $159, $350, $3,000/mo) */}
      <section id="plans" className="border-t border-white/10 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold">Choose Your Package</h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Audit */}
            <div className="rounded-2xl border border-white/10 p-6">
              <h3 className="mb-1 text-xl font-semibold">Job-Winning Audit</h3>
              <p className="mb-4 text-sm text-white/70">
                <span className="font-semibold text-white">$159</span> one-time
              </p>
              <ul className="mb-6 space-y-2 text-white/90">
                {[
                  "Why customers aren’t finding you",
                  "Prioritised fixes, step by step",
                  "Delivered fast so you can act now",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-1 h-4 w-4 text-cyan-300" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
              {/* Stripe checkout for $159 */}
              <CheckoutButton label="Buy Audit — $159" />
            </div>

            {/* Keyword Research */}
            <div className="rounded-2xl border border-white/10 p-6 ring-2 ring-white/10">
              <h3 className="mb-1 text-xl font-semibold">Keyword Research Report</h3>
              <p className="mb-4 text-sm text-white/70">
                <span className="font-semibold text-white">$350</span> one-time
              </p>
              <ul className="mb-6 space-y-2 text-white/90">
                {[
                  "Exact phrases people use for your trade",
                  "Targets ordered for quick wins",
                  "Content & ads action plan",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-1 h-4 w-4 text-cyan-300" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
              {/* Stripe checkout for $350 via /checkout/keywords */}
              <PrimaryLink href="/checkout/keywords">Buy Keyword Report — $350</PrimaryLink>
            </div>

            {/* Visibility Pack */}
            <div className="rounded-2xl border border-white/10 p-6">
              <h3 className="mb-1 text-xl font-semibold">Visibility Pack</h3>
              <p className="mb-4 text-sm text-white/70">
                <span className="font-semibold text-white">$3,000</span> per month
              </p>
              <ul className="mb-6 space-y-2 text-white/90">
                {[
                  "Show up first where customers look",
                  "Monthly content + on-page improvements",
                  "Google Business Profile optimisation",
                  "Citations + review strategy",
                  "Measurement & ongoing adjustments",
                  "Month-to-month. No lock-ins.",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-1 h-4 w-4 text-cyan-300" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
              {/* Booking/Contact only — no Stripe */}
              <Ghost href="/book/visibility">Book a Call</Ghost>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-white/10 bg-white/[0.02] py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold">FAQ</h2>
          <div className="space-y-6">
            {[
              {
                q: "How fast will I get the audit?",
                a: "Within 48 hours. You'll receive a PDF summary, an interactive dashboard, and a booking link for a 30-minute call.",
              },
              {
                q: "Is the audit automated or manual?",
                a: "Both. Our AI handles the heavy scanning; a specialist reviews, prioritises, and writes your 90-day plan.",
              },
              {
                q: "Do you offer refunds?",
                a: "Yes. If we don't find at least three high-impact fixes, we'll refund the $159.",
              },
              {
                q: "Can you implement the fixes?",
                a: "Absolutely. Choose a one-off implementation sprint or move into a monthly growth plan.",
              },
            ].map((f) => (
              <details key={f.q} className="group rounded-xl border border-white/10 p-4">
                <summary className="cursor-pointer list-none text-lg font-semibold">
                  <span className="mr-2 inline-block transition group-open:rotate-90">›</span>{f.q}
                </summary>
                <p className="mt-2 text-white/80">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-white/10 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-xl font-semibold">Let&apos;s build your growth engine</h3>
              <p className="mb-4 text-white/70">
                Email <a href="mailto:hello@traffik.nz" className="underline">hello@traffik.nz</a> or use the button below.
              </p>
              <div className="flex flex-wrap gap-3">
                {/* Stripe checkout for $159 */}
                <CheckoutButton />
                {/* Stripe checkout for $350 via route */}
                <PrimaryLink href="/checkout/keywords">Buy Keyword Report — $350</PrimaryLink>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 p-6 text-center">
                <p className="mb-4 text-white/70">Ready to get started?</p>
                <a
                  href="mailto:hello@traffik.nz?subject=Website Audit Inquiry"
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/0 px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  Email Us Directly
                </a>
                <p className="mt-3 text-xs text-white/50">Or use the checkout buttons above for instant payment.</p>
              </div>
            </div>

            <div className="text-sm text-white/60">
              <p className="mb-2">© {new Date().getFullYear()} traffik. All rights reserved.</p>
              <p className="mb-2">Made with ❤️ in New Zealand</p>
              <p className="mb-2">Privacy Policy | Terms of Service</p>
              <p>
                Follow us on{" "}
                <a href="https://twitter.com/traffiknz" className="underline">
                  Twitter
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
