"use client";
import { useState } from "react";

interface CheckoutButtonProps {
  label?: string;
}

export function CheckoutButton({ label = "Get Audit — $159" }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Sorry, there was an error. Please try again or email hello@traffik.nz");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="inline-flex items-center justify-center rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-cyan-400/20 transition hover:translate-y-[-1px] hover:shadow-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-300 disabled:opacity-60"
      aria-label={`Purchase ${label}`}
    >
      {loading ? "Redirecting to checkout..." : label}
    </button>
  );
}