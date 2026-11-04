import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Star } from "lucide-react";
import ProductGallery from "@/components/product/ProductGallery";
import ProductPurchase from "@/components/product/ProductPurchase";
import ProductTabs from "@/components/product/ProductTabs";
import ProductIcon from "@/components/ui/ProductIcon";
import ProductCard from "@/components/ui/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";
import TrustBadges from "@/components/ui/TrustBadges";
import Botanical from "@/components/ui/Botanical";
import ProductReviews from "@/components/product/ProductReviews";
import StickyProductBar from "@/components/product/StickyProductBar";
import { getProductBySlug, getProductReviews, getProducts } from "@/lib/catalog";
import { cn, formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  const siteUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://aaurawell.com").replace(/\/$/, "");
  const canonical = `${siteUrl}/shop/${product.slug}`;
  const imageUrl = product.mainImage?.startsWith("http")
    ? product.mainImage
    : `${siteUrl}${product.mainImage || "/images/banners/hero-background.webp"}`;

  return {
    title: `${product.name} — ${product.subtitle || "Wellness Gummy"}`,
    description: product.description || product.about,
    alternates: {
      canonical,
    },
    openGraph: {
      title: product.name,
      description: product.description || product.about,
      url: canonical,
      siteName: "Aaurawell Nutra",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description || product.about,
      images: [imageUrl],
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [allProducts, reviews] = await Promise.all([getProducts(), getProductReviews(product.id)]);
  const related = allProducts.filter((p) => p.slug !== slug).slice(0, 4);
  const { theme } = product;

  const siteUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://aaurawell.com").replace(/\/$/, "");
  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: [
      product.mainImage?.startsWith("http")
        ? product.mainImage
        : `${siteUrl}${product.mainImage || "/images/banners/hero-background.webp"}`,
    ],
    description: product.description || product.about,
    sku: product.sku || product.slug,
    brand: {
      "@type": "Brand",
      name: "Aaurawell Nutra",
    },
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/shop/${product.slug}`,
      priceCurrency: "INR",
      price: product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    ...(product.rating && product.reviews > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviews,
          },
        }
      : {}),
  };

  return (
    <div style={theme.style}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <section className={cn("relative isolate overflow-hidden bg-gradient-to-b to-ivory", theme.tint)}>

        <Botanical name="corner" className="top-0 right-0 w-24 -scale-y-100 opacity-60 sm:w-44" />
        <Botanical name="eucalyptus" className="bottom-0 left-0 hidden w-24 opacity-40 lg:block" />

        <div className="container-page relative py-5 sm:py-10">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="no-scrollbar flex items-center gap-1.5 overflow-x-auto text-xs text-muted whitespace-nowrap">
              <li>
                <Link href="/" className="hover:text-forest">Home</Link>
              </li>
              <ChevronRight className="size-3 shrink-0" aria-hidden />
              <li>
                <Link href="/shop" className="hover:text-forest">Shop</Link>
              </li>
              <ChevronRight className="size-3 shrink-0" aria-hidden />
              <li className="text-forest font-medium truncate max-w-[140px] sm:max-w-none" aria-current="page">
                {product.name}
              </li>
            </ol>
          </nav>

          <div className="grid gap-6 lg:grid-cols-2 lg:gap-14">
            <ProductGallery product={product} />

            <div className="flex flex-col">
              <h1 className="text-xl sm:text-4xl lg:text-5xl font-bold leading-tight text-forest">{product.name}</h1>
              <p className="mt-1 text-xs sm:text-sm text-muted">{[product.subtitle, product.tagline].filter(Boolean).join(" · ")}</p>

              {/* Flipkart style rating & veg badge */}
              <div className="mt-2.5 flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1 rounded bg-forest px-2 py-0.5 text-xs font-bold text-white shadow-2xs">
                  <span>{product.rating || 4.8}</span>
                  <Star className="size-3 fill-current text-white" aria-hidden />
                </div>
                <a href="#reviews" className="text-xs text-muted hover:underline hover:text-forest">
                  {product.reviews > 0 ? `${product.reviews} Ratings & Reviews` : "No reviews yet"}
                </a>
                <span className="text-muted/40">·</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-leaf">
                  <span className="flex size-3.5 items-center justify-center rounded-[2px] border border-green-700 bg-white p-[1.5px]">
                    <span className="size-1.5 rounded-full bg-green-700" />
                  </span>
                  100% Vegetarian
                </span>
              </div>

              {/* Flipkart / Amazon Style Price Card */}
              <div className="mt-3.5 rounded-2xl border border-line/80 bg-white/80 p-3.5 sm:p-4 shadow-2xs">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-2xl sm:text-4xl font-bold text-forest">
                    {formatPrice(product.price)}
                  </span>
                  {product.mrp > product.price && (
                    <span className="text-xs sm:text-sm text-muted line-through">
                      {formatPrice(product.mrp)}
                    </span>
                  )}
                  {product.mrp > product.price && (
                    <span className="text-xs sm:text-sm font-bold text-leaf">
                      {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% off
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[11px] text-muted">
                  Inclusive of all taxes · {product.count} Gummies ({product.flavour})
                </p>

                {/* Delivery Assurance */}
                <div className="mt-2.5 flex items-center justify-between border-t border-line/60 pt-2 text-xs">
                  <span className="flex items-center gap-1 text-forest font-medium">
                    <span className="text-leaf font-bold">⚡ Free Delivery</span> on this order
                  </span>
                  <span className="text-[11px] text-muted">Dispatches in 24h</span>
                </div>
              </div>

              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-muted">{product.description}</p>

              <ul className="mt-5 grid grid-cols-4 gap-2 sm:gap-3">
                {product.benefits.map((b) => (
                  <li key={b.label} className="flex flex-col items-center gap-1.5 sm:gap-2 text-center">
                    <span className={cn("flex size-10 sm:size-12 items-center justify-center rounded-full border bg-white shadow-xs", theme.outline)}>
                      <ProductIcon name={b.icon} className="size-4 sm:size-5" />
                    </span>
                    <span className="text-[0.65rem] sm:text-[0.7rem] leading-tight text-ink font-medium">{b.label}</span>
                  </li>
                ))}
              </ul>

              <ProductPurchase product={product} />
            </div>
          </div>

          <TrustBadges className="mt-8 sm:mt-10" />
        </div>
      </section>

      <section className="bg-ivory py-10 sm:py-16">
        <div className="container-page">
          <ProductTabs product={product} />
        </div>
      </section>

      <ProductReviews product={product} reviews={reviews} />

      <section className="relative isolate overflow-hidden bg-cream py-12 sm:py-20">
        <Botanical name="fern" className="top-0 right-0 w-20 -scale-100 opacity-40 sm:w-28" />
        <div className="container-page relative">
          <SectionHeading eyebrow="You may also like" title="Explore More Gummies" />
          <ul className="mt-6 sm:mt-10 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
            {related.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} variant="shop" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <StickyProductBar product={product} />
    </div>
  );
}
