import { BadgeCheck, Star } from "lucide-react";
import ReviewComposer from "@/components/product/ReviewComposer";
import Botanical from "@/components/ui/Botanical";
import { cn } from "@/lib/utils";

function Stars({ rating, className, size = "size-3.5 sm:size-4" }) {
  return (
    <span className={cn("flex text-gold", className)} role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn(size, i < rating ? "fill-current" : "text-gold/30")} aria-hidden />
      ))}
    </span>
  );
}

const dateFormat = new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" });

// Review text is rendered as plain React text nodes — never as HTML.
export default function ProductReviews({ product, reviews }) {
  const distribution = [5, 4, 3, 2, 1].map((star) => ({ star, count: reviews.filter((r) => r.rating === star).length }));
  const max = Math.max(1, ...distribution.map((d) => d.count));

  return (
    <section id="reviews" className="relative isolate scroll-mt-24 overflow-hidden bg-ivory pb-12 sm:pb-20">
      <Botanical name="olive" className="right-0 bottom-0 w-32 -scale-x-100 opacity-25 sm:w-56" />
      <div className="container-page">
        <div className="mb-6 sm:mb-8 text-center lg:text-left">
          <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-leaf uppercase">Real People. Real Wellness.</p>
          <h2 className="mt-1.5 text-2xl sm:text-4xl font-semibold">Customer Reviews</h2>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[340px_1fr] lg:gap-8">
          <aside className="rounded-2xl sm:rounded-[2rem] border border-line bg-white p-5 sm:p-6 shadow-card lg:sticky lg:top-28">
            {product.reviews > 0 ? (
              <>
                <div className="flex items-center gap-4">
                  <span className="font-serif text-4xl sm:text-5xl font-semibold text-forest">{product.rating}</span>
                  <div>
                    <Stars rating={Math.round(product.rating)} size="size-4 sm:size-5" />
                    <p className="mt-1 text-xs text-muted">Based on {product.reviews} reviews</p>
                  </div>
                </div>
                <ul className="mt-4 sm:mt-5 space-y-2" aria-label="Rating breakdown">
                  {distribution.map(({ star, count }) => (
                    <li key={star} className="flex items-center gap-2.5 sm:gap-3 text-xs text-muted">
                      <span className="flex w-7 sm:w-8 items-center gap-0.5">
                        {star} <Star className="size-3 fill-gold text-gold" aria-hidden />
                      </span>
                      <span className="h-2 flex-1 overflow-hidden rounded-full bg-cream-dark">
                        <span className="block h-full rounded-full bg-gold" style={{ width: `${(count / max) * 100}%` }} />
                      </span>
                      <span className="w-5 text-right font-medium">{count}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-xs sm:text-sm text-muted">No reviews yet. Be the first to share your experience with {product.name}.</p>
            )}

            <ReviewComposer slug={product.slug} productName={product.name} />
          </aside>

          {reviews.length === 0 ? (
            <div className="flex min-h-40 items-center justify-center rounded-2xl sm:rounded-[2rem] border border-dashed border-line bg-white p-6 sm:p-8 text-center">
              <p className="font-serif text-xl sm:text-2xl text-forest">Your review could be the first one here.</p>
            </div>
          ) : (
            <ul className="columns-1 gap-3.5 sm:columns-2 sm:gap-5 [&>li]:mb-3.5 sm:[&>li]:mb-5">
              {reviews.map((r) => (
                <li key={r.id} className="break-inside-avoid rounded-2xl sm:rounded-3xl border border-line bg-white p-4 sm:p-6 shadow-card transition-shadow hover:shadow-soft">
                  <div className="flex items-center justify-between gap-3">
                    <Stars rating={r.rating} />
                    <time dateTime={r.createdAt} className="text-[11px] sm:text-xs text-muted">
                      {dateFormat.format(new Date(r.createdAt))}
                    </time>
                  </div>
                  {r.title && <p className="mt-2.5 font-serif text-base sm:text-lg leading-snug text-forest font-semibold">{r.title}</p>}
                  <p className="mt-1.5 text-xs sm:text-sm leading-relaxed whitespace-pre-line text-ink/85">{r.quote}</p>
                  <div className="mt-4 flex items-center gap-2.5 border-t border-line pt-3 sm:pt-4">
                    <span className="flex size-8 sm:size-9 items-center justify-center rounded-full bg-sage font-serif text-xs sm:text-sm text-forest font-bold">{r.name.charAt(0)}</span>
                    <p className="text-xs sm:text-sm font-medium text-ink">{r.name}</p>
                    <span className="ml-auto flex items-center gap-1 text-[0.65rem] sm:text-[0.7rem] text-leaf font-medium">
                      <BadgeCheck className="size-3 sm:size-3.5" aria-hidden /> Approved
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
