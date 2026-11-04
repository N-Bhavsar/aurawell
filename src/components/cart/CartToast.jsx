"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ShoppingBag, X, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function CartToast({ toast, onDismiss }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!toast) {
      setVisible(false);
      return;
    }

    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, 300);
    }, 4000);

    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  const { product, quantity = 1 } = toast;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed top-16 inset-x-3 sm:inset-x-auto sm:right-6 sm:w-96 z-50 transition-all duration-300 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
    >
      <div className="rounded-2xl border border-line/80 bg-white/95 p-3.5 shadow-soft backdrop-blur-md sm:p-4">
        <div className="flex items-start gap-3">
          <div className="relative size-12 shrink-0 overflow-hidden rounded-xl border border-line/60 bg-cream">
            <Image
              src={product.image || product.mainImage}
              alt=""
              fill
              sizes="48px"
              className="object-contain p-1"
            />
            <span className="absolute bottom-0 right-0 flex size-4 items-center justify-center rounded-tl-md bg-forest text-[9px] font-bold text-white">
              {quantity}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-leaf">
              <span className="flex size-4 items-center justify-center rounded-full bg-leaf text-white">
                <Check className="size-2.5 stroke-[3]" />
              </span>
              <span>Added to Cart</span>
            </div>
            <p className="mt-0.5 truncate text-xs sm:text-sm font-semibold text-forest">
              {product.name}
            </p>
            <p className="text-[11px] text-muted">
              {formatPrice(product.price * quantity)}
            </p>
          </div>

          <button
            type="button"
            aria-label="Close notification"
            onClick={() => {
              setVisible(false);
              setTimeout(onDismiss, 300);
            }}
            className="flex size-7 shrink-0 items-center justify-center rounded-full text-muted transition hover:bg-cream hover:text-ink active:scale-90"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="mt-3 flex items-center gap-2 border-t border-line/60 pt-2.5">
          <Link
            href="/cart"
            onClick={() => {
              setVisible(false);
              onDismiss();
            }}
            className="flex-1 rounded-full border border-forest/30 bg-sage/40 py-2 text-center text-xs font-semibold text-forest transition hover:bg-sage active:scale-[0.98]"
          >
            <span className="inline-flex items-center gap-1.5">
              <ShoppingBag className="size-3.5" /> View Cart
            </span>
          </Link>
          <Link
            href="/checkout"
            onClick={() => {
              setVisible(false);
              onDismiss();
            }}
            className="flex-1 rounded-full bg-forest py-2 text-center text-xs font-semibold text-white shadow-xs transition hover:bg-forest-dark active:scale-[0.98]"
          >
            <span className="inline-flex items-center gap-1">
              Checkout <ArrowRight className="size-3.5" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

