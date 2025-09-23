// src/app/api/checkout/route.ts
export const runtime = "nodejs";
export const preferredRegion = "syd1";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

type ProductKey = "audit" | "keywords";
const PRODUCTS: Record<ProductKey, { name: string; amount: number }> = {
  audit: { name: "Job-Winning Audit", amount: 15900 },         // $159
  keywords: { name: "Keyword Research Report", amount: 35000 }, // $350
};

export async function POST(req: Request): Promise<Response> {
  const body = (await req.json()) as { product?: string };
  const product = body.product as ProductKey | undefined;

  if (!product || !(product in PRODUCTS)) {
    return NextResponse.json({ error: "Invalid product" }, { status: 400 });
  }

  const { name, amount } = PRODUCTS[product];

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "nzd",
          product_data: { name },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    customer_creation: "always",
    custom_fields: [
      { key: "first_name", label: { type: "custom", custom: "First name" }, type: "text", text: { maximum_length: 40 } },
      { key: "last_name",  label: { type: "custom", custom: "Last name"  }, type: "text", text: { maximum_length: 60 } },
      { key: "keywords",   label: { type: "custom", custom: "3 keywords (comma-separated)" }, type: "text", text: { maximum_length: 120 } },
      { key: "location",   label: { type: "custom", custom: "Location" }, type: "text", text: { maximum_length: 80 } },
    ],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/#plans`,
    metadata: { product },
  });

  return NextResponse.json({ url: session.url }, { status: 200 });
}
