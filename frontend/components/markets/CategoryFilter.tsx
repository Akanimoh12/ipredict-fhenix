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
          "rounded-full px-4 py-1.5 text-sm transition",
          !selectedCategory
            ? "bg-fhenix-600 text-white"
            : "bg-vault-card text-gray-400 hover:text-white"
        )}
      >
        All
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.name}
          onClick={() => setCategory(cat.name)}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm transition",
            selectedCategory === cat.name
              ? "bg-fhenix-600 text-white"
              : "bg-vault-card text-gray-400 hover:text-white"
          )}
        >
          {cat.icon} {cat.name}
        </button>
      ))}
    </div>
  );
}
