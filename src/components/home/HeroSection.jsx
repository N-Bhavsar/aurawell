import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, FlaskConical, Candy, Smile } from "lucide-react";
import Button from "@/components/ui/Button";

const highlights = [
  { icon: Leaf, label: "Premium Nutrition" },
  { icon: FlaskConical, label: "Science Backed" },
  { icon: Candy, label: "Delicious Gummies" },
  { icon: Smile, label: "A Healthier Tomorrow" },
];

function HeroCopy({ className = "" }) {
  return (
    <div className={className}>
      <p className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-leaf uppercase">
        Small Gummies. Big Wellness.
      </p>
      <h1 className="mt-3 text-3xl sm:text-5xl xl:text-6xl 2xl:text-7xl font-semibold leading-[1.1] text-forest">
        New Era
        <br />
        of <span className="text-leaf">Wellness</span>
      </h1>
      <p className="mt-3 max-w-md text-sm sm:text-base leading-relaxed text-ink/80">
        Thoughtfully formulated nutritional gummies for a healthier, brighter you.
      </p>

      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center lg:justify-start">
        <Button href="/shop" className="w-full sm:w-auto py-3.5 shadow-card">
          Shop Our Gummies <ArrowRight className="size-4" aria-hidden />
        </Button>
        <Button href="/about" variant="outline" className="w-full sm:w-auto py-3.5 bg-white/80 backdrop-blur-sm">
          Our Story
        </Button>
      </div>

      <ul className="mx-auto mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 lg:mx-0">
        {highlights.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="flex items-center gap-2 rounded-xl border border-forest/10 bg-white/80 p-2 backdrop-blur-xs sm:border-0 sm:bg-transparent sm:p-0 sm:flex-col sm:items-center sm:text-center lg:items-start lg:text-left"
          >
            <span className="flex size-9 sm:size-11 shrink-0 items-center justify-center rounded-full border border-forest/20 bg-white text-forest shadow-xs">
              <Icon className="size-4 sm:size-5" strokeWidth={1.5} aria-hidden />
            </span>
            <span className="text-[11px] sm:text-xs font-medium leading-tight text-ink">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section id="home" className="relative isolate bg-cream">
      {/* ── Mobile Phones (Flipkart & Amazon Mobile Hero Banner) ── */}
      <div className="md:hidden px-3 pt-2.5 pb-1">
        <div className="relative overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-[#0e432a] via-forest to-forest-dark text-white p-4 shadow-card">
          <div className="relative z-10 max-w-[62%]">
            <span className="inline-flex items-center gap-1 rounded-full bg-gold/20 px-2 py-0.5 text-[9px] font-bold text-gold uppercase tracking-wider backdrop-blur-xs">
              ★ 100% Veg Gummies
            </span>
            <h1 className="mt-2 text-xl font-bold leading-tight text-cream">
              New Era of <span className="text-gold">Wellness</span>
            </h1>
            <p className="mt-1 text-[11px] text-white/80 line-clamp-2 leading-relaxed">
              Targeted nutrition in delicious gelatin-free gummies.
            </p>
            <div className="mt-3.5 flex items-center gap-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-1 rounded-full bg-gold px-3.5 py-1.5 text-xs font-bold text-forest shadow-xs active:scale-95 transition"
              >
                Shop Now <ArrowRight className="size-3" />
              </Link>
              <span className="text-[10px] text-white/75 font-medium">Up to 30% Off</span>
            </div>
          </div>

          {/* Right Product Image */}
          <div className="absolute right-0 -bottom-2 top-0 w-[42%] flex items-center justify-end pointer-events-none">
            <Image
              src="/images/banners/hero-background-mobile.webp"
              alt="Aaurawell Gummies"
              width={360}
              height={400}
              priority
              className="h-full w-auto object-contain object-right-bottom drop-shadow-xl"
            />
          </div>
        </div>

        {/* Amazon-style quick benefits strip */}
        <div className="no-scrollbar mt-2.5 flex items-center gap-2 overflow-x-auto py-0.5 text-[10px] text-muted">
          <span className="shrink-0 flex items-center gap-1 rounded-full border border-line/80 bg-white px-2.5 py-1 shadow-2xs font-medium text-ink">
            <span className="text-leaf">⚡</span> Free Delivery &gt; ₹599
          </span>
          <span className="shrink-0 flex items-center gap-1 rounded-full border border-line/80 bg-white px-2.5 py-1 shadow-2xs font-medium text-ink">
            <span className="text-leaf">🌱</span> 100% Veg &amp; Gelatin Free
          </span>
          <span className="shrink-0 flex items-center gap-1 rounded-full border border-line/80 bg-white px-2.5 py-1 shadow-2xs font-medium text-ink">
            <span className="text-gold">⭐</span> 4.8★ Rated
          </span>
          <span className="shrink-0 flex items-center gap-1 rounded-full border border-line/80 bg-white px-2.5 py-1 shadow-2xs font-medium text-ink">
            <span className="text-forest">🔒</span> Secure Checkout
          </span>
        </div>
      </div>

      {/* ── Tablets: full desktop banner scaled to width ── */}
      <div
        className="hidden md:block lg:hidden"
        style={{
          maskImage: "linear-gradient(to bottom, #000 70%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, #000 70%, transparent 100%)",
        }}
      >
        <Image
          src="/images/banners/hero-background.webp"
          alt="Aaurawell Daily Nutra Gummy jar with fresh fruit and leaves"
          width={1967}
          height={799}
          priority
          unoptimized
          sizes="(min-width: 1024px) 0vw, (min-width: 768px) 100vw, 0vw"
          className="h-auto w-full"
        />
      </div>

      {/* ── Desktop: full-width banner ── */}
      <Image
        src="/images/banners/hero-background.webp"
        alt="Aaurawell Daily Nutra Gummy jar with fresh fruit and leaves"
        width={1967}
        height={799}
        priority
        unoptimized
        sizes="(min-width: 1024px) 100vw, 0vw"
        className="hidden h-auto w-full lg:block"
      />

      {/* Large screens: copy overlaid on the photo's soft left-hand area */}
      <div className="absolute inset-0 hidden items-center lg:flex">
        <div className="container-page">
          <HeroCopy className="max-w-lg text-left" />
        </div>
      </div>

      {/* Tablets only: copy below the photo */}
      <div className="container-page relative -mt-16 pb-8 hidden md:block lg:hidden">
        <HeroCopy className="mx-auto max-w-md text-center" />
      </div>
    </section>
  );
}
