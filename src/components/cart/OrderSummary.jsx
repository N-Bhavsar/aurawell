"use client";

import Image from "next/image";
import { Truck } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/pricing-rules";
import { formatPrice } from "@/lib/utils";

/** Pass `quote` (server totals in paise) to show confirmed amounts instead of the cart estimate. */
export default function OrderSummary({ showItems = false, quote, children }) {
  const cart = useCart();
  const items = quote
    ? quote.lines.map((l) => ({ key: l.productId, name: l.productName, image: l.productImage, quantity: l.quantity, lineTotal: l.totalPrice / 100 }))
    : cart.items.map((i) => ({ key: i.productId, name: i.name, image: i.image, quantity: i.quantity, lineTotal: i.price * i.quantity }));
  const subtotal = quote ? quote.subtotal / 100 : cart.subtotal;
  const shipping = quote ? quote.shippingAmount / 100 : cart.shipping;
  const total = quote ? quote.totalAmount / 100 : cart.total;
  const remaining = FREE_SHIPPING_THRESHOLD / 100 - subtotal;

  return (
    <div className="rounded-2xl sm:rounded-[2rem] border border-line bg-white p-5 sm:p-8 shadow-card">
      <h2 className="text-xl sm:text-2xl font-semibold">Order Summary</h2>

      {showItems && (
        <ul className="mt-4 sm:mt-6 space-y-3 sm:space-y-4 border-b border-line pb-4 sm:pb-6">
          {items.map((item) => (
            <li key={item.key} className="flex items-center gap-3">
              <span className="relative size-12 sm:size-14 shrink-0 overflow-hidden rounded-xl bg-cream border border-line/60">
                <Image src={item.image} alt="" fill sizes="56px" className="object-contain p-1" />
                <span className="absolute -top-0 -right-0 flex size-4 sm:size-5 items-center justify-center rounded-bl-lg bg-forest text-[0.6rem] sm:text-[0.65rem] font-bold text-white">
                  {item.quantity}
                </span>
              </span>
              <span className="flex-1 text-xs sm:text-sm text-ink line-clamp-2">{item.name}</span>
              <span className="text-xs sm:text-sm font-semibold">{formatPrice(item.lineTotal)}</span>
            </li>
          ))}
        </ul>
      )}

      <dl className="mt-4 sm:mt-6 space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
        <div className="flex justify-between">
          <dt className="text-muted">Subtotal</dt>
          <dd className="font-medium">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">Shipping</dt>
          <dd className={shipping === 0 ? "font-semibold text-leaf" : "font-medium"}>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
        </div>
        <div className="flex justify-between border-t border-line pt-3 sm:pt-4 text-sm sm:text-base font-semibold">
          <dt>Total</dt>
          <dd className="font-serif text-xl sm:text-2xl text-forest">{formatPrice(total)}</dd>
        </div>
      </dl>

      {!quote && subtotal > 0 && (
        <p className="mt-2.5 text-[11px] sm:text-xs text-muted">Final prices are confirmed at checkout.</p>
      )}

      {subtotal > 0 && remaining > 0 ? (
        <div className="mt-4 rounded-xl bg-sage/60 p-3 text-xs text-forest">
          <div className="flex items-center justify-between font-medium">
            <span className="flex items-center gap-1.5">
              <Truck className="size-4 shrink-0" aria-hidden /> Free Shipping
            </span>
            <span className="font-semibold">Add {formatPrice(remaining)}</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-cream">
            <div
              className="h-full rounded-full bg-leaf transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(8, (subtotal / (FREE_SHIPPING_THRESHOLD / 100)) * 100))}%` }}
            />
          </div>
        </div>
      ) : subtotal > 0 ? (
        <p className="mt-4 flex items-center gap-2 rounded-xl bg-sage/60 px-3.5 py-2.5 text-xs font-semibold text-leaf">
          <Truck className="size-4 shrink-0" aria-hidden />
          You&apos;ve unlocked free shipping!
        </p>
      ) : null}

      {children}
    </div>
  );
}
