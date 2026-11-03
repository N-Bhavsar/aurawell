import { cn } from "@/lib/utils";

export default function SectionHeading({ eyebrow, title, subtitle, align = "center", className }) {
  return (
    <div className={cn(align === "center" ? "mx-auto text-center" : "text-left", "max-w-2xl", className)}>
      {eyebrow && (
        <p className="mb-2 sm:mb-3 text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-leaf uppercase">{eyebrow}</p>
      )}
      <h2 className="text-2xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-tight text-forest">{title}</h2>
      {subtitle && <p className="mt-2 sm:mt-3 text-xs sm:text-base leading-relaxed text-muted">{subtitle}</p>}
    </div>
  );
}
