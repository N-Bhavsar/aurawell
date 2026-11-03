import { Leaf, FlaskConical, Palette, Sprout } from "lucide-react";
import { cn } from "@/lib/utils";

const badges = [
  { icon: Leaf, label: "Natural Ingredients" },
  { icon: Sprout, label: "Gelatin Free" },
  { icon: Palette, label: "No Artificial Colours" },
  { icon: FlaskConical, label: "No Artificial Flavours" },
];

export default function TrustBadges({ className }) {
  return (
    <ul className={cn("grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3", className)}>
      {badges.map(({ icon: Icon, label }) => (
        <li key={label} className="flex items-center gap-2 rounded-xl sm:rounded-2xl border border-line bg-white/80 px-2.5 py-2 sm:px-3 sm:py-2.5 shadow-xs">
          <span className="flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-full bg-sage text-forest">
            <Icon className="size-3.5 sm:size-4" strokeWidth={1.5} aria-hidden />
          </span>
          <span className="text-[11px] sm:text-xs font-medium leading-tight text-ink">{label}</span>
        </li>
      ))}
    </ul>
  );
}
