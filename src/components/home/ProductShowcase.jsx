"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Flame } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Botanical from "@/components/ui/Botanical";
import { cn } from "@/lib/utils";

const TABS = ["All", "Daily Wellness", "Women's Wellness", "Digestive Health", "Energy & Vitality"];

export default function ProductShowcase({ products }) {
  const [activeTab, setActiveTab] = useState("All");

  const filtered = useMemo(() => {
    if (activeTab === "All") return products;
    return products.filter((p) => p.category === activeTab);
  }, [products, activeTab]);

  return (
    <section id="shop" className="relative isolate scroll-mt-20 overflow-hidden bg-ivory py-8 sm:py-16 lg:py-24">
      <Botanical name="eucalyptus" className="top-0 left-0 w-24 -scale-y-100 opacity-60 sm:w-32 lg:w-40" />
      <Botanical name="olive" className="right-0 bottom-0 w-40 -scale-x-100 opacity-60 sm:w-52 lg:w-64" />
      <Botanical name="leafLight" className="top-16 right-[12%] hidden w-10 rotate-[25deg] opacity-60 md:block" />

      <div className="relative container-page">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-forest/10 px-3 py-1 text-xs font-bold text-forest">
            <Flame className="size-3.5 text-gold fill-gold" />
            <span>Trending Deals · Up to 30% OFF</span>
          </div>
          <h2 className="mt-2.5 font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-forest">
            Find Your Wellness Gummy
          </h2>
          <p className="mt-1.5 text-xs sm:text-base text-muted max-w-md">
            100% Vegetarian nutraceuticals crafted for targeted everyday health.
          </p>
        </div>

        {/* Category Pill Filters (Amazon/Flipkart tab strip) */}
        <div className="no-scrollbar mt-5 sm:mt-8 flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto px-1 py-1">
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all active:scale-95",
                  isActive
                    ? "bg-forest text-white shadow-xs"
                    : "border border-line/80 bg-white text-ink hover:border-forest"
                )}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* 2-column mobile / 4-column desktop product grid */}
        <ul className="mt-5 sm:mt-10 grid grid-cols-2 gap-2.5 sm:gap-6 lg:grid-cols-4">
          {filtered.map((product) => (
            <li key={product.id} id={product.slug} className="flex flex-col scroll-mt-24">
              <ProductCard product={product} variant="shop" />
            </li>
          ))}
        </ul>

        <div className="mt-7 sm:mt-12 text-center">
          <Button href="/shop" variant="outline" className="w-full sm:w-auto py-3">
            View All Gummies <ArrowRight className="size-4" aria-hidden />
          </Button>
        </div>
      </div>
    </section>
  );
}
