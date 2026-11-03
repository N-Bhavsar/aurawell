"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

export default function TestimonialCarousel({ testimonials }) {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("li");
    track.scrollBy({ left: direction * (card ? card.offsetWidth + 16 : 280), behavior: "smooth" });
  };

  const scrollToIndex = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll("li");
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const card = track.querySelector("li");
      if (!card) return;
      const cardWidth = card.offsetWidth + 16;
      const index = Math.round(track.scrollLeft / cardWidth);
      setActiveIndex(Math.min(testimonials.length - 1, Math.max(0, index)));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [testimonials.length]);

  const arrow =
    "hidden size-11 shrink-0 items-center justify-center rounded-full border border-line bg-white text-forest shadow-card transition-colors hover:bg-forest hover:text-white md:flex";

  return (
    <div className="mt-8 sm:mt-12">
      <div className="flex items-center gap-4">
        <button type="button" aria-label="Previous reviews" onClick={() => scroll(-1)} className={arrow}>
          <ChevronLeft className="size-5" />
        </button>

        <ul
          ref={trackRef}
          className="no-scrollbar -mx-3.5 flex flex-1 snap-x snap-mandatory gap-4 overflow-x-auto px-3.5 pb-2 sm:-mx-0 sm:gap-6 sm:px-0"
        >
          {testimonials.map((t) => (
            <li
              key={t.id}
              className="flex w-[84%] shrink-0 snap-start flex-col rounded-2xl sm:rounded-3xl border border-line bg-white p-4.5 sm:p-6 shadow-card transition-shadow hover:shadow-soft sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5 text-gold" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-3.5 sm:size-4 fill-current" aria-hidden />
                  ))}
                </div>
                <Quote className="size-5 sm:size-6 text-sage-dark" aria-hidden />
              </div>
              <blockquote className="mt-3 sm:mt-4 flex-1 text-xs sm:text-sm leading-relaxed text-ink">&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="mt-4 sm:mt-6 flex items-center gap-3 border-t border-line pt-3 sm:pt-4">
                <span className="flex size-8 sm:size-10 items-center justify-center rounded-full bg-sage font-serif text-xs sm:text-sm text-forest font-bold">
                  {t.name.charAt(0)}
                </span>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-[11px] sm:text-xs text-muted">{t.product}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <button type="button" aria-label="Next reviews" onClick={() => scroll(1)} className={arrow}>
          <ChevronRight className="size-5" />
        </button>
      </div>

      {/* Mobile dot pagination */}
      {testimonials.length > 1 && (
        <div className="mt-4 flex justify-center gap-1.5 md:hidden">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => scrollToIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                activeIndex === i ? "w-5 bg-forest" : "w-1.5 bg-forest/20"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
