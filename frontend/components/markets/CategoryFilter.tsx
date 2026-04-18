"use client";

import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/types/market";
import { useAppStore } from "@/store/useAppStore";

export function CategoryFilter() {
  const { selectedCategory, setCategory } = useAppStore();

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => setCategory(null)}
        className={cn(
          "rounded-xl px-4 py-2 text-xs font-medium transition-all sm:text-sm",
          !selectedCategory
            ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-sm shadow-violet-500/20"
            : "border border-vault-border bg-vault-surface text-gray-400 hover:border-fhenix-700/40 hover:text-white"
        )}
      >
        All
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.name}
          onClick={() => setCategory(cat.name)}
          className={cn(
            "rounded-xl px-4 py-2 text-xs font-medium transition-all sm:text-sm",
            selectedCategory === cat.name
              ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-sm shadow-violet-500/20"
              : "border border-vault-border bg-vault-surface text-gray-400 hover:border-fhenix-700/40 hover:text-white"
          )}
        >
          {cat.icon} {cat.name}
        </button>
      ))}
    </div>
  );
}
