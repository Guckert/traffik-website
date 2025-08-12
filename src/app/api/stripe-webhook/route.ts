import { headers } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return new Response('Webhook Error', { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    
    const auditData = {
      customer_email: session.customer_details?.email || "not-provided@example.com",
      customer_name: session.customer_details?.name || "Customer",
      amount_paid: session.amount_total,
      currency: session.currency?.toUpperCase() || "NZD",
      payment_id: session.id,
      payment_status: session.payment_status,
      website_url: "Website URL not provided",
      product: "Website Audit (48h)",
      timestamp: new Date().toISOString(),
    };

    try {
      await fetch("https://tsoldx.app.n8n.cloud/webhook-test/website-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(auditData),
      });
      console.log("N8N workflow triggered successfully");
    } catch (error) {
      console.error("N8N webhook error:", error);
    }
  }

  return new Response("ok", { status: 200 });
}

