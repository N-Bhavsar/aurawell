"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import OrderSummary from "@/components/cart/OrderSummary";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";

export default function CartView() {
  const { items, ready, updateQuantity, removeItem } = useCart();

  if (!ready) return <div className="h-64 animate-pulse rounded-2xl sm:rounded-[2rem] bg-cream" aria-busy="true" />;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md rounded-2xl sm:rounded-[2rem] border border-line bg-white p-8 sm:p-12 text-center shadow-card">
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-sage text-forest">
          <ShoppingBag className="size-7" strokeWidth={1.5} aria-hidden />
        </span>
        <h2 className="mt-4 sm:mt-5 text-2xl sm:text-3xl font-semibold">Your cart is empty</h2>
        <p className="mt-2 text-xs sm:text-sm text-muted">Find a gummy that fits your wellness routine.</p>
        <Button href="/shop" className="mt-6 w-full sm:w-auto py-3">
          Shop Our Gummies <ArrowRight className="size-4" aria-hidden />
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1.5fr_1fr]">
      <div className="rounded-2xl sm:rounded-[2rem] border border-line bg-white p-4 sm:p-8 shadow-card">
        <div className="hidden grid-cols-[2fr_1fr_1fr_1fr] border-b border-line pb-3 text-xs tracking-wide text-muted uppercase sm:grid">
          <span>Product</span>
          <span>Price</span>
          <span>Quantity</span>
          <span className="text-right">Total</span>
        </div>

        <ul className="divide-y divide-line">
          {items.map((item) => (
            <li key={item.productId} className="py-4 sm:py-5">
              {/* Mobile View */}
              <div className="flex gap-3 sm:hidden">
                <Link href={`/shop/${item.slug}`} className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-cream border border-line/60">
                  <Image src={item.image} alt={item.name} fill sizes="80px" className="object-contain p-1.5" />
                </Link>

                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link href={`/shop/${item.slug}`} className="font-semibold text-xs sm:text-sm text-ink line-clamp-1 hover:text-forest">
                        {item.name}
                      </Link>
                      <p className="text-[11px] text-muted">{item.count} Gummies · {formatPrice(item.price)} each</p>
                    </div>
                    <button
                      type="button"
                      aria-label={`Remove ${item.name}`}
                      onClick={() => removeItem(item.productId)}
                      className="flex size-8 shrink-0 items-center justify-center rounded-full text-muted transition hover:bg-rose hover:text-crimson active:scale-90"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-full border border-line bg-ivory shadow-xs">
                      <button
                        type="button"
                        aria-label={`Decrease ${item.name} quantity`}
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="flex size-8 items-center justify-center rounded-full text-forest hover:bg-sage active:bg-sage/80"
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-semibold">{item.quantity}</span>
                      <button
                        type="button"
                        aria-label={`Increase ${item.name} quantity`}
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="flex size-8 items-center justify-center rounded-full text-forest hover:bg-sage active:bg-sage/80"
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>

                    <span className="font-serif text-base font-semibold text-forest">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tablet/Desktop View */}
              <div className="hidden sm:grid sm:grid-cols-[2fr_1fr_1fr_1fr] sm:items-center sm:gap-4">
                <div className="flex items-center gap-4">
                  <Link href={`/shop/${item.slug}`} className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-cream border border-line/60">
                    <Image src={item.image} alt={item.name} fill sizes="80px" className="object-contain p-1" />
                  </Link>
                  <div>
                    <Link href={`/shop/${item.slug}`} className="font-medium text-ink hover:text-forest">
                      {item.name}
                    </Link>
                    <p className="text-xs text-muted">{item.count} Gummies</p>
                  </div>
                </div>

                <span className="text-sm font-medium">{formatPrice(item.price)}</span>

                <div className="inline-flex w-fit items-center rounded-full border border-line bg-ivory">
                  <button
                    type="button"
                    aria-label={`Decrease ${item.name} quantity`}
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className="flex size-8 items-center justify-center rounded-full text-forest hover:bg-sage"
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                  <button
                    type="button"
                    aria-label={`Increase ${item.name} quantity`}
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="flex size-8 items-center justify-center rounded-full text-forest hover:bg-sage"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-end gap-3">
                  <span className="font-serif text-base font-semibold text-forest">{formatPrice(item.price * item.quantity)}</span>
                  <button
                    type="button"
                    aria-label={`Remove ${item.name}`}
                    onClick={() => removeItem(item.productId)}
                    className="p-1 text-muted hover:text-crimson"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <Link href="/shop" className="mt-4 inline-block text-xs sm:text-sm font-medium text-forest hover:underline">
          ← Continue Shopping
        </Link>
      </div>

      <div className="lg:sticky lg:top-28 lg:h-fit">
        <OrderSummary>
          <Button href="/checkout" className="mt-5 sm:mt-6 w-full py-3.5 text-sm font-semibold shadow-card">
            Proceed to Checkout <ArrowRight className="size-4" aria-hidden />
          </Button>
        </OrderSummary>
      </div>
    </div>
  );
}
