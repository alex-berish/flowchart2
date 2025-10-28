"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { chartPalette } from "@/components/mdx/utils";

type DistributionDatum = {
  likelihood: number;
  capped: number;
  uncapped: number;
  uncappedActual: number;
};

const MAX_DISPLAY_PROFIT = 120_000;

type RawDistributionDatum = {
  likelihood: number;
  capped: number;
  uncapped: number;
};

const RAW_DISTRIBUTION: RawDistributionDatum[] = [
  { likelihood: 100, capped: 1_000, uncapped: 1_000 },
  { likelihood: 95, capped: 3_200, uncapped: 3_200 },
  { likelihood: 90, capped: 5_600, uncapped: 5_600 },
  { likelihood: 80, capped: 9_500, uncapped: 9_500 },
  { likelihood: 70, capped: 14_500, uncapped: 14_500 },
  { likelihood: 60, capped: 18_500, uncapped: 18_500 },
  { likelihood: 50, capped: 22_000, uncapped: 22_000 },
  { likelihood: 40, capped: 26_000, uncapped: 26_000 },
  { likelihood: 30, capped: 28_500, uncapped: 28_500 },
  { likelihood: 20, capped: 30_000, uncapped: 32_000 },
  { likelihood: 10, capped: 30_000, uncapped: 65_000 },
  { likelihood: 5, capped: 29_500, uncapped: 140_000 },
  { likelihood: 2, capped: 30_000, uncapped: 420_000 },
  { likelihood: 1, capped: 30_000, uncapped: 1_000_000 },
];

const DISTRIBUTION: DistributionDatum[] = RAW_DISTRIBUTION.map((point) => ({
  likelihood: point.likelihood,
  capped: point.capped,
  uncapped: Math.min(point.uncapped, MAX_DISPLAY_PROFIT),
  uncappedActual: point.uncapped,
}));

const currencyFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

function formatProfit(value: number) {
  if (value >= 1_000_000) {
    return `£${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `£${(value / 1_000).toFixed(0)}k`;
  }
  return currencyFormatter.format(value);
}

function formatLikelihood(value: number) {
  return `${value}%`;
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{
    name?: string;
    value: number;
    payload?: DistributionDatum;
  }>;
  label?: number | string;
}) {
  if (!active || !payload || payload.length === 0 || typeof label !== "number") {
    return null;
  }

  return (
    <div className="chart-tooltip rounded-2xl px-4 py-3 text-left shadow-lg bg-white text-black">
      <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
        Probability of month landing here
      </p>
      <p className="mt-1 text-lg font-semibold text-gray-900">
        {formatLikelihood(label)}
      </p>
      <ul className="mt-3 space-y-1 text-sm">
        {payload.map((entry) => (
          <li
            key={entry.name}
            className="flex items-center justify-between gap-3"
          >
            <span className="font-medium text-gray-600">{entry.name}</span>
            <span className="font-semibold text-gray-900">
              {(() => {
                const point = entry.payload;
                if (
                  entry.name?.toLowerCase().includes("uncapped") &&
                  point &&
                  point.uncappedActual > MAX_DISPLAY_PROFIT
                ) {
                  return `${formatProfit(MAX_DISPLAY_PROFIT)}+`;
                }
                return formatProfit(entry.value);
              })()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProfitDistributionComparisonChart() {
  return (
    <ResponsiveContainer width="100%" height={380}>
      <LineChart
        data={DISTRIBUTION}
        margin={{ top: 48, right: 32, bottom: 8, left: 12 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={chartPalette.grid} />

        <XAxis
          dataKey="likelihood"
          type="number"
          reversed
          domain={[0, 100]}
          tickFormatter={formatLikelihood}
          stroke={chartPalette.mutedAxis}
          fontSize={12}
          tickLine={false}
        />
        <YAxis
          type="number"
          domain={[0, MAX_DISPLAY_PROFIT]}
          tickFormatter={formatProfit}
          stroke={chartPalette.mutedAxis}
          fontSize={12}
          tickLine={false}
        />

        <Tooltip content={<CustomTooltip />} wrapperStyle={{ outline: "none" }} />
        <Legend
          verticalAlign="top"
          align="right"
          iconType="circle"
          wrapperStyle={{ fontSize: "0.8rem", paddingBottom: 12 }}
        />
        <Line
          type="monotone"
          dataKey="uncapped"
          name="NewCo Scenario — uncapped"
          stroke={chartPalette.primary}
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
        <Line
          type="monotone"
          dataKey="capped"
          name="CD Scenario"
          stroke={chartPalette.secondary}
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />

        <ReferenceLine
          y={30_000}
          stroke={chartPalette.secondary}
          strokeDasharray="4 4"
          label={{
            value: "",
            position: "insideTopRight",
            fill: chartPalette.secondary,
            fontSize: 12,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
