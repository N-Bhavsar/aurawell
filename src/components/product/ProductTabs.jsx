"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const tabs = ["About", "Ingredients", "How to Use", "Caution", "FAQs"];

export default function ProductTabs({ product }) {
  const [active, setActive] = useState("About");

  return (
    <div>
      <div
        role="tablist"
        aria-label="Product information"
        className="no-scrollbar -mx-3.5 flex gap-1 overflow-x-auto border-b border-line px-3.5 sm:-mx-0 sm:px-0"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            id={`tab-${tab}`}
            aria-selected={active === tab}
            aria-controls="product-tabpanel"
            onClick={() => setActive(tab)}
            className={cn(
              "-mb-px shrink-0 border-b-2 px-3.5 py-2.5 text-xs sm:px-5 sm:py-3 sm:text-sm font-medium transition-colors",
              active === tab ? "border-forest text-forest font-semibold" : "border-transparent text-muted hover:text-forest"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div id="product-tabpanel" role="tabpanel" aria-labelledby={`tab-${active}`} className="pt-6 sm:pt-8">
        {active === "About" && (
          <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold">About This Product</h2>
              <p className="mt-3 sm:mt-4 text-sm leading-relaxed text-muted sm:text-base">{product.about}</p>
            </div>
            <div className="relative aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/5] overflow-hidden rounded-2xl sm:rounded-[2rem] shadow-card">
              <Image
                src={product.gallery[1] ?? product.image}
                alt={`${product.name} lifestyle photo`}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        )}

        {active === "Ingredients" && (
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-semibold">Key Ingredients</h2>
            <p className="mt-2 text-xs sm:text-sm text-muted">Per gummy (approx. 3.5 g) · Servings per container: {product.count}</p>
            <div className="mt-4 sm:mt-6 overflow-x-auto rounded-2xl border border-line bg-white shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-sage text-forest">
                  <tr>
                    <th scope="col" className="px-3.5 py-2.5 sm:px-5 sm:py-3 font-semibold">Contents</th>
                    <th scope="col" className="px-3.5 py-2.5 sm:px-5 sm:py-3 font-semibold">Qty</th>
                    <th scope="col" className="px-3.5 py-2.5 sm:px-5 sm:py-3 font-semibold">Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {product.ingredients.map(([name, qty, unit]) => (
                    <tr key={name} className="border-t border-line">
                      <td className="px-3.5 py-2.5 sm:px-5 sm:py-3 text-ink font-medium">{name}</td>
                      <td className="px-3.5 py-2.5 sm:px-5 sm:py-3 text-muted">{qty}</td>
                      <td className="px-3.5 py-2.5 sm:px-5 sm:py-3 text-muted">{unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {active === "How to Use" && (
          <div className="max-w-2xl space-y-3 sm:space-y-4 text-sm leading-relaxed text-muted sm:text-base">
            <h2 className="text-2xl sm:text-3xl font-semibold">How to Use</h2>
            <p className="rounded-xl border border-line bg-white p-4">{product.suggestedUse}</p>
            <p className="rounded-xl border border-line bg-white p-4">
              <span className="font-semibold text-ink">Storage: </span>
              {product.storage}
            </p>
          </div>
        )}

        {active === "Caution" && (
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-semibold">Caution</h2>
            <p className="mt-3 sm:mt-4 text-sm leading-relaxed text-muted sm:text-base rounded-xl border border-line bg-white p-4">
              {product.caution}
            </p>
          </div>
        )}

        {active === "FAQs" && (
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-semibold">Frequently Asked Questions</h2>
            <div className="mt-4 sm:mt-6 divide-y divide-line rounded-2xl border border-line bg-white shadow-xs">
              {product.faqs.map((faq) => (
                <details key={faq.q} className="group px-4 py-3.5 sm:px-5 sm:py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-ink">
                    {faq.q}
                    <span className="text-forest transition-transform group-open:rotate-45" aria-hidden>+</span>
                  </summary>
                  <p className="mt-2.5 text-xs sm:text-sm text-muted leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
