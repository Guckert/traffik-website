// src/app/api/stripe/webhook/route.ts
export const runtime = "nodejs";
export const preferredRegion = "syd1";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export async function POST(req: Request): Promise<Response> {
  const signature = req.headers.get("stripe-signature");
  if (!signature) return new Response("Missing Stripe signature", { status: 400 });
  
  const rawBody = await req.text();
  
  try {
    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
    
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Retrieve the full session with expanded customer data to get address
      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ['customer']
      });
      
      const customer = fullSession.customer as Stripe.Customer;
      
      // Extract custom fields
      const custom: Record<string, string> = {};
      (fullSession.custom_fields ?? []).forEach((f) => {
        if (f.type === "text" && f.key) custom[f.key] = f.text?.value ?? "";
      });
      
      // Prepare data with address information
      const webhookData = {
        product: fullSession.metadata?.product,
        amount_total: fullSession.amount_total,
        currency: fullSession.currency,
        customer_email: customer.email,
        customer_name: customer.name,
        customer_phone: customer.phone,
        billing_address: {
          line1: customer.address?.line1,
          line2: customer.address?.line2,
          city: customer.address?.city,
          state: customer.address?.state,
          postal_code: customer.address?.postal_code,
          country: customer.address?.country,
        },
        custom_fields: custom,
        session_id: fullSession.id,
      };
      
      // Log the data for debugging
      console.log('=== STRIPE WEBHOOK DATA ===');
      console.log('Customer:', customer.email);
      console.log('Address:', customer.address);
      console.log('Phone:', customer.phone);
      console.log('Custom Fields:', custom);
      console.log('==========================');
      
      // Send to N8N webhook
      await fetch(process.env.N8N_WEBHOOK_URL as string, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(webhookData),
      });
    }
    
    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Webhook error:", message);
    return new Response(`Webhook Error: ${message}`, { status: 400 });
  }
}
