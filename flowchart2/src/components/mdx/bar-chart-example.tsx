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

import { chartPalette, defaultNumberFormatter } from "./utils";

const barData = [
  { label: "Option A", value: 10 },
  { label: "Option B", value: 20 },
  { label: "Option C", value: 30 },
];

export function BarChartExample() {
  return (
    <div className="w-full max-w-3xl mx-auto flex items-center justify-center py-4">
      <div className="w-full h-[260px] sm:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartPalette.grid} />
            <XAxis
              dataKey="label"
              stroke={chartPalette.mutedAxis}
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke={chartPalette.mutedAxis}
              fontSize={12}
              tickLine={false}
              tickFormatter={defaultNumberFormatter}
            />
            <Tooltip
              cursor={{ fill: "rgba(37, 99, 235, 0.1)" }}
              contentStyle={{
                borderRadius: 12,
                border: "none",
                boxShadow: "0 12px 24px rgba(15, 23, 42, 0.12)",
              }}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="var(--accent)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
