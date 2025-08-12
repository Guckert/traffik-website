// FILE: src/app/api/stripe-webhook/route.ts
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
  } catch (err: unknown) {
    console.error(`❌ Webhook signature verification failed:`, (err as Error).message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle successful payment completion
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    
    console.log("💰 Payment completed for session:", session.id);

    // Extract customer and payment data
    const auditData = {
      // Customer Information
      customer_email: session.customer_details?.email || "not-provided@example.com",
      customer_name: session.customer_details?.name || "Customer",
      
      // Payment Information
      amount_paid: session.amount_total, // Amount in cents (15900 = $159.00)
      currency: session.currency?.toUpperCase() || "NZD",
      payment_id: session.id,
      payment_status: session.payment_status,
      
      // Audit-specific data
      website_url: session.custom_fields?.find(field => field.key === "website")?.text?.value || 
                   session.metadata?.website || 
                   "Website URL not provided",
      
      // Product details
      product: "Website Audit (48h)",
      service_type: "seo_audit",
      delivery_timeframe: "48_hours",
      
      // Metadata
      timestamp: new Date().toISOString(),
      order_source: "traffik_website",
      automation_trigger: "stripe_payment_completed"
    };

    console.log("📊 Prepared audit data:", {
      email: auditData.customer_email,
      website: auditData.website_url,
      amount: auditData.amount_paid
    });

    // Trigger your existing MCP N8N workflow
    try {
      console.log("🚀 Triggering MCP N8N workflow...");
      
      const n8nResponse = await fetch("https://tsoldx.app.n8n.cloud/webhook-test/website-audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Traffik-Stripe-Webhook/1.0"
        },
        body: JSON.stringify(auditData),
      });

      const responseText = await n8nResponse.text();
      
      if (n8nResponse.ok) {
        console.log("✅ MCP N8N workflow triggered successfully");
        console.log("📝 N8N response:", responseText);
      } else {
        console.error("❌ N8N webhook failed:", n8nResponse.status, responseText);
        
        // Log the failure but don't fail the webhook - Stripe will retry
        console.error("📋 Failed audit data:", auditData);
      }
    } catch (error) {
      console.error("❌ Error triggering N8N workflow:", error);
      console.error("📋 Failed audit data:", auditData);
      
      // Don't throw error - we don't want Stripe to retry failed N8N calls indefinitely
    }
  }

  // Always return 200 to Stripe to acknowledge receipt
  return new Response("ok", { status: 200 });

}

