// components/PricingGrid.tsx
import Link from "next/link";

const plans = [
  {
    name: "Job-Winning Audit",
    price: "$159",
    cadence: "one-time",
    features: [
      "Find why customers aren’t finding you",
      "Plain-English fixes, step by step",
      "Delivered fast so you can act now",
    ],
    cta: "Book My Audit",
    href: "/checkout/audit",
    highlight: false,
  },
  {
    name: "Keyword Research Report",
    price: "$350",
    cadence: "one-time",
    features: [
      "Exact phrases people use for your trade",
      "Prioritised targets for quick wins",
      "Content & ads action plan",
    ],
    cta: "Get My Research",
    href: "/checkout/keywords",
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Visibility Pack",
    price: "$3,000",
    cadence: "per month",
    features: [
      "Show up first where customers look",
      "On-page fixes + content each month",
      "Google Business Profile optimisation",
      "Local citations + review strategy",
      "Ongoing measurement & improvements",
      "Month-to-month. No lock-ins.",
    ],
    cta: "Book a Call",
    href: "/book/visibility", // no Stripe here
    highlight: false,
  },
];

export default function PricingGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Pick the plan that matches where your business is at
        </h2>
        <p className="mt-3 text-muted-foreground">
          Start small or go all-in. Either way, the goal is the same: more jobs.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={[
              "rounded-2xl border p-6 shadow-sm bg-white",
              p.highlight ? "ring-2 ring-black" : "",
            ].join(" ")}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">{p.name}</h3>
              {p.badge && (
                <span className="text-xs font-medium rounded-full border px-2 py-1">
                  {p.badge}
                </span>
              )}
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-bold">{p.price}</span>
              <span className="text-sm text-muted-foreground">{p.cadence}</span>
            </div>

            <ul className="mt-6 space-y-2 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <span>•</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <Link
              href={p.href}
              className={[
                "mt-6 inline-flex w-full items-center justify-center rounded-xl px-4 py-2 text-sm font-medium",
                p.highlight
                  ? "bg-black text-white hover:opacity-90"
                  : "border hover:bg-gray-50",
              ].join(" ")}
            >
              {p.cta}
            </Link>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Prices in NZD. Each plan focuses on one business at a time. Multi-brand or
        multi-location available on request.
      </p>
    </section>
  );
}

