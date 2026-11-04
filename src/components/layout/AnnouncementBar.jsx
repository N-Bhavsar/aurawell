"use client";

import { useEffect, useState } from "react";
import { Truck, ShieldCheck, Leaf, X } from "lucide-react";

const icons = [Truck, ShieldCheck, Leaf];

// Shown on every page load; closing hides it until the page is reloaded.
export default function AnnouncementBar({ announcements = [] }) {
  const [visible, setVisible] = useState(true);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  useEffect(() => {
    if (announcements.length <= 1) return;
    const interval = setInterval(() => {
      setActiveMobileIndex((prev) => (prev + 1) % announcements.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [announcements.length]);

  if (!visible || announcements.length === 0) return null;

  const ActiveMobileIcon = icons[activeMobileIndex % icons.length] || Truck;

  return (
    <div className="relative bg-forest text-white overflow-hidden">
      {/* Mobile view: smooth cycling single announcement */}
      <div className="md:hidden container-page flex h-8 items-center justify-center pr-8 pl-2 text-[0.68rem] tracking-wide font-medium">
        <div
          key={activeMobileIndex}
          className="flex items-center gap-1.5 truncate max-w-[calc(100vw-3.75rem)] animate-in fade-in duration-500"
        >
          <ActiveMobileIcon className="size-3 text-sage-dark shrink-0" aria-hidden />
          <span className="truncate">{announcements[activeMobileIndex]}</span>
        </div>
      </div>

      {/* Desktop view: multi-item row */}
      <ul className="hidden md:flex container-page h-9 items-center justify-between gap-8 pr-12 text-[0.72rem] tracking-wide">
        {announcements.map((text, i) => {
          const Icon = icons[i % icons.length] || Truck;
          return (
            <li key={text} className="flex items-center gap-2 font-medium">
              <Icon className="size-3.5 text-sage-dark shrink-0" aria-hidden />
              <span>{text}</span>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        aria-label="Close announcement"
        onClick={() => setVisible(false)}
        className="absolute top-1/2 right-1.5 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:right-3 sm:size-7 active:scale-90"
      >
        <X className="size-3.5 sm:size-4" />
      </button>
    </div>
  );
}
