"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Truck, ArrowRight, Phone, Mail, Sparkles, ShoppingBag } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { contact } from "@/data/site";

export default function MobileMenu({ links }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Close menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label="Open navigation menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
        className="inline-flex size-10 items-center justify-center rounded-full text-forest transition-colors hover:bg-sage active:bg-sage/80"
      >
        <Menu className="size-5" strokeWidth={1.8} />
      </button>

      {/* Portal to <body> */}
      {mounted &&
        createPortal(
          <div className="lg:hidden">
            {/* Backdrop */}
            <div
              className={`fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm transition-opacity duration-300 ${
                open ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              onClick={() => setOpen(false)}
              aria-hidden
            />

            {/* Slide-out Drawer */}
            <aside
              id="mobile-menu"
              aria-label="Mobile navigation"
              inert={!open ? "" : undefined}
              className={`fixed inset-y-0 right-0 z-50 flex w-[86%] max-w-sm flex-col bg-cream shadow-2xl transition-transform duration-300 ease-out ${
                open ? "visible translate-x-0" : "invisible translate-x-full"
              }`}
            >
              <div className="flex h-16 items-center justify-between border-b border-line px-5">
                <Logo markClassName="h-9 w-auto" />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="inline-flex size-10 items-center justify-center rounded-full text-forest hover:bg-sage active:bg-sage/80"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Menu content */}
              <div className="flex-1 overflow-y-auto px-4 py-5 no-scrollbar">
                <Link
                  href="/shop"
                  onClick={() => setOpen(false)}
                  className="mb-4 flex items-center justify-between rounded-2xl bg-forest px-4 py-3 text-white shadow-sm transition active:scale-[0.99]"
                >
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="size-4 text-gold" />
                    <span className="font-medium text-sm">Shop All Gummies</span>
                  </div>
                  <ArrowRight className="size-4 text-gold" />
                </Link>

                <nav aria-label="Mobile links">
                  <ul className="space-y-1">
                    {links.map((link) => {
                      const isActive = pathname === link.href;
                      return (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className={`flex items-center justify-between rounded-xl px-4 py-3 font-serif text-lg transition-colors ${
                              isActive
                                ? "bg-sage/80 font-medium text-forest"
                                : "text-ink hover:bg-sage/50 active:bg-sage/70"
                            }`}
                          >
                            <span>{link.label}</span>
                            {isActive && (
                              <span className="size-1.5 rounded-full bg-leaf" />
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                <div className="mt-6 border-t border-line/80 pt-5">
                  <p className="px-4 text-xs font-semibold uppercase tracking-wider text-muted">
                    Quick Actions
                  </p>
                  <div className="mt-2 space-y-2">
                    <Link
                      href="/cart"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-ink hover:bg-sage/50"
                    >
                      <ShoppingBag className="size-4 text-forest" />
                      <span>Shopping Cart</span>
                    </Link>
                    <Link
                      href="/track-order"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-ink hover:bg-sage/50"
                    >
                      <Truck className="size-4 text-forest" />
                      <span>Track Your Order</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom drawer footer */}
              <div className="border-t border-line bg-white/60 p-4">
                <div className="flex flex-col gap-2 text-xs text-muted">
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-2 text-forest hover:underline"
                  >
                    <Phone className="size-3.5 text-gold" /> {contact.phone}
                  </a>
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-2 text-muted hover:text-forest"
                  >
                    <Mail className="size-3.5 text-gold" /> {contact.email}
                  </a>
                </div>
              </div>
            </aside>
          </div>,
          document.body
        )}
    </div>
  );
}
