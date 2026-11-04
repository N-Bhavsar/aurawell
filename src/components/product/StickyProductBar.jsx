"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Check, ShoppingBag, Zap } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { cn, formatPrice } from "@/lib/utils";

export default function StickyProductBar({ product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const soldOut = product.inStock === false;

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
      className="fixed bottom-0 inset-x-0 z-40 border-t border-line/80 bg-white/95 backdrop-blur-md pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2 px-3 shadow-[0_-4px_20px_rgba(29,43,34,0.08)] lg:hidden"
    >
      <div className="flex items-center justify-between gap-2.5 max-w-lg mx-auto">
        {/* Left: Product image & pricing */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="relative size-10 shrink-0 overflow-hidden rounded-xl border border-line/60 bg-cream">
            <Image
              src={product.image || product.mainImage}
              alt=""
              fill
              sizes="40px"
              className="object-contain p-1"
            />
          </div>

          <div className="min-w-0 leading-tight">
            <p className="truncate text-xs font-semibold text-forest">
              {product.name}
            </p>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-serif text-sm sm:text-base font-bold text-forest">
                {formatPrice(product.price)}
              </span>
              {product.mrp > product.price && (
                <span className="text-[10px] text-muted line-through">
                  {formatPrice(product.mrp)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          {soldOut ? (
            <span className="rounded-full bg-rose px-4 py-2 text-xs font-semibold text-crimson">
              Out of Stock
            </span>
          ) : (
            <>
              <button
                type="button"
                onClick={handleAddToCart}
                className={cn(
                  "inline-flex min-h-[38px] items-center justify-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition active:scale-95",
                  product.theme?.button || "bg-forest hover:bg-forest-dark"
                )}
              >
                {added ? (
                  <>
                    <Check className="size-3.5 stroke-[2.5]" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="size-3.5" />
                    <span>Add</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className={cn(
                  "inline-flex min-h-[38px] items-center justify-center gap-1 rounded-full border border-forest/20 bg-cream px-3 py-2 text-xs font-semibold text-forest transition hover:bg-white active:scale-95",
                  product.theme?.outline
                )}
              >
                <Zap className="size-3.5 text-forest fill-forest/20" />
                <span>Buy Now</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

