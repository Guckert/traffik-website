// src/app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(request: NextRequest) {
  console.log('Checkout API called');
  
  try {
    const origin = request.headers.get("origin");
    console.log('Origin:', origin);
    
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
      success_url: `${origin}/success`,
      cancel_url: `${origin}/cancel`,
      
      billing_address_collection: "required",
      customer_creation: "always",
      phone_number_collection: {
        enabled: true,
      },
      // Removed custom_fields temporarily to test
      metadata: {
        product_type: "website_audit",
      }
    });
    
    console.log('Session created successfully:', session.id);
    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Checkout error details:', {
      message: error.message,
      type: error.type,
      code: error.code
    });
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
