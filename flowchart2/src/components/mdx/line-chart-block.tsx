"use client";

import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  type TooltipProps,
} from "recharts";
import { useMemo } from "react";

import { chartPalette, defaultNumberFormatter } from "./utils";

export type LineSeriesDatum = {
  date: string;
  value: number;
  round?: string;
  roundAmount?: number;
};

export type LineSeries = {
  name: string;
  data: LineSeriesDatum[];
  color?: string;
};

const COLOR_SEQUENCE = [
  chartPalette.primary,
  chartPalette.secondary,
  "#0ea5e9",
  "#9333ea",
  "#f59e0b",
  "#22c55e",
  "#ef4444",
];

type LineChartBlockProps = {
  series: LineSeries[];
  height?: number;
  formatValue?: (value: number) => string;
  dateFormatter?: (isoDate: string) => string;
  className?: string;
};

type CustomTooltipEntry = {
  dataKey?: string;
  name?: string;
  value?: number | string;
  color?: string;
  payload?: Record<string, unknown>;
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: CustomTooltipEntry[];
  label?: string | number;
  formatValue: (value: number) => string;
  dateFormatter: (isoDate: string) => string;
};

function CustomTooltip({
  active,
  payload,
  label,
  formatValue,
  dateFormatter,
}: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const formattedDate = label ? dateFormatter(String(label)) : "";

  return (
    <div
      className="chart-tooltip rounded-2xl px-4 py-3 text-left shadow-lg"
      style={{
        border: "none",
        minWidth: 220,
      }}
    >
      <p className="chart-tooltip-date text-sm font-semibold">{formattedDate}</p>
      <ul className="mt-3 space-y-1">
        {payload
          .filter((entry) => entry && entry.value != null)
          .map((entry) => {
            const dataKey = String(entry.dataKey ?? entry.name ?? "");
            const meta = (entry.payload?.[`${dataKey}__meta`] ?? null) as
              | LineSeriesDatum
              | null;
            const roundLabel = meta?.round;
            const roundAmount = meta?.roundAmount;
            return (
              <li key={dataKey} className="flex items-start gap-3 text-sm">
                <span
                  className="mt-1 h-2 w-2 rounded-full"
                  style={{ backgroundColor: entry.color ?? chartPalette.primary }}
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="chart-tooltip-name font-medium">{dataKey}</span>
                    <span className="chart-tooltip-value ml-auto font-semibold">
                      {formatValue(Number(entry.value))}
                    </span>
                  </div>
                  {roundLabel ? (
                    <div className="chart-tooltip-round text-xs">
                      {roundLabel}
                      {typeof roundAmount === "number"
                        ? ` — ${formatValue(roundAmount)}`
                        : ""}
                    </div>
                  ) : null}
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export function LineChartBlock({
  series,
  height = 320,
  formatValue = defaultNumberFormatter,
  dateFormatter = (isoDate) =>
    new Date(isoDate).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    }),
  className,
}: LineChartBlockProps) {
  const chartData = useMemo(() => {
    const dates = new Set<string>();
    series.forEach((line) => {
      line.data.forEach(({ date }) => dates.add(date));
    });

    const sortedDates = Array.from(dates).sort();

    return sortedDates.map((date) => {
      const entry: Record<string, number | string | LineSeriesDatum | null> = {
        date,
      };

      series.forEach((line) => {
        const match = line.data.find((point) => point.date === date);
        entry[line.name] = match ? match.value : null;
        entry[`${line.name}__meta`] = match ?? null;
      });

      return entry;
    });
  }, [series]);

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={chartData} margin={{ top: 16, right: 24, bottom: 8, left: 16 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={chartPalette.grid} />
          <XAxis
            dataKey="date"
            stroke={chartPalette.mutedAxis}
            fontSize={12}
            tickLine={false}
            tickFormatter={dateFormatter}
          />
          <YAxis
            stroke={chartPalette.mutedAxis}
            fontSize={12}
            tickLine={false}
            tickFormatter={formatValue}
          />
          <Tooltip
            cursor={{ strokeDasharray: "4 4" }}
            content={
              <CustomTooltip
                formatValue={formatValue}
                dateFormatter={dateFormatter}
              />
            }
            wrapperStyle={{ outline: "none" }}
          />
          <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: "0.9rem" }} />
          {series.map((line, index) => (
            <Line
              key={line.name}
              type="monotone"
              dataKey={line.name}
              stroke={line.color ?? COLOR_SEQUENCE[index % COLOR_SEQUENCE.length]}
              strokeWidth={2}
              dot={false}
              connectNulls
              isAnimationActive={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
