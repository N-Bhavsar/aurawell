import Image from "next/image";
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

/**
 * Mobile-first hero: on mobile phones the image is scaled to width with a gentle bottom fade,
 * and text sits below with thumb-friendly full-width action buttons.
 */
export default function HeroSection() {
  return (
    <section id="home" className="relative isolate bg-cream">
      {/* ── Phones: portrait mobile photo, bottom-faded so copy sits below ── */}
      <div
        className="md:hidden"
        style={{
          maskImage: "linear-gradient(to bottom, #000 68%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, #000 68%, transparent 100%)",
        }}
      >
        <Image
          src="/images/banners/hero-background-mobile.webp"
          alt="Aaurawell Daily Nutra Gummy jar with fresh fruit and leaves"
          width={720}
          height={799}
          priority
          unoptimized
          sizes="(min-width: 768px) 0vw, 100vw"
          className="h-auto w-full"
        />
      </div>

      {/* ── Tablets: full desktop banner scaled to width, preserving composition ── */}
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

      {/* Small screens & tablets: copy below the faded photo edge */}
      <div className="container-page relative -mt-12 pb-8 sm:-mt-20 md:-mt-16 lg:hidden">
        <HeroCopy className="mx-auto max-w-sm text-center sm:max-w-md md:max-w-lg" />
      </div>
    </section>
  );
}
