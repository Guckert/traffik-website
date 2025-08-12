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

export default function TraffikLanding() {
  // Inject minimal JSON-LD for Product (Audit) + Organization
  useEffect(() => {
    const org = document.createElement("script");
    org.type = "application/ld+json";
    org.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "traffik",
      url: "https://traffik.nz",
      sameAs: ["https://traffik.nz"],
      logo: "https://traffik.nz/logo.png",
    });

    const product = document.createElement("script");
    product.type = "application/ld+json";
    product.innerHTML = JSON.stringify({

  "@context": "https://schema.org",
  "@type": "Product",
  name: "Website Audit",
  description: "AI-powered website & SEO audit. Speed, technical fixes, content gaps, link opportunities. Delivered in 48 hours.",
  brand: { "@type": "Organization", name: "traffik" },
  offers: {
    // ...
  }
}
);

    document.head.appendChild(org);
    document.head.appendChild(product);
    return () => {
      document.head.removeChild(org);
      document.head.removeChild(product);
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
            <a href="#work" className="hover:text-white">Case Studies</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <Ghost href="#plans">View Plans</Ghost>
            <CheckoutButton />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,229,255,0.15),_rgba(0,0,0,0))]" />
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-20 md:grid-cols-2">
          <div>
            <div className="mb-4"><Badge>AI + SEO Engineered</Badge></div>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-6xl">
              Built for Speed. Engineered to Rank.
            </h1>
            <p className="mb-8 max-w-xl text-lg text-white/80">
              AI websites and SEO systems that put brands at the top — and keep them there. Start with a
              <span className="text-white"> $159 website audit</span>.
            </p>
            <div className="flex flex-wrap gap-3">
              <CheckoutButton />
              <Ghost href="#work">See Case Studies</Ghost>
            </div>
            <p className="mt-3 text-xs text-white/60">Delivered in 48 hours. Money‑back if no high‑impact fixes.</p>
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
              Optimized for Google + AI search answers. Schema, fast SSR, and content clusters baked in.
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
                desc: "High‑performance builds with SSR/SSG, pristine Core Web Vitals, and conversion‑first UX.",
              },
              {
                icon: <LineChart className="h-5 w-5" aria-hidden />, title: "SEO Domination",
                desc: "Technical SEO, entity building, content clusters, and digital PR designed to win SERPs.",
              },
              {
                icon: <ShieldCheck className="h-5 w-5" aria-hidden />, title: "Conversion Optimisation",
                desc: "A/B testing, heatmaps, and copy experiments that turn traffic into revenue.",
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
              <p className="mb-5 text-white/80">Fast, actionable, and part human. We identify 10+ high‑impact fixes and deliver a clear 90‑day plan.</p>
              <ul className="mb-6 space-y-2 text-white/90">
                {[
                  "Core Web Vitals & speed report with prioritized fixes",
                  "Top 10 technical SEO issues (indexability, canonicals, mobile)",
                  "AI keyword gap analysis and suggested pages",
                  "3 on‑page rewrites (Title, H1, Meta, Intro)",
                  "Backlink snapshot + 5 link opportunities",
                  
                ,
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="mt-1 h-4 w-4 text-cyan-300" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <CheckoutButton label="Buy Audit — $159" />
                <Ghost href="#faq">See FAQ</Ghost>
              </div>
              <p className="mt-3 text-xs text-white/60">Delivered in 48 hours. Full refund if we don't find 3+ high‑impact fixes.</p>
            </div>
            <div className="rounded-2xl border border-white/10 p-6">
              <h3 className="mb-4 text-lg font-semibold">What you'll receive</h3>
              <div className="space-y-3 text-sm text-white/80">
                <div className="rounded-xl bg-white/5 p-4">PDF executive summary + interactive dashboard</div>
                <div className="rounded-xl bg-white/5 p-4">actionable recommendations</div>
                <div className="rounded-xl bg-white/5 p-4">Option to have us implement fixes or start a growth plan</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="plans" className="border-t border-white/10 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold">Website from $59/month • Custom builds $3k–$50k • SaaS options</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Subscription Website */}
            <div className="rounded-2xl border border-white/10 p-6">
              <h3 className="mb-1 text-xl font-semibold">Subscription Website</h3>
              <p className="mb-4 text-sm text-white/70">From <span className="font-semibold text-white">$59/month</span></p>
              <ul className="mb-6 space-y-2 text-white/90">
                {[
                  "Hosting, maintenance, and updates included",
                  "Light SEO improvements monthly",
                  "Zero upfront build cost",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2"><Check className="mt-1 h-4 w-4 text-cyan-300" aria-hidden />{f}</li>
                ))}
              </ul>
              <Ghost href="#contact">Start from $59/month</Ghost>
            </div>

            {/* Custom Build */}
            <div className="rounded-2xl border border-white/10 p-6">
              <h3 className="mb-1 text-xl font-semibold">Custom Build</h3>
              <p className="mb-4 text-sm text-white/70">From <span className="font-semibold text-white">$3,000 – $50,000</span></p>
              <ul className="mb-6 space-y-2 text-white/90">
                {[
                  "Bespoke design & component library",
                  "Headless CMS + Next.js performance",
                  "Analytics + conversion tracking setup",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2"><Check className="mt-1 h-4 w-4 text-cyan-300" aria-hidden />{f}</li>
                ))}
              </ul>
              <Ghost href="#contact">Request a Quote</Ghost>
            </div>

            {/* SaaS */}
            <div className="rounded-2xl border border-white/10 p-6">
              <h3 className="mb-1 text-xl font-semibold">SaaS Options</h3>
              <p className="mb-4 text-sm text-white/70">AI SEO dashboards & automation</p>
              <ul className="mb-6 space-y-2 text-white/90">
                {[
                  "Automated reporting & alerts",
                  "Entity & schema management",
                  "API integrations (Search Console, GA4, Ahrefs)",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2"><Check className="mt-1 h-4 w-4 text-cyan-300" aria-hidden />{f}</li>
                ))}
              </ul>
              <Ghost href="#contact">See a Demo</Ghost>
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
                a: "Within 48 hours. You'll receive a PDF summary, an interactive dashboard, and a booking link for a 30‑minute call.",
              },
              {
                q: "Is the audit automated or manual?",
                a: "Both. Our AI handles the heavy scanning; a specialist reviews, prioritizes, and writes your 90‑day plan.",
              },
              {
                q: "Do you offer refunds?",
                a: "Yes. If we don't find at least three high‑impact fixes, we'll refund the $159.",
              },
              {
                q: "Can you implement the fixes?",
                a: "Absolutely. Choose a one‑off implementation sprint or move into a monthly growth plan.",
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
              <h3 className="mb-2 text-xl font-semibold">Let's build your growth engine</h3>
              <p className="mb-4 text-white/70">Email <a href="mailto:hello@traffik.nz" className="underline">hello@traffik.nz</a> or use the button below.</p>
              <div className="flex gap-3">
                <CheckoutButton />
                
              </div>
            <div className="rounded-2xl border border-white/10 p-6 text-center">
  <p className="mb-4 text-white/70">Ready to get started?</p>
  <a href="mailto:hello@traffik.nz?subject=Website Audit Inquiry" 
     className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/0 px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/30">
    Email Us Directly
  </a>
  <p className="mt-3 text-xs text-white/50">Or use the audit button above for instant checkout</p>
</div>
            </div>
            <div className="text-sm text-white/60">
              <p className="mb-2">© 2023 traffik. All rights reserved.</p>
              <p className="mb-2">Made with ❤️ in New Zealand</p>
              <p className="mb-2">Privacy Policy | Terms of Service</p>
              <p>Follow us on <a href="https://twitter.com/traffiknz" className="underline">Twitter</a></p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}