"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { SingleSeriesDatum } from "@/types/charts";

import { chartPalette, cx, defaultNumberFormatter } from "./utils";

type BarChartBlockProps = {
  data: SingleSeriesDatum[];
  xKey?: keyof SingleSeriesDatum;
  yKey?: keyof SingleSeriesDatum;
  color?: string;
  formatValue?: (value: number) => string;
  className?: string;
};

export function BarChartBlock({
  data,
  xKey = "label",
  yKey = "value",
  color = chartPalette.primary,
  formatValue = defaultNumberFormatter,
  className,
}: BarChartBlockProps) {
  return (
    <div className={cx("w-full h-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={chartPalette.grid} />
          <XAxis
            dataKey={xKey as string}
            stroke={chartPalette.mutedAxis}
            fontSize={12}
            tickLine={false}
            interval={0}
          />
          <YAxis
            stroke={chartPalette.mutedAxis}
            fontSize={12}
            tickLine={false}
            tickFormatter={formatValue}
          />
          <Tooltip
            cursor={{ fill: "rgba(37, 99, 235, 0.08)" }}
            formatter={(value: number) => formatValue(value)}
            contentStyle={{
              borderRadius: 12,
              border: "none",
              boxShadow: "0 12px 24px rgba(15, 23, 42, 0.12)",
            }}
          />
          <Bar dataKey={yKey as string} radius={[8, 8, 0, 0]} fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
