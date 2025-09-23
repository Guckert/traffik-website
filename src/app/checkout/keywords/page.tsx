"use client";
import { useEffect } from "react";

export default function KeywordsCheckout() {
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: "keywords" }),
      });
      const { url, error } = await res.json();
      if (url) window.location.href = url;
      else alert(error || "Checkout error");
    })();
  }, []);
  return <p className="p-8 text-center">Redirecting to secure checkout…</p>;
}
