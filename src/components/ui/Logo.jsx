import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Aaurawell Nutra official brand logo:
 * Metallic emerald green & gold "A" emblem with leaf wings & human figure,
 * "aura" in deep emerald green, "well" in embossed gold,
 * and the "NEW ERA WELLNESS — NUTRA" tagline.
 */
export function LogoMark({ light = false, tagline = true, className, priority = true }) {
  const src = light
    ? tagline
      ? "/images/logo/logo-light.png"
      : "/images/logo/logo-light-compact.png"
    : tagline
      ? "/images/logo/logo.png"
      : "/images/logo/logo-compact.png";

  const width = 956;
  const height = tagline ? 290 : 240;

  return (
    <Image
      src={src}
      alt="Aaurawell Nutra"
      width={width}
      height={height}
      priority={priority}
      className={cn("h-auto w-auto object-contain select-none", className)}
    />
  );
}

export default function Logo({ light = false, tagline = true, className, markClassName, priority = true }) {
  return (
    <Link href="/" aria-label="Aaurawell Nutra home" className={cn("inline-flex shrink-0 items-center", className)}>
      <LogoMark
        light={light}
        tagline={tagline}
        priority={priority}
        className={cn("h-10 w-auto md:h-12", markClassName)}
      />
    </Link>
  );
}
