"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, Zap } from "lucide-react";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { useCart } from "@/components/cart/CartProvider";
import { cn } from "@/lib/utils";

export default function ProductPurchase({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const router = useRouter();

  const soldOut = product.inStock === false;
  const maxQuantity = Math.max(1, Math.min(10, product.stockQuantity ?? 10));

  const buyNow = () => {
    addItem(product, quantity);
    router.push("/checkout");
  };

  return (
    <div className="mt-6 sm:mt-8">
      {soldOut && (
        <p className="mb-4 rounded-2xl bg-rose px-4 py-3 text-sm text-crimson">
          This product is currently out of stock.
        </p>
      )}
      {!soldOut && product.stockQuantity <= 10 && (
        <p className="mb-4 text-sm font-medium text-tangerine">
          Only {product.stockQuantity} left in stock
        </p>
      )}

      <div className="flex items-center justify-between sm:justify-start sm:gap-4">
        <span className="text-sm font-medium text-ink">Quantity</span>
        <div className="inline-flex items-center rounded-full border border-line bg-white shadow-xs">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex size-10 items-center justify-center rounded-full text-forest hover:bg-sage active:bg-sage/80 disabled:opacity-40"
            disabled={quantity <= 1}
          >
            <Minus className="size-4" />
          </button>
          <span className="w-10 text-center text-sm font-semibold" aria-live="polite">
            {quantity}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity((q) => Math.min(maxQuantity, q + 1))}
            className="flex size-10 items-center justify-center rounded-full text-forest hover:bg-sage active:bg-sage/80 disabled:opacity-40"
            disabled={quantity >= maxQuantity}
          >
            <Plus className="size-4" />
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
        <AddToCartButton
          product={product}
          quantity={quantity}
          className={cn(
            "min-h-[46px] w-full py-3.5 text-sm font-semibold active:scale-[0.98] shadow-card",
            product.theme.button
          )}
        />
        <button
          type="button"
          onClick={buyNow}
          disabled={soldOut}
          className={cn(
            "inline-flex min-h-[46px] w-full items-center justify-center gap-1.5 rounded-full border-2 bg-white py-3 text-sm font-semibold transition-colors hover:bg-cream active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
            product.theme.outline
          )}
        >
          <Zap className="size-4" /> Buy Now
        </button>
      </div>
    </div>
  );
}
