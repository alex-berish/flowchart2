export function cx(base: string, extra?: string) {
  return extra ? `${base} ${extra}` : base;
}

export const chartPalette = {
  primary: "#2563eb",
  secondary: "#f97316",
  mutedAxis: "color-mix(in srgb, var(--foreground) 70%, transparent)",
  grid: "rgba(226, 232, 240, 0.4)",
};

type Formatter = (value: number) => string;

export const defaultNumberFormatter: Formatter = (value) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format(value);

export const defaultPercentFormatter: Formatter = (value) =>
  `${new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format(value * 100)}%`;
