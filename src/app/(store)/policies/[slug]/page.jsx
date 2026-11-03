import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { policies } from "@/data/policies";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return Object.keys(policies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return { title: policies[slug]?.title };
}

export default async function PolicyPage({ params }) {
  const { slug } = await params;
  const policy = policies[slug];
  if (!policy) notFound();

  return (
    <>
      <PageHeader title="Our Policies" breadcrumbs={[{ label: policy.title }]} />

      <section className="bg-ivory py-8 sm:py-16">
        <div className="container-page grid gap-6 sm:gap-8 lg:grid-cols-[0.35fr_1fr]">
          <nav aria-label="Policies" className="h-fit rounded-2xl sm:rounded-3xl border border-line bg-white p-2 sm:p-3 shadow-card lg:sticky lg:top-28">
            <ul className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 sm:block sm:space-y-1 sm:overflow-visible">
              {Object.entries(policies).map(([key, p]) => (
                <li key={key} className="shrink-0 sm:shrink">
                  <Link
                    href={`/policies/${key}`}
                    aria-current={key === slug ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-xl sm:rounded-2xl px-3.5 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm whitespace-nowrap sm:whitespace-normal transition-colors",
                      key === slug ? "bg-sage font-semibold text-forest" : "text-ink hover:bg-cream"
                    )}
                  >
                    {p.title}
                    <ChevronRight className="hidden sm:block size-4" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <article className="rounded-2xl sm:rounded-[2rem] border border-line bg-white p-5 sm:p-10 shadow-card">
            <h2 className="text-2xl sm:text-4xl font-semibold text-forest">{policy.title}</h2>
            <p className="mt-1.5 text-xs text-muted">Last updated: {policy.updated}</p>
            <div className="mt-6 sm:mt-8 space-y-5 sm:space-y-6">
              {policy.sections.map((s) => (
                <section key={s.heading}>
                  <h3 className="font-sans text-sm sm:text-base font-semibold text-ink">{s.heading}</h3>
                  <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed text-muted">{s.body}</p>
                </section>
              ))}
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
