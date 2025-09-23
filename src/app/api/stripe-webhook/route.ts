import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" });

export async function POST(req: Request) {
  const signature = req.headers.get("stripe-signature")!;
  const body = await req.text(); // raw body required for signature verification

  try {
    const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);

    if (event.type === "checkout.session.completed") {
      const s = event.data.object as Stripe.Checkout.Session;

      const custom: Record<string, string> = {};
      (s.custom_fields || []).forEach((f) => {
        if (f.type === "text" && f.key) custom[f.key] = f.text?.value || "";
      });

      // Push into n8n
      await fetch(process.env.N8N_WEBHOOK_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: s.metadata?.product,
          amount_total: s.amount_total,
          currency: s.currency,
          customer_email: s.customer_details?.email,
          customer_name: s.customer_details?.name,
          custom_fields: custom,
          session_id: s.id,
        }),
      });
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("Webhook error:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }
}
