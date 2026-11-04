import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { cn, formatPrice } from "@/lib/utils";

/** Flipkart & Amazon standard product card with FSSAI veg mark, rating pill, and pricing */
export default function ProductCard({ product, variant = "shop" }) {
  const { name, subtitle, description, price, mrp, count, flavour, image, theme, slug, rating = 4.8, reviews = 120 } = product;
  const href = `/shop/${slug}`;
  const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

  return (
    <article
      style={theme?.style}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line/80 bg-white shadow-2xs transition-all duration-300 hover:shadow-card hover:border-forest/20 sm:rounded-3xl"
    >
      {/* Product Image Area */}
      <Link href={href} className={cn("relative block aspect-[4/5] overflow-hidden", theme?.bg || "bg-cream/40")}>
        {/* Top Badges: Discount on Left, FSSAI Veg Symbol on Right (Flipkart India standard) */}
        <div className="absolute top-2 inset-x-2 z-10 flex items-center justify-between pointer-events-none sm:top-3 sm:inset-x-3">
          {discount > 0 ? (
            <span className="rounded-md bg-forest px-1.5 py-0.5 text-[10px] font-bold tracking-tight text-white shadow-xs sm:px-2 sm:text-xs">
              {discount}% OFF
            </span>
          ) : <span />}

          {/* Iconic Indian 100% Vegetarian mark (green square with green dot) */}
          <div
            className="flex size-4 items-center justify-center rounded-[3px] border border-green-700 bg-white p-[2px] shadow-xs"
            title="100% Vegetarian Nutraceutical"
          >
            <div className="size-2 rounded-full bg-green-700" />
          </div>
        </div>

        <Image
          src={image}
          alt={`${name} — bottle of ${count} gummies`}
          fill
          sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 50vw"
          className="object-contain p-3 transition-transform duration-500 group-hover:scale-105 sm:p-5"
        />
      </Link>

      {/* Product Info Area */}
      <div className="flex flex-1 flex-col p-3 sm:p-4 text-left">
        {/* Rating Pill (Flipkart style) */}
        <div className="flex items-center gap-1.5">
          <div className="inline-flex items-center gap-0.5 rounded bg-forest px-1.5 py-0.5 text-[10px] font-bold text-white leading-none">
            <span>{rating}</span>
            <Star className="size-2.5 fill-current text-white" aria-hidden />
          </div>
          <span className="text-[10px] text-muted font-medium">({reviews})</span>
        </div>

        {/* Product Title */}
        <h3 className="mt-1.5 font-sans text-xs sm:text-sm font-bold text-ink leading-snug line-clamp-1 group-hover:text-forest">
          <Link href={href} className="hover:underline">
            {name}
          </Link>
        </h3>

        {/* Subtitle / Key benefit */}
        <p className="text-[11px] text-muted line-clamp-1 mt-0.5">
          {subtitle || `${count} Gummies · ${flavour}`}
        </p>

        {/* Pricing Block (Classic Amazon & Flipkart layout) */}
        <div className="mt-auto pt-2">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="font-serif text-base sm:text-lg font-bold text-forest">
              {formatPrice(price)}
            </span>
            {mrp > price && (
              <span className="text-[11px] text-muted line-through font-normal">
                {formatPrice(mrp)}
              </span>
            )}
            {discount > 0 && (
              <span className="text-[11px] font-bold text-leaf">
                {discount}% off
              </span>
            )}
          </div>

          {/* Delivery & Stock tag */}
          <p className="mt-1 text-[10px] font-medium text-muted truncate">
            <span className="text-leaf font-semibold">⚡ Free Delivery</span> · {count} Gummies
          </p>

          {/* Add to Cart CTA */}
          <div className="mt-2.5 pt-2 border-t border-line/60">
            <AddToCartButton
              product={product}
              className={cn(
                "w-full min-h-[36px] rounded-xl py-2 px-3 text-xs font-semibold shadow-xs transition-all active:scale-95 sm:min-h-[40px] sm:text-sm",
                theme?.button || "bg-forest hover:bg-forest-dark"
              )}
            >
              Add to Cart
            </AddToCartButton>
          </div>
        </div>
      </div>
    </article>
  );
}
