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
