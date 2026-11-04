"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Sparkles, ShoppingBag, Truck } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { cn } from "@/lib/utils";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { count } = useCart();

  // Hide bottom nav on checkout, admin, PDP, and active cart (which has its own Flipkart-style checkout bar)
  const isProductPage = pathname.startsWith("/shop/") && pathname !== "/shop";
  const isCartWithItems = pathname === "/cart" && count > 0;
  if (pathname.startsWith("/checkout") || pathname.startsWith("/admin") || isProductPage || isCartWithItems) {
    return null;
  }

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Shop", href: "/shop", icon: Sparkles },
    { label: "Track", href: "/track-order", icon: Truck },
    { label: "Cart", href: "/cart", icon: ShoppingBag, badge: count },
  ];

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 inset-x-0 z-30 lg:hidden border-t border-line/80 bg-white/95 backdrop-blur-md pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1.5 shadow-[0_-4px_16px_rgba(29,43,34,0.06)]"
    >
      <ul className="flex items-center justify-around px-2">
        {navItems.map(({ label, href, icon: Icon, badge }) => {
          const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <li key={label} className="flex-1">
              <Link
                href={href}
                className={cn(
                  "relative flex flex-col items-center justify-center py-1 text-center transition-colors active:scale-95",
                  isActive ? "text-forest font-semibold" : "text-muted hover:text-forest"
                )}
              >
                <div className="relative">
                  <Icon
                    className={cn(
                      "size-5 transition-transform",
                      isActive ? "scale-110 stroke-[2.2]" : "stroke-[1.75]"
                    )}
                  />
                  {badge > 0 && (
                    <span className="absolute -top-1.5 -right-2.5 flex min-w-4 h-4 items-center justify-center rounded-full bg-forest px-1 text-[0.62rem] font-bold text-white shadow-sm ring-1.5 ring-white">
                      {badge}
                    </span>
                  )}
                </div>
                <span className="mt-1 text-[0.68rem] tracking-tight">{label}</span>
                {isActive && (
                  <span className="absolute bottom-0 h-0.5 w-6 rounded-full bg-forest" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

