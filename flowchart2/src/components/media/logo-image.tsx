"use client";

import Image from "next/image";
import { useMemo } from "react";

import { useTheme } from "@/components/theme/theme-provider";

type LogoImageProps = {
  brand: "chatobserver" | "clean-digital";
  alt?: string;
  className?: string;
  priority?: boolean;
};

const BRAND_SOURCES = {
  chatobserver: {
    light: "/logos/chatobserver.png",
    dark: "/logos/chatobserver.png",
    alt: "ChatObserver logo",
  },
  "clean-digital": {
    light: "/logos/clean-digital-light.png",
    dark: "/logos/clean-digital-dark.png",
    alt: "Clean Digital logo",
  },
} as const;

export function LogoImage({ brand, alt, className, priority }: LogoImageProps) {
  const { theme } = useTheme();

  const source = useMemo(() => {
    const config = BRAND_SOURCES[brand];
    if (!config) return null;
    const mode = theme === "dark" ? "dark" : "light";
    return {
      src: config[mode],
      alt: alt ?? config.alt,
    };
  }, [brand, theme, alt]);

  if (!source) return null;

  return (
    <Image
      src={source.src}
      alt={source.alt}
      width={320}
      height={160}
      className={className}
      priority={priority}
    />
  );
}
