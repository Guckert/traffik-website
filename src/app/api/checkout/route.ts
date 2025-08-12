import Stripe from "stripe";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return Response.json({ error: "Configuration error" }, { status: 500 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-07-30.basil",
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `https://traffik-website-lj5y.vercel.app/?checkout=success`,
      cancel_url: `https://traffik-website-lj5y.vercel.app/?checkout=cancelled`,
      
      // Collect the website URL for the audit
      custom_fields: [
        {
          key: "website_url",
          label: { type: "custom", custom: "Website URL to audit" },
          type: "text",
          optional: false,
        },
      ],
      
      line_items: [
        {
          price_data: {
            currency: "nzd",
            unit_amount: 15900,
            product_data: {
              name: "Website Audit (48h)",
              description: "AI-powered website & SEO audit delivered in 48 hours",
            },
          },
          quantity: 1,
        },
      ],
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return Response.json({ error: "Error creating checkout session" }, { status: 500 });
  }
}
