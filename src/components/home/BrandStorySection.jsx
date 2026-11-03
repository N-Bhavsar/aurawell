import Image from "next/image";
import { ArrowRight, Eye, Sprout, HeartHandshake } from "lucide-react";
import Button from "@/components/ui/Button";
import Botanical from "@/components/ui/Botanical";

const pillars = [
  { icon: Eye, title: "Our Vision", text: "To make everyday wellness simpler for everyone." },
  { icon: Sprout, title: "Our Philosophy", text: "Better ingredients. Thoughtful formulation." },
  { icon: HeartHandshake, title: "Our Promise", text: "Quality, transparency and a consumer-first experience." },
];

export default function BrandStorySection() {
  return (
    <section id="about" className="relative isolate scroll-mt-20 overflow-hidden bg-ivory py-10 sm:py-20 lg:py-24">
      <Botanical name="corner" className="bottom-0 left-0 w-24 -scale-x-100 opacity-50 sm:w-40" />
      <Botanical name="sprig" className="top-0 right-0 w-14 -scale-100 opacity-40 sm:w-24" />
      <div className="relative container-page">
        <div className="grid overflow-hidden rounded-2xl sm:rounded-[2rem] border border-line bg-white shadow-card lg:grid-cols-2">
          <div className="relative bg-blush">
            <Image
              src="/images/banners/all-gummies.webp"
              alt="The full range of Aaurawell gummies"
              width={1967}
              height={799}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-auto w-full lg:absolute lg:inset-0 lg:h-full lg:object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" aria-hidden />
            <p className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 font-script text-3xl leading-[0.9] text-white drop-shadow sm:text-5xl">
              A Healthier,
              <br />
              Brighter You
            </p>
          </div>

          <div className="relative isolate flex flex-col justify-center overflow-hidden p-5 sm:p-12 lg:p-14">
            <Botanical name="eucalyptus" className="right-0 bottom-0 w-20 -scale-x-100 opacity-20 sm:w-32" />
            <p className="mb-2 sm:mb-3 text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-leaf uppercase">About Aaurawell Nutra</p>
            <h2 className="text-2xl sm:text-4xl font-semibold leading-tight text-forest">
              Small Gummies.
              <br />
              Big Possibilities.
            </h2>
            <p className="mt-3 sm:mt-5 text-xs sm:text-base leading-relaxed text-muted">
              Aaurawell Nutra was created with a simple idea — to make everyday wellness easier, more enjoyable and more
              accessible. From daily nutrition and digestive wellness to women&apos;s wellness and iron support, our
              gummies are here to support your everyday routine.
            </p>

            <ul className="mt-6 sm:mt-8 grid grid-cols-1 gap-3.5 sm:grid-cols-3 sm:gap-5">
              {pillars.map(({ icon: Icon, title, text }) => (
                <li key={title} className="rounded-xl border border-line/60 bg-cream/30 p-3 sm:border-0 sm:bg-transparent sm:p-0">
                  <Icon className="size-5 sm:size-6 text-leaf" strokeWidth={1.5} aria-hidden />
                  <h3 className="mt-1.5 sm:mt-2 font-sans text-xs sm:text-sm font-semibold text-ink">{title}</h3>
                  <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs leading-relaxed text-muted">{text}</p>
                </li>
              ))}
            </ul>

            <div>
              <Button href="/about" className="mt-6 sm:mt-8 w-full sm:w-auto py-3">
                Explore Our Story <ArrowRight className="size-4" aria-hidden />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
