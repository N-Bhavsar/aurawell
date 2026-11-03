import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Botanical from "@/components/ui/Botanical";
import { cn } from "@/lib/utils";

/** Soft page banner with breadcrumbs, used at the top of inner pages. */
export default function PageHeader({ title, subtitle, eyebrow, breadcrumbs = [], className, children }) {
  return (
    <section className={cn("relative isolate overflow-hidden bg-gradient-to-br from-cream via-ivory to-sage/60", className)}>
      <Botanical name="corner" className="top-0 right-0 w-24 -scale-y-100 opacity-70 sm:w-40 lg:w-48" />
      <Botanical name="fern" className="bottom-0 left-0 hidden w-20 opacity-50 sm:block lg:w-24" />

      <div className="container-page relative py-8 sm:py-14 text-center">
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-3 sm:mb-4 flex justify-center">
            <ol className="no-scrollbar flex flex-wrap items-center justify-center gap-1.5 text-xs text-muted">
              <li>
                <Link href="/" className="hover:text-forest">
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb) => (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  <ChevronRight className="size-3 shrink-0" aria-hidden />
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-forest">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-forest font-medium" aria-current="page">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && <p className="mb-2 sm:mb-3 text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-leaf uppercase">{eyebrow}</p>}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl leading-tight font-semibold text-forest">{title}</h1>
        {subtitle && <p className="mx-auto mt-2 sm:mt-3 max-w-xl text-xs sm:text-base text-muted">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
