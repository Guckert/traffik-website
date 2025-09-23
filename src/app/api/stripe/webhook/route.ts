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

      const custom: Record<string, string> = {};
      (session.custom_fields ?? []).forEach((f) => {
        if (f.type === "text" && f.key) custom[f.key] = f.text?.value ?? "";
      });

      await fetch(process.env.N8N_WEBHOOK_URL as string, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: session.metadata?.product,
          amount_total: session.amount_total,
          currency: session.currency,
          customer_email: session.customer_details?.email,
          customer_name: session.customer_details?.name,
          custom_fields: custom,
          session_id: session.id,
        }),
      });
    }

    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Webhook error:", message);
    return new Response(`Webhook Error: ${message}`, { status: 400 });
  }
}
