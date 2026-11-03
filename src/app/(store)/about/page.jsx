import Image from "next/image";
import { ArrowRight, Eye, Sprout, HeartHandshake } from "lucide-react";
import Button from "@/components/ui/Button";
import Botanical from "@/components/ui/Botanical";
import SectionHeading from "@/components/ui/SectionHeading";
import PromoBanner from "@/components/shop/PromoBanner";

export const metadata = {
  title: "About Us",
  description: "Aaurawell Nutra was created to make everyday wellness easier, more enjoyable and more accessible.",
};

const pillars = [
  { icon: Eye, title: "Our Vision", text: "To make everyday wellness simpler and more enjoyable for everyone." },
  { icon: Sprout, title: "Our Philosophy", text: "Better ingredients. Thoughtful formulation. Convenient nutrition." },
  { icon: HeartHandshake, title: "Our Promise", text: "Quality, transparency and a consumer-first experience in everything we do." },
];

const values = [
  { value: "4", label: "Thoughtful formulations" },
  { value: "30", label: "Gummies in every bottle" },
  { value: "100%", label: "Gelatin free" },
  { value: "0", label: "Artificial colours or flavours" },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-cream via-ivory to-blush/60">
        <Botanical name="corner" className="top-0 right-0 w-24 -scale-y-100 opacity-70 sm:w-48" />
        <Botanical name="fern" className="bottom-0 left-0 w-16 opacity-40 sm:w-28" />

        <div className="container-page relative grid items-center gap-8 py-10 sm:py-20 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-leaf uppercase">Our Story</p>
            <h1 className="mt-2.5 text-3xl leading-tight font-semibold sm:text-5xl lg:text-6xl text-forest">About Aaurawell Nutra</h1>
            <p className="mt-1.5 font-serif text-lg sm:text-xl text-leaf">A New Era of Wellness</p>
            <p className="mx-auto mt-4 sm:mt-6 max-w-lg text-xs sm:text-base leading-relaxed text-muted lg:mx-0">
              Aaurawell Nutra was created with a simple idea — to make everyday wellness easier, more enjoyable and more
              accessible. We focus on thoughtfully formulated nutritional gummies, bringing together carefully selected
              ingredients to support different wellness needs.
            </p>
            <Button href="/shop" className="mt-6 sm:mt-8 w-full sm:w-auto py-3">
              Explore Our Gummies <ArrowRight className="size-4" aria-hidden />
            </Button>
          </div>

          <div className="relative pb-4 sm:pb-0">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:rounded-[2rem] shadow-card">
              <Image
                src="/images/banners/all-gummies.webp"
                alt="The full range of Aaurawell gummies"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-center sm:absolute sm:-bottom-6 sm:left-4 sm:mt-0 sm:-rotate-6 rounded-2xl bg-white/95 px-4 py-2.5 font-script text-2xl sm:text-4xl text-forest shadow-card border border-line/60">
              Wellness for a Brighter Tomorrow
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-10 sm:py-20">
        <div className="container-page">
          <ul className="grid gap-4 sm:gap-6 md:grid-cols-3">
            {pillars.map(({ icon: Icon, title, text }) => (
              <li key={title} className="rounded-2xl sm:rounded-3xl border border-line bg-white p-5 sm:p-8 text-center shadow-card">
                <span className="mx-auto flex size-12 sm:size-14 items-center justify-center rounded-full bg-sage text-forest">
                  <Icon className="size-5 sm:size-6" strokeWidth={1.5} aria-hidden />
                </span>
                <h2 className="mt-4 sm:mt-5 text-xl sm:text-2xl font-semibold">{title}</h2>
                <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed text-muted">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-cream py-10 sm:py-20">
        <Botanical name="olive" className="right-0 bottom-0 w-32 -scale-x-100 opacity-30 sm:w-56" />
        <div className="container-page relative grid items-center gap-8 sm:gap-10 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {["/images/products/gut-comfort-gummy-lifestyle.webp", "/images/products/pms-care-gummy-lifestyle.webp"].map((src, i) => (
              <div key={src} className={`relative aspect-[3/4] overflow-hidden rounded-2xl sm:rounded-3xl ${i ? "mt-6 sm:mt-10 bg-peach" : "bg-sage"}`}>
                <Image src={src} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
              </div>
            ))}
          </div>
          <div>
            <SectionHeading
              align="left"
              eyebrow="What we believe"
              title="Small Gummies. Big Possibilities."
              subtitle="From daily nutrition and digestive wellness to women's wellness and iron support, every Aaurawell gummy is designed around a specific everyday need — with clear labels, carefully chosen ingredients and a taste you'll enjoy."
            />
            <dl className="mt-6 sm:mt-8 grid grid-cols-2 gap-3 sm:gap-4">
              {values.map((v) => (
                <div key={v.label} className="rounded-2xl border border-line bg-white p-4 sm:p-5 shadow-xs">
                  <dt className="text-xs text-muted">{v.label}</dt>
                  <dd className="font-serif text-2xl sm:text-3xl font-semibold text-forest mt-1">{v.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <div className="bg-ivory pt-10 sm:pt-20">
        <PromoBanner script={["Small Gummies", "Big Wellness"]} cta={{ label: "Explore Our Products", href: "/shop" }} />
      </div>
    </>
  );
}
