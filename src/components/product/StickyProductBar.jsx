"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Check, ShoppingBag, Zap } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { cn, formatPrice } from "@/lib/utils";

/** Flipkart & Amazon style sticky purchase bar for mobile e-commerce */
export default function StickyProductBar({ product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const soldOut = product.inStock === false;
  const discount = product.mrp > product.price ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;

  const handleAddToCart = () => {
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    addItem(product, 1);
    router.push("/checkout");
  };

  return (
    <div
      aria-label="Quick purchase bar"
      className="fixed bottom-0 inset-x-0 z-40 border-t border-line/90 bg-white/95 backdrop-blur-md pb-[max(0.65rem,env(safe-area-inset-bottom))] pt-2 px-3 shadow-[0_-4px_24px_rgba(29,43,34,0.12)] lg:hidden"
    >
      <div className="flex flex-col gap-1.5 max-w-lg mx-auto">
        {/* Top mini info strip: thumbnail + price + discount */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2 min-w-0">
            <div className="relative size-7 shrink-0 overflow-hidden rounded-md border border-line bg-cream">
              <Image
                src={product.image || product.mainImage}
                alt=""
                fill
                sizes="28px"
                className="object-contain p-0.5"
              />
            </div>
            <p className="truncate text-[11px] font-semibold text-ink max-w-[170px]">
              {product.name}
            </p>
          </div>

          <div className="flex items-baseline gap-1.5 shrink-0">
            <span className="font-serif text-sm font-bold text-forest">
              {formatPrice(product.price)}
            </span>
            {product.mrp > product.price && (
              <span className="text-[10px] text-muted line-through">
                {formatPrice(product.mrp)}
              </span>
            )}
            {discount > 0 && (
              <span className="text-[10px] font-bold text-leaf">
                {discount}% off
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons — Flipkart 50/50 dual button standard */}
        <div className="grid grid-cols-2 gap-2">
          {soldOut ? (
            <div className="col-span-2 rounded-xl bg-rose py-2.5 text-center text-xs font-semibold text-crimson">
              Currently Out of Stock
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={handleAddToCart}
                className="inline-flex min-h-[42px] w-full items-center justify-center gap-1.5 rounded-xl border-2 border-forest bg-white py-2.5 px-3 text-xs font-bold text-forest shadow-2xs transition active:scale-[0.98] active:bg-sage/40"
              >
                {added ? (
                  <>
                    <Check className="size-4 stroke-[3] text-leaf" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="size-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="inline-flex min-h-[42px] w-full items-center justify-center gap-1.5 rounded-xl bg-forest py-2.5 px-3 text-xs font-bold text-white shadow-card transition hover:bg-forest-dark active:scale-[0.98]"
              >
                <Zap className="size-4 fill-white" />
                <span>Buy Now</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
