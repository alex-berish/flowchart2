"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { useEffect, useState } from "react";

import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="flex items-center justify-center rounded-full border border-[color-mix(in srgb, var(--foreground) 12%, transparent)] bg-[color-mix(in srgb, white 90%, transparent)] p-3 text-[var(--foreground)] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      {isDark ? (
        <SunMedium className="h-4 w-4" aria-hidden />
      ) : (
        <MoonStar className="h-4 w-4" aria-hidden />
      )}
    </button>
  );
}
