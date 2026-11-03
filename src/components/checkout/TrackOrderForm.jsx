"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Package } from "lucide-react";
import FormField from "@/components/ui/FormField";
import { apiFetch } from "@/lib/api-client";
import { formatPaise } from "@/lib/pricing-rules";
import { cn } from "@/lib/utils";

const TIMELINE = ["CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED"];
const LABELS = { PENDING: "Awaiting payment", CONFIRMED: "Confirmed", PROCESSING: "Processing", SHIPPED: "Shipped", DELIVERED: "Delivered", CANCELLED: "Cancelled" };
const dateFormat = new Intl.DateTimeFormat("en-IN", { dateStyle: "long" });

export default function TrackOrderForm() {
  const [state, setState] = useState({ status: "idle", order: null, error: "", fields: {} });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setState({ status: "loading", order: null, error: "", fields: {} });
    try {
      const { order } = await apiFetch("/api/orders/lookup", {
        method: "POST",
        body: { orderNumber: String(form.get("orderNumber")).trim().toUpperCase(), email: form.get("email") },
      });
      setState({ status: "done", order, error: "", fields: {} });
    } catch (err) {
      setState({ status: "error", order: null, error: err.message, fields: err.fields });
    }
  };

  const { order } = state;
  const reached = order ? TIMELINE.indexOf(order.orderStatus) : -1;

  return (
    <div className="mx-auto grid max-w-4xl gap-6 sm:gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <form onSubmit={handleSubmit} className="h-fit rounded-2xl sm:rounded-[2rem] border border-line bg-white p-5 sm:p-8 shadow-card">
        <span className="flex size-11 sm:size-12 items-center justify-center rounded-full bg-sage text-forest">
          <Package className="size-5" strokeWidth={1.5} aria-hidden />
        </span>
        <div className="mt-4 sm:mt-5 grid gap-3.5 sm:gap-4">
          <FormField label="Order Number" name="orderNumber" required placeholder="AW…" maxLength={22} autoComplete="off" error={state.fields.orderNumber} />
          <FormField label="Email Address" name="email" type="email" required maxLength={254} autoComplete="email" error={state.fields.email} />
        </div>
        {state.status === "error" && (
          <p role="alert" className="mt-3 text-xs sm:text-sm text-crimson">
            {state.error}
          </p>
        )}
        <button
          type="submit"
          disabled={state.status === "loading"}
          className="mt-5 sm:mt-6 w-full rounded-full bg-forest py-3.5 text-sm font-semibold text-white shadow-card transition-colors hover:bg-forest-dark disabled:opacity-60"
        >
          {state.status === "loading" ? "Checking…" : "Track Order"}
        </button>
      </form>

      {order ? (
        <div className="rounded-2xl sm:rounded-[2rem] border border-line bg-white p-5 sm:p-8 shadow-card" aria-live="polite">
          <p className="text-xs text-muted">Order #{order.orderNumber}</p>
          <h2 className="mt-1 text-2xl sm:text-3xl font-semibold text-forest">{LABELS[order.orderStatus]}</h2>
          <p className="mt-0.5 text-xs sm:text-sm text-muted">Placed on {dateFormat.format(new Date(order.createdAt))}</p>

          {order.orderStatus !== "CANCELLED" && order.paymentStatus === "PAID" && (
            <ol className="mt-5 sm:mt-6 grid grid-cols-4 gap-1.5 sm:gap-2">
              {TIMELINE.map((s, i) => (
                <li key={s} className="flex flex-col items-center gap-1.5 sm:gap-2 text-center">
                  <span className={cn("flex size-7 sm:size-8 items-center justify-center rounded-full text-xs font-semibold", i <= reached ? "bg-leaf text-white" : "bg-cream text-muted")}>
                    {i <= reached ? <Check className="size-3.5 sm:size-4" /> : i + 1}
                  </span>
                  <span className="text-[0.65rem] sm:text-[0.7rem] leading-tight font-medium text-ink">{LABELS[s]}</span>
                </li>
              ))}
            </ol>
          )}

          <ul className="mt-5 sm:mt-6 space-y-3 border-t border-line pt-4 sm:pt-5">
            {order.items.map((item) => (
              <li key={item.name} className="flex items-center gap-3 text-xs sm:text-sm">
                <span className="relative size-11 sm:size-12 shrink-0 overflow-hidden rounded-xl bg-cream border border-line/60">
                  <Image src={item.image} alt="" fill sizes="48px" className="object-contain p-1" />
                </span>
                <span className="flex-1 font-medium">
                  {item.name} <span className="text-muted font-normal">× {item.quantity}</span>
                </span>
                <span className="font-semibold">{formatPaise(item.totalPrice)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 flex justify-between border-t border-line pt-3 text-sm font-semibold">
            <span>Total</span>
            <span className="font-serif text-lg text-forest font-bold">{formatPaise(order.totalAmount)}</span>
          </p>
          <p className="mt-2 text-[11px] sm:text-xs text-muted">
            Payment: {order.paymentStatus.toLowerCase()} · Delivering to {order.city}, {order.state}
          </p>
        </div>
      ) : null}
    </div>
  );
}
