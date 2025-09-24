// src/app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(request: NextRequest) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Website Audit",
              description: "Complete SEO and performance analysis of your website",
            },
            unit_amount: 15900, // $159 in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${request.headers.get("origin")}/success`,
      cancel_url: `${request.headers.get("origin")}/cancel`,
      
      // 🔥 ADD THESE LINES TO COLLECT CUSTOMER INFO:
      billing_address_collection: "required",
      customer_creation: "always",
      phone_number_collection: {
        enabled: true,
      },
      custom_fields: [
        {
          key: "website_url",
          label: { type: "custom", custom: "Website URL" },
          type: "text",
          optional: false,
        },
        {
          key: "business_name",
          label: { type: "custom", custom: "Business Name" },
          type: "text",
          optional: true,
        }
      ],
      metadata: {
        product_type: "website_audit",
      }
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
