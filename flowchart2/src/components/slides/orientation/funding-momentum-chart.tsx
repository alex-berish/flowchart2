"use client";

import { useMemo, useState } from "react";

import {
  LineChartBlock,
  type LineSeries,
} from "@/components/mdx/line-chart-block";

const SERIES: LineSeries[] = [
  {
    name: "Profound",
    data: [
      { date: "2025-01-01", value: 0 },
      {
        date: "2025-06-18",
        value: 23_500_000,
        round: "Series A",
        roundAmount: 20_000_000,
      },
      {
        date: "2025-08-12",
        value: 58_500_000,
        round: "Series B",
        roundAmount: 35_000_000,
      },
    ],
  },
  {
    name: "Bluefish",
    data: [
      { date: "2025-01-01", value: 0 },
      {
        date: "2025-08-20",
        value: 23_500_000,
        round: "Series A",
        roundAmount: 20_000_000,
      },
    ],
  },
  {
    name: "Scrunch",
    data: [
      { date: "2025-01-01", value: 0 },
      {
        date: "2025-03-04",
        value: 4_000_000,
        round: "Seed",
        roundAmount: 4_000_000,
      },
      {
        date: "2025-07-22",
        value: 19_000_000,
        round: "Series A",
        roundAmount: 15_000_000,
      },
    ],
  },
  {
    name: "Evertune",
    data: [
      { date: "2025-01-01", value: 0 },
      {
        date: "2025-08-12",
        value: 19_000_000,
        round: "Series A",
        roundAmount: 15_000_000,
      },
    ],
  },
  {
    name: "Peec",
    data: [
      { date: "2025-01-01", value: 0 },
      {
        date: "2025-04-15",
        value: 2_095_200,
        round: "Pre-Seed",
        roundAmount: 2_095_200,
      },
      {
        date: "2025-07-02",
        value: 8_148_000,
        round: "Seed",
        roundAmount: 6_052_800,
      },
    ],
  },
  {
    name: "Athena",
    data: [
      { date: "2025-01-01", value: 0 },
      {
        date: "2025-06-18",
        value: 2_200_000,
        round: "Seed",
        roundAmount: 2_200_000,
      },
    ],
  },
  {
    name: "Promptwatch",
    data: [
      { date: "2025-01-01", value: 0 },
      {
        date: "2025-09-18",
        value: 1_396_800,
        round: "Seed",
        roundAmount: 1_396_800,
      },
    ],
  },
];

const NON_US_COMPANIES = new Set(["Peec", "Promptwatch"]);

export function FundingMomentumChart() {
  const [excludeUSCompanies, setExcludeUSCompanies] = useState(false);

  const filteredSeries = useMemo(
    () =>
      excludeUSCompanies
        ? SERIES.filter((line) => NON_US_COMPANIES.has(line.name))
        : SERIES,
    [excludeUSCompanies],
  );

  return (
    <div className="relative h-full w-full self-stretch">
      <div className="absolute right-3 top-3 md:top-16 z-10 flex items-center gap-2 rounded-xl bg-[color-mix(in srgb, white 85%, var(--background))] px-3 py-2 text-sm font-medium text-[color-mix(in srgb, var(--foreground) 80%, transparent)] shadow-sm">
        <label className="flex items-center gap-2">
          <input
            aria-label="Exclude US companies"
            type="checkbox"
            checked={excludeUSCompanies}
            onChange={(event) => setExcludeUSCompanies(event.target.checked)}
            className="h-4 w-4 rounded border-[color-mix(in srgb, var(--foreground) 30%, transparent)] bg-transparent accent-[color-mix(in srgb, var(--accent) 65%, white)]"
          />
          Exclude US companies
        </label>
      </div>
      <LineChartBlock
        className="h-full w-full"
        height={320}
        formatValue={(value) => `$${(value / 1_000_000).toFixed(1)}M`}
        series={filteredSeries}
      />
    </div>
  );
}
