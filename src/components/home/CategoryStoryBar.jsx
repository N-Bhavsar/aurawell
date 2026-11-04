"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";

const categories = [
  {
    name: "All Gummies",
    href: "/shop",
    badge: "Catalog",
    iconBg: "bg-sage text-forest",
    isAll: true,
  },
  {
    name: "Daily Nutra",
    benefit: "Multivitamin",
    href: "/shop/daily-nutra-gummy",
    image: "/images/products/daily-nutra-gummy.webp",
    bgColor: "bg-amber-50 border-amber-200",
  },
  {
    name: "Iron Glow",
    benefit: "Energy & Blood",
    href: "/shop/iron-glow-gummy",
    image: "/images/products/iron-glow-gummy.webp",
    bgColor: "bg-rose-50 border-rose-200",
  },
  {
    name: "PMS Care",
    benefit: "Cycle Comfort",
    href: "/shop/pms-care-gummy",
    image: "/images/products/pms-care-gummy.webp",
    bgColor: "bg-pink-50 border-pink-200",
  },
  {
    name: "Gut Comfort",
    benefit: "Digestion Care",
    href: "/shop/gut-comfort-gummy",
    image: "/images/products/gut-comfort-gummy.webp",
    bgColor: "bg-orange-50 border-orange-200",
  },
];

/** Flipkart & Amazon style quick-category story strip for mobile e-commerce */
export default function CategoryStoryBar() {
  return (
    <section aria-label="Product categories" className="bg-cream border-b border-line/60 py-2.5">
      <div className="container-page">
        <ul className="no-scrollbar flex items-center justify-start gap-3 sm:gap-6 overflow-x-auto px-1 py-1 sm:justify-center">
          {categories.map((c) => (
            <li key={c.name} className="shrink-0 text-center">
              <Link
                href={c.href}
                className="group flex flex-col items-center gap-1.5 focus:outline-none"
              >
                <div
                  className={`relative flex size-14 sm:size-16 items-center justify-center rounded-2xl border p-1 shadow-2xs transition-all duration-200 group-hover:scale-105 group-active:scale-95 ${
                    c.bgColor || "bg-white border-line"
                  }`}
                >
                  {c.isAll ? (
                    <div className="flex size-full items-center justify-center rounded-xl bg-forest text-gold">
                      <Sparkles className="size-6" />
                    </div>
                  ) : (
                    <div className="relative size-full">
                      <Image
                        src={c.image}
                        alt={c.name}
                        fill
                        sizes="64px"
                        className="object-contain p-0.5"
                      />
                    </div>
                  )}
                </div>
                <div className="leading-none">
                  <span className="block text-[11px] sm:text-xs font-semibold text-ink group-hover:text-forest">
                    {c.name}
                  </span>
                  {c.benefit && (
                    <span className="block text-[9px] text-muted font-normal mt-0.5">
                      {c.benefit}
                    </span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

