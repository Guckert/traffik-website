import Stripe from "stripe";
import { NextRequest } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy", {
  apiVersion: "2024-06-20",
});

export async function POST(req: NextRequest) {
  try {
    console.log("Creating Stripe checkout session...");
    
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/?checkout=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/?checkout=cancelled`,
      line_items: [
        {
          price_data: {
            currency: "nzd",
            unit_amount: 15900, // $159.00 NZD
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