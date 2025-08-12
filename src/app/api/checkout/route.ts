import Stripe from "stripe";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Check if Stripe key exists
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY not found');
      return Response.json({ error: "Configuration error" }, { status: 500 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-07-30.basil",
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/?checkout=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/?checkout=cancelled`,
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
    return Response.json(
      { error: "Error creating checkout session" }, 
      { status: 500 }
    );
  }
}
