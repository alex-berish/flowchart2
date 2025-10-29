"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { chartPalette } from "@/components/mdx/utils";

const PIE_COLOR_SEQUENCE = [
  chartPalette.primary,
  "#0ea5e9",
  chartPalette.secondary,
  "#10b981",
  "#a855f7",
  "#facc15",
];

const FONT_SIZE = 12;

const currencyFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 2,
});

const multipleFormatter = (value: number) => `${value.toFixed(1)}×`;

type PieDatum = {
  name: string;
  value: number;
};

type BarDatum = Record<string, string | number>;

export function PreSeedOwnershipPie() {
  const data: PieDatum[] = [
    { name: "Chatobserver", value: 72.99 },
    { name: "Option pool", value: 10 },
    { name: "Other investors", value: 5 },
    { name: "CD (equity + warrant)", value: 8.67 },
    { name: "Rory (£5k)", value: 1.67 },
    { name: "Fraser (£5k)", value: 1.67 },
  ];

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={50}
          outerRadius={110}
          label={({ name, value }) => {
            const numericValue =
              typeof value === "number" ? value : Number(value ?? 0);
            return `${name}: ${numericValue.toFixed(2)}%`;
          }}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell
              key={entry.name}
              fill={PIE_COLOR_SEQUENCE[index % PIE_COLOR_SEQUENCE.length]}
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(rawValue, rawName) => {
            const numericValue =
              typeof rawValue === "number" ? rawValue : Number(rawValue ?? 0);
            const label =
              typeof rawName === "string"
                ? rawName
                : rawName != null
                  ? String(rawName)
                  : "";
            return [`${numericValue.toFixed(2)}%`, label];
          }}
          wrapperStyle={{ outline: "none" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function DilutionScenarioPies() {
  const preSeed: PieDatum[] = [
    { name: "CD", value: 8.67 },
    { name: "Rory", value: 1.67 },
    { name: "Fraser", value: 1.67 },
    { name: "Others", value: 87.99 },
  ];

  const mild: PieDatum[] = [
    { name: "CD", value: 6.07 },
    { name: "Rory", value: 1.17 },
    { name: "Fraser", value: 1.17 },
    { name: "Others", value: 91.59 },
  ];

  const conservative: PieDatum[] = [
    { name: "CD", value: 4.33 },
    { name: "Rory", value: 0.83 },
    { name: "Fraser", value: 0.83 },
    { name: "Others", value: 93.01 },
  ];

  const charts: Array<{ title: string; data: PieDatum[] }> = [
    { title: "Pre-seed close", data: preSeed },
    { title: "Exit — mild dilution (~30%)", data: mild },
    { title: "Exit — conservative (~50%)", data: conservative },
  ];

  return (
    <div className="grid gap-8 md:grid-cols-3">
      {charts.map((chart, chartIndex) => {
        const total = chart.data.reduce((sum, slice) => sum + slice.value, 0);
        return (
          <div key={chart.title} className="flex flex-col items-center gap-4">
            <p className="text-xs uppercase tracking-[0.2em] text-[color-mix(in srgb, var(--foreground) 65%, transparent)]">
              {chart.title}
            </p>
            <div className="h-56 w-full overflow-visible">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chart.data}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={52}
                    outerRadius={105}
                    strokeWidth={0}
                  >
                    {chart.data.map((entry, index) => (
                      <Cell
                        key={`${chart.title}-${entry.name}`}
                        fill={
                          PIE_COLOR_SEQUENCE[
                            (chartIndex * 2 + index) % PIE_COLOR_SEQUENCE.length
                          ]
                        }
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="w-full space-y-1 text-sm text-[color-mix(in srgb, var(--foreground) 78%, transparent)]">
              {chart.data.map((slice, index) => (
                <li
                  key={`${chart.title}-${slice.name}`}
                  className="flex items-center justify-between gap-3 border border-[color-mix(in srgb, var(--foreground) 12%, transparent)] rounded-xl px-3 py-1.5 bg-[color-mix(in srgb, white 97%, var(--background))]"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{
                        backgroundColor:
                          PIE_COLOR_SEQUENCE[
                            (chartIndex * 2 + index) % PIE_COLOR_SEQUENCE.length
                          ],
                      }}
                    />
                    {slice.name}
                  </span>
                  <span>{((slice.value / total) * 100).toFixed(2)}%</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export function ValuationToRevenueChart() {
  const data: BarDatum[] = [
    { exit: "£40m", arr: 1.1429, mrr: 0.0952 },
    { exit: "£80m", arr: 2.2857, mrr: 0.1905 },
    { exit: "£120m", arr: 3.4286, mrr: 0.2857 },
  ];

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart
        data={data}
        margin={{ top: 24, right: 24, bottom: 16, left: 24 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={chartPalette.grid} />
        <XAxis
          dataKey="exit"
          fontSize={FONT_SIZE}
          tickLine={false}
          stroke={chartPalette.mutedAxis}
        />
        <YAxis
          tickFormatter={(value: number) => `£${value.toFixed(1)}m`}
          fontSize={FONT_SIZE}
          tickLine={false}
          stroke={chartPalette.mutedAxis}
        />
        <Tooltip
          formatter={(rawValue, rawName) => {
            const numericValue =
              typeof rawValue === "number" ? rawValue : Number(rawValue ?? 0);
            const label =
              rawName === "arr"
                ? "ARR"
                : rawName === "mrr"
                  ? "MRR"
                  : typeof rawName === "string"
                    ? rawName
                    : "";
            return [`£${numericValue.toFixed(3)}m`, label];
          }}
          wrapperStyle={{ outline: "none" }}
        />
        <Legend verticalAlign="bottom" height={36} />
        <Bar
          dataKey="arr"
          name="Implied ARR"
          fill={chartPalette.primary}
          radius={[6, 6, 0, 0]}
        />
        <Bar
          dataKey="mrr"
          name="Implied MRR"
          fill={chartPalette.secondary}
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function CDEquityProceedsChart() {
  const data: BarDatum[] = [
    { exit: "£40m", conservative: 1.73, mild: 2.43 },
    { exit: "£80m", conservative: 3.47, mild: 4.85 },
    { exit: "£120m", conservative: 5.2, mild: 7.28 },
  ];

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart
        data={data}
        margin={{ top: 24, right: 24, bottom: 16, left: 24 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={chartPalette.grid} />
        <XAxis
          dataKey="exit"
          fontSize={FONT_SIZE}
          tickLine={false}
          stroke={chartPalette.mutedAxis}
        />
        <YAxis
          tickFormatter={(value: number) => `£${value.toFixed(1)}m`}
          fontSize={FONT_SIZE}
          tickLine={false}
          stroke={chartPalette.mutedAxis}
        />
        <Tooltip
          formatter={(rawValue, rawName) => {
            const numericValue =
              typeof rawValue === "number" ? rawValue : Number(rawValue ?? 0);
            const label =
              typeof rawName === "string"
                ? rawName
                : rawName != null
                  ? String(rawName)
                  : "";
            return [currencyFormatter.format(numericValue * 1_000_000), label];
          }}
          wrapperStyle={{ outline: "none" }}
        />
        <Legend verticalAlign="bottom" height={36} />
        <Bar
          dataKey="conservative"
          name="CD @ 4.33% (≈50% dil)"
          fill="#94a3b8"
          radius={[6, 6, 0, 0]}
        />
        <Bar
          dataKey="mild"
          name="CD @ 6.07% (≈30% dil)"
          fill={chartPalette.primary}
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function CDEquityMultiplesChart() {
  const data: BarDatum[] = [
    { exit: "£40m", dil50: 86.7, dil30: 121.3 },
    { exit: "£80m", dil50: 173.3, dil30: 242.7 },
    { exit: "£120m", dil50: 260, dil30: 364 },
  ];

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart
        data={data}
        margin={{ top: 24, right: 24, bottom: 16, left: 24 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={chartPalette.grid} />
        <XAxis
          dataKey="exit"
          fontSize={FONT_SIZE}
          tickLine={false}
          stroke={chartPalette.mutedAxis}
        />
        <YAxis
          tickFormatter={(value: number) => `${value.toFixed(0)}×`}
          fontSize={FONT_SIZE}
          tickLine={false}
          stroke={chartPalette.mutedAxis}
        />
        <Tooltip
          formatter={(rawValue, rawName) => {
            const numericValue =
              typeof rawValue === "number" ? rawValue : Number(rawValue ?? 0);
            const label =
              typeof rawName === "string"
                ? rawName
                : rawName != null
                  ? String(rawName)
                  : "";
            return [multipleFormatter(numericValue), label];
          }}
          wrapperStyle={{ outline: "none" }}
        />
        <Legend verticalAlign="bottom" height={36} />
        <Bar
          dataKey="dil50"
          name="≈50% dilution"
          fill="#94a3b8"
          radius={[6, 6, 0, 0]}
        />
        <Bar
          dataKey="dil30"
          name="≈30% dilution"
          fill={chartPalette.secondary}
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function PersonalEquityProceedsChart() {
  const data: BarDatum[] = [
    { exit: "£40m", dil50: 0.33, dil30: 0.47 },
    { exit: "£80m", dil50: 0.67, dil30: 0.93 },
    { exit: "£120m", dil50: 1.0, dil30: 1.4 },
  ];

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart
        data={data}
        margin={{ top: 24, right: 24, bottom: 16, left: 24 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={chartPalette.grid} />
        <XAxis
          dataKey="exit"
          fontSize={FONT_SIZE}
          tickLine={false}
          stroke={chartPalette.mutedAxis}
        />
        <YAxis
          tickFormatter={(value: number) => `£${value.toFixed(2)}m`}
          fontSize={FONT_SIZE}
          tickLine={false}
          stroke={chartPalette.mutedAxis}
        />
        <Tooltip
          formatter={(rawValue, rawName) => {
            const numericValue =
              typeof rawValue === "number" ? rawValue : Number(rawValue ?? 0);
            const label =
              typeof rawName === "string"
                ? rawName
                : rawName != null
                  ? String(rawName)
                  : "";
            return [currencyFormatter.format(numericValue * 1_000_000), label];
          }}
          wrapperStyle={{ outline: "none" }}
        />
        <Legend verticalAlign="bottom" height={36} />
        <Bar
          dataKey="dil50"
          name="≈50% dilution"
          fill="#94a3b8"
          radius={[6, 6, 0, 0]}
        />
        <Bar
          dataKey="dil30"
          name="≈30% dilution"
          fill={chartPalette.primary}
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function PersonalMultiplesChart() {
  const data: BarDatum[] = [
    { exit: "£40m", dil50: 66.7, dil30: 93.3 },
    { exit: "£80m", dil50: 133.3, dil30: 186.7 },
    { exit: "£120m", dil50: 200, dil30: 280 },
  ];

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart
        data={data}
        margin={{ top: 24, right: 24, bottom: 16, left: 24 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={chartPalette.grid} />
        <XAxis
          dataKey="exit"
          fontSize={FONT_SIZE}
          tickLine={false}
          stroke={chartPalette.mutedAxis}
        />
        <YAxis
          tickFormatter={(value: number) => `${value.toFixed(0)}×`}
          fontSize={FONT_SIZE}
          tickLine={false}
          stroke={chartPalette.mutedAxis}
        />
        <Tooltip
          formatter={(rawValue, rawName) => {
            const numericValue =
              typeof rawValue === "number" ? rawValue : Number(rawValue ?? 0);
            const label =
              typeof rawName === "string"
                ? rawName
                : rawName != null
                  ? String(rawName)
                  : "";
            return [multipleFormatter(numericValue), label];
          }}
          wrapperStyle={{ outline: "none" }}
        />
        <Legend verticalAlign="bottom" height={36} />
        <Bar
          dataKey="dil50"
          name="≈50% dilution"
          fill="#94a3b8"
          radius={[6, 6, 0, 0]}
        />
        <Bar
          dataKey="dil30"
          name="≈30% dilution"
          fill={chartPalette.secondary}
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function UpsideFundingTimeline() {
  const stages = [
    { label: "Pre-seed", detail: "Fund MVP build + early usage." },
    { label: "Seed", detail: "Prove repeatability; expand team." },
    { label: "Series A", detail: "Scale GTM and platform reliability." },
    { label: "Series B+", detail: "Lean into category leadership." },
    {
      label: "Secondary (optional)",
      detail: "Offer early holders light liquidity.",
    },
    { label: "Exit", detail: "M&A or IPO — equity becomes cash." },
  ];

  return (
    <div className="relative mx-auto flex w-full max-w-4xl flex-col gap-4">
      <div className="absolute left-5 top-0 bottom-0 w-px bg-[color-mix(in srgb, var(--foreground) 15%, transparent)]" />
      {stages.map((stage, index) => (
        <div
          key={stage.label}
          className="relative flex items-start gap-4 pl-10"
        >
          <span className="absolute left-3 top-1.5 h-5 w-5 rounded-full border-2 border-[var(--accent)] bg-[color-mix(in srgb, white 92%, var(--background))]" />
          <div className="flex flex-col gap-1 rounded-xl bg-[color-mix(in srgb, white 96%, var(--background))] p-4 shadow-[0_6px_20px_-12px_rgb(0_0_0/0.25)]">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[color-mix(in srgb, var(--accent) 60%, black)]">
              {index + 1}. {stage.label}
            </p>
            <p className="text-sm text-[color-mix(in srgb, var(--foreground) 80%, transparent)]">
              {stage.detail}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function VentureCashFlowWaterfall() {
  const rows = [
    { label: "Revenue", value: "£100", accent: true },
    { label: "COGS (APIs, LLM, data)", value: "£30" },
    { label: "People (engineering, support)", value: "£35" },
    { label: "Security & infrastructure", value: "£15" },
    { label: "GTM & marketing", value: "£12" },
    { label: "Operating buffer", value: "£8" },
  ];

  return (
    <div className="grid gap-3">
      {rows.map((row, index) => (
        <div
          key={row.label}
          className="flex items-center justify-between rounded-2xl border border-[color-mix(in srgb, var(--foreground) 12%, transparent)] bg-[color-mix(in srgb, white 96%, var(--background))] px-4 py-3"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[color-mix(in srgb, var(--accent) 20%, transparent)] text-xs font-semibold text-[color-mix(in srgb, var(--accent) 80%, black)]">
              {index + 1}
            </span>
            <span className="text-sm font-medium text-[var(--foreground)]">
              {row.label}
            </span>
          </div>
          <span
            className={`text-sm font-semibold ${
              row.accent
                ? "text-[color-mix(in srgb, var(--accent) 80%, black)]"
                : "text-[color-mix(in srgb, var(--foreground) 80%, transparent)]"
            }`}
          >
            {row.value}
          </span>
        </div>
      ))}
      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[color-mix(in srgb, var(--foreground) 55%, transparent)]">
        Cash is reinvested; founder upside arrives at exit or small secondary,
        not monthly profit.
      </p>
    </div>
  );
}

export function ChannelEquitySplitPanel() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-3xl border border-[color-mix(in srgb, var(--accent) 22%, transparent)] bg-[color-mix(in srgb, var(--accent) 10%, transparent)] p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-[color-mix(in srgb, var(--accent) 70%, black)]">
          Channel cash (locked-in)
        </p>
        <p className="mt-2 text-lg font-semibold text-[color-mix(in srgb, var(--accent) 80%, black)]">
          100% of profit on CD-sourced customers, forever.
        </p>
        <p className="mt-3 text-sm text-[color-mix(in srgb, var(--accent) 75%, black)]">
          Simple five-line monthly reporting; no product or data burden on PPC
          teams.
        </p>
      </div>
      <div className="rounded-3xl border border-[color-mix(in srgb, var(--foreground) 18%, transparent)] bg-[color-mix(in srgb, white 96%, var(--background))] p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-[color-mix(in srgb, var(--foreground) 65%, transparent)]">
          Equity upside (variable)
        </p>
        <p className="mt-2 text-lg font-semibold text-[var(--foreground)]">
          2% warrant + 10% stake compounding through later rounds.
        </p>
        <p className="mt-3 text-sm text-[color-mix(in srgb, var(--foreground) 80%, transparent)]">
          Dilution trims %, but higher valuations grow total value — on top of
          channel profit.
        </p>
      </div>
    </div>
  );
}

export function ValuationMultipleMatrix() {
  const rows = [
    {
      band: "10× (base)",
      vals: [
        { exit: "£40m", arr: 4.0, mrr: 0.333 },
        { exit: "£80m", arr: 8.0, mrr: 0.667 },
        { exit: "£120m", arr: 12.0, mrr: 1.0 },
      ],
    },
    {
      band: "20× (ambitious)",
      vals: [
        { exit: "£40m", arr: 2.0, mrr: 0.167 },
        { exit: "£80m", arr: 4.0, mrr: 0.333 },
        { exit: "£120m", arr: 6.0, mrr: 0.5 },
      ],
    },
    {
      band: "35× (peer-stretch)",
      vals: [
        { exit: "£40m", arr: 1.14, mrr: 0.095 },
        { exit: "£80m", arr: 2.29, mrr: 0.191 },
        { exit: "£120m", arr: 3.43, mrr: 0.286 },
      ],
    },
  ];

  return (
    <div className="overflow-hidden rounded-3xl border border-[color-mix(in srgb, var(--foreground) 12%, transparent)]">
      <div className="grid grid-cols-[1.2fr_repeat(3,1fr)] bg-[color-mix(in srgb, white 96%, var(--background))] px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[color-mix(in srgb, var(--foreground) 70%, transparent)]">
        <span>Multiple band</span>
        <span>£40m exit</span>
        <span>£80m exit</span>
        <span>£120m exit</span>
      </div>
      <div className="divide-y divide-[color-mix(in srgb, var(--foreground) 12%, transparent)] bg-[color-mix(in srgb, white 98%, var(--background))]">
        {rows.map((row) => (
          <div
            key={row.band}
            className="grid grid-cols-[1.2fr_repeat(3,1fr)] gap-4 px-4 py-4 text-sm text-[color-mix(in srgb, var(--foreground) 85%, transparent)]"
          >
            <span className="font-semibold text-[var(--foreground)]">
              {row.band}
            </span>
            {row.vals.map((val) => (
              <span key={`${row.band}-${val.exit}`} className="flex flex-col">
                <span className="font-medium text-[var(--foreground)]">
                  ARR £{val.arr.toFixed(2)}m
                </span>
                <span className="text-xs uppercase tracking-[0.15em] text-[color-mix(in srgb, var(--foreground) 65%, transparent)]">
                  MRR £{(val.mrr * 1000).toFixed(0)}k
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function VentureRoundStaircase() {
  const data = [
    { stage: "Pre-seed", value: 1 },
    { stage: "Seed", value: 2 },
    { stage: "Series A/B", value: 3 },
    { stage: "Exit", value: 4 },
  ];

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart
        data={data}
        margin={{ top: 24, right: 24, bottom: 16, left: 24 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={chartPalette.grid} />
        <XAxis
          dataKey="stage"
          tickLine={false}
          stroke={chartPalette.mutedAxis}
          fontSize={FONT_SIZE}
        />
        <YAxis hide domain={[0, 4.5]} />
        <Bar
          dataKey="value"
          fill={chartPalette.primary}
          radius={[12, 12, 0, 0]}
          maxBarSize={80}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function InstrumentsComparisonTable() {
  const rows = [
    {
      instrument: "SAFE",
      whenPriced: "Converts later (cap/discount)",
      interest: "None",
      why: "Fast, standard paperwork; VC-friendly.",
    },
    {
      instrument: "ASA",
      whenPriced: "Converts by long-stop date (≤6 months for SEIS/EIS)",
      interest: "Typically none",
      why: "UK compliant; keeps SEIS/EIS eligibility clean.",
    },
    {
      instrument: "Priced round",
      whenPriced: "Shares issued now",
      interest: "None",
      why: "Valuation set today; good when docs + milestones ready.",
    },
  ];

  return (
    <div className="grid overflow-hidden rounded-3xl border border-[color-mix(in srgb, var(--foreground) 12%, transparent)]">
      <div className="grid grid-cols-[1.1fr_1fr_1fr_1.5fr] bg-[color-mix(in srgb, white 96%, var(--background))] px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[color-mix(in srgb, var(--foreground) 70%, transparent)]">
        <span>Instrument</span>
        <span>When priced?</span>
        <span>Interest?</span>
        <span>Why use it?</span>
      </div>
      <div className="divide-y divide-[color-mix(in srgb, var(--foreground) 12%, transparent)] bg-[color-mix(in srgb, white 98%, var(--background))]">
        {rows.map((row) => (
          <div
            key={row.instrument}
            className="grid grid-cols-[1.1fr_1fr_1fr_1.5fr] gap-4 px-4 py-4 text-sm text-[color-mix(in srgb, var(--foreground) 85%, transparent)]"
          >
            <span className="font-semibold text-[var(--foreground)]">
              {row.instrument}
            </span>
            <span>{row.whenPriced}</span>
            <span>{row.interest}</span>
            <span>{row.why}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CashEquityVenn() {
  return (
    <div className="relative mx-auto flex h-[20rem] w-full max-w-3xl items-center justify-center px-6">
      <div
        className="absolute h-72 w-72 rounded-full bg-[color-mix(in srgb, var(--accent) 22%, transparent)] blur-3xl"
        aria-hidden
      />
      <div className="relative flex w-full max-w-2xl items-center justify-center">
        <div className="relative z-10 flex h-52 w-52 -translate-x-8 items-center justify-center rounded-full border border-[color-mix(in srgb, var(--accent) 35%, transparent)] bg-[color-mix(in srgb, var(--accent) 18%, var(--background))] p-6 text-center text-[color-mix(in srgb, var(--accent) 80%, black)] sm:-translate-x-12 md:-translate-x-16">
          <p className="font-semibold uppercase tracking-[0.2em] text-[color-mix(in srgb, var(--accent) 80%, black)]">
            Cash now
          </p>
          <p className="mt-3 text-sm">100% of profit on CD-sourced customers</p>
        </div>
        <div className="relative z-10 flex h-52 w-52 translate-x-8 items-center justify-center rounded-full border border-[color-mix(in srgb, var(--foreground) 25%, transparent)] bg-[color-mix(in srgb, var(--foreground) 12%, var(--background))] p-6 text-center text-[color-mix(in srgb, var(--foreground) 75%, white)] sm:translate-x-12 md:translate-x-16">
          <p className="font-semibold uppercase tracking-[0.2em] text-[color-mix(in srgb, var(--foreground) 75%, white)]">
            Equity later
          </p>
          <p className="mt-3 text-sm">2% warrant + £20k pre-seed stake</p>
        </div>
      </div>
      <div className="absolute left-1/2 top-1/2 w-48 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-[color-mix(in srgb, var(--accent) 20%, white 18%)] p-4 text-center shadow-lg">
        <p className="text-xs uppercase tracking-[0.25em] text-[color-mix(in srgb, var(--foreground) 65%, transparent)]">
          Combined
        </p>
        <p className="mt-2 text-sm text-[color-mix(in srgb, var(--foreground) 88%, transparent)]">
          Monthly profit + venture upside aligned to CD
        </p>
      </div>
    </div>
  );
}

export function LiquidationPreferenceIllustration() {
  const scenarios = [
    {
      title: "Small exit (£5m)",
      subtitle: "Preference matters",
      preference: 1.5,
      proRata: 3.5,
    },
    {
      title: "Big exit (£50m)",
      subtitle: "Pro-rata dominates",
      preference: 1.5,
      proRata: 48.5,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {scenarios.map((scenario) => {
        const total = scenario.preference + scenario.proRata;
        return (
          <div
            key={scenario.title}
            className="rounded-3xl border border-[color-mix(in srgb, var(--foreground) 12%, transparent)] bg-[color-mix(in srgb, white 96%, var(--background))] p-5"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[color-mix(in srgb, var(--accent) 60%, white)]">
              {scenario.title}
            </p>
            <p className="text-sm font-semibold text-[color-mix(in srgb, var(--foreground) 85%, transparent)]">
              {scenario.subtitle}
            </p>
            <div className="mt-4 flex h-10 overflow-hidden rounded-full border border-[color-mix(in srgb, var(--foreground) 15%, transparent)]">
              <div
                className="flex items-center justify-center px-3 text-xs font-semibold text-white"
                style={{
                  width: `${(scenario.preference / total) * 100}%`,
                  backgroundColor: chartPalette.primary,
                }}
              >
                1× preference
              </div>
              <div
                className="flex items-center justify-center px-3 text-xs font-semibold text-white"
                style={{
                  width: `${(scenario.proRata / total) * 100}%`,
                  backgroundColor: chartPalette.secondary,
                }}
              >
                Pro-rata
              </div>
            </div>
            <ul className="mt-4 space-y-1 text-sm text-[color-mix(in srgb, var(--foreground) 80%, transparent)]">
              <li>
                Preference:{" "}
                {currencyFormatter.format(scenario.preference * 1_000_000)}
              </li>
              <li>
                Common pro-rata:{" "}
                {currencyFormatter.format(scenario.proRata * 1_000_000)}
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export function WarrantTriggerTimeline() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <TimelineStep label="Now" />
          <TimelineConnector />
          <TimelineStep label="Trigger (priced round)" highlight />
          <TimelineConnector />
          <TimelineStep label="Later rounds / Exit" />
        </div>
        <div className="grid gap-3 text-sm text-[color-mix(in srgb, var(--foreground) 75%, transparent)] md:grid-cols-3">
          <p className="rounded-2xl border border-[color-mix(in srgb, var(--foreground) 12%, transparent)] bg-[color-mix(in srgb, white 98%, var(--background))] px-4 py-3 text-center">
            <strong>Now:</strong> CD contributes capital + time, no equity
            issued yet.
          </p>
          <p className="rounded-2xl border border-[color-mix(in srgb, var(--accent) 25%, transparent)] bg-[color-mix(in srgb, var(--accent) 12%, transparent)] px-4 py-3 text-center">
            <strong>Trigger:</strong> first priced round converts the warrant
            into shares.
          </p>
          <p className="rounded-2xl border border-[color-mix(in srgb, var(--foreground) 12%, transparent)] bg-[color-mix(in srgb, white 98%, var(--background))] px-4 py-3 text-center">
            <strong>Later:</strong> CD dilutes like everyone else alongside
            future rounds / exit.
          </p>
        </div>
      </div>
    </div>
  );
}

type TimelineStepProps = {
  label: string;
  highlight?: boolean;
};

function TimelineStep({ label, highlight = false }: TimelineStepProps) {
  return (
    <div
      className={`flex h-16 w-36 flex-col items-center justify-center rounded-2xl border text-center ${
        highlight
          ? "border-[color-mix(in srgb, var(--accent) 35%, transparent)] bg-[color-mix(in srgb, var(--accent) 12%, transparent)] text-[color-mix(in srgb, var(--accent) 80%, black)]"
          : "border-[color-mix(in srgb, var(--foreground) 15%, transparent)] bg-[color-mix(in srgb, white 96%, var(--background))] text-[color-mix(in srgb, var(--foreground) 80%, transparent)]"
      }`}
    >
      <span className="text-xs uppercase tracking-[0.18em]">{label}</span>
    </div>
  );
}

function TimelineConnector() {
  return (
    <div className="h-px w-16 bg-[color-mix(in srgb, var(--foreground) 25%, transparent)] md:w-24" />
  );
}

export function WarrantTermsSnapshot() {
  const cards = [
    {
      title: "Pre-money (trigger moment)",
      rows: [
        { label: "CD warrant", value: "2.00%" },
        { label: "Chatobserver + others", value: "98.00%" },
      ],
    },
    {
      title: "Post-money (example: £200k raise)",
      rows: [
        { label: "CD warrant", value: "≈1.67%" },
        { label: "Chatobserver + others + new investors", value: "≈98.33%" },
      ],
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {cards.map((card) => (
        <div
          key={card.title}
          className="flex flex-col gap-3 rounded-3xl border border-[color-mix(in srgb, var(--foreground) 12%, transparent)] bg-[color-mix(in srgb, white 97%, var(--background))] p-5"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-[color-mix(in srgb, var(--foreground) 65%, transparent)]">
            {card.title}
          </p>
          <ul className="space-y-2 text-sm text-[color-mix(in srgb, var(--foreground) 82%, transparent)]">
            {card.rows.map((row) => (
              <li
                key={`${card.title}-${row.label}`}
                className="flex items-center justify-between gap-3"
              >
                <span>{row.label}</span>
                <span className="font-semibold text-[var(--foreground)]">
                  {row.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function WarrantContributionMatrix() {
  const rows = [
    {
      left: "CD contributes",
      points: [
        "Initial working capital",
        "Leadership coordination & time",
        "Early ops support and trust",
      ],
    },
    {
      left: "CD receives",
      points: [
        "Perpetual channel profit on CD-sourced accounts",
        "2% success-only warrant at first priced round",
        "Right to participate in future rounds (e.g. 10% stake)",
      ],
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {rows.map((row) => (
        <div
          key={row.left}
          className="flex flex-col gap-3 rounded-3xl border border-[color-mix(in srgb, var(--foreground) 12%, transparent)] bg-[color-mix(in srgb, white 96%, var(--background))] p-5"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-[color-mix(in srgb, var(--accent) 55%, white)]">
            {row.left}
          </p>
          <ul className="list-disc pl-4 text-sm text-[color-mix(in srgb, var(--foreground) 80%, transparent)]">
            {row.points.map((point) => (
              <li key={`${row.left}-${point}`}>{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function WarrantUnitsExample() {
  const before = [
    { label: "CD warrant units", value: 2, color: chartPalette.primary },
    { label: "Others", value: 98, color: chartPalette.secondary },
  ];
  const after = [
    { label: "CD warrant units", value: 2, color: chartPalette.primary },
    {
      label: "New investors + others",
      value: 118,
      color: chartPalette.secondary,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <UnitsCard
        title="Before priced round (100 units)"
        data={before}
        total={100}
      />
      <UnitsCard
        title="After priced round (example: 120 units)"
        data={after}
        total={120}
      />
    </div>
  );
}

type UnitsCardProps = {
  title: string;
  data: { label: string; value: number; color: string }[];
  total: number;
};

function UnitsCard({ title, data, total }: UnitsCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-[color-mix(in srgb, var(--foreground) 12%, transparent)] bg-[color-mix(in srgb, white 97%, var(--background))] p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-[color-mix(in srgb, var(--foreground) 65%, transparent)]">
        {title}
      </p>
      <div className="h-10 w-full overflow-hidden rounded-full border border-[color-mix(in srgb, var(--foreground) 15%, transparent)]">
        <div className="flex h-full w-full">
          {data.map((segment) => (
            <div
              key={`${title}-${segment.label}`}
              className="flex items-center justify-center text-xs font-semibold text-white"
              style={{
                width: `${(segment.value / total) * 100}%`,
                backgroundColor: segment.color,
              }}
            >
              {segment.value} units
            </div>
          ))}
        </div>
      </div>
      <ul className="space-y-1 text-sm text-[color-mix(in srgb, var(--foreground) 78%, transparent)]">
        {data.map((segment) => (
          <li key={`${title}-${segment.label}-legend`}>
            {segment.label}: {((segment.value / total) * 100).toFixed(2)}%
          </li>
        ))}
      </ul>
    </div>
  );
}

const fundingTimelineData = [
  {
    company: "Profound",
    rounds: [
      { label: "Seed", amount: "$3.5M", date: "Aug 13 2024" },
      { label: "Series A", amount: "$20M", date: "Jun 19 2025" },
      { label: "Series B", amount: "$35M", date: "Aug 12 2025" },
    ],
    sources: "TechCrunch · Adweek · PR Newswire",
  },
  {
    company: "Bluefish",
    rounds: [{ label: "Series A", amount: "$20M", date: "Aug 20 2025" }],
    sources: "PR Newswire",
  },
  {
    company: "Evertune",
    rounds: [
      { label: "Seed", amount: "$4M", date: "Oct 30 2024" },
      { label: "Series A", amount: "$15M", date: "Aug 12 2025" },
    ],
    sources: "Business Insider · GlobeNewswire",
  },
  {
    company: "Scrunch",
    rounds: [
      { label: "Seed", amount: "$4M", date: "Mar 4 2025" },
      { label: "Series A", amount: "$15M", date: "Jul 23 2025" },
    ],
    sources: "TechCrunch · The SaaS News",
  },
  {
    company: "Peec",
    rounds: [
      { label: "Pre-seed", amount: "€1.8M", date: "Apr 2025" },
      { label: "Seed", amount: "€5.2M", date: "Jul 2025" },
    ],
    sources: "Silicon Canals",
  },
  {
    company: "AthenaHQ",
    rounds: [{ label: "Seed", amount: "$2.2M", date: "Jun 18 2025" }],
    sources: "FinSMEs",
  },
  {
    company: "PromptWatch",
    rounds: [{ label: "Seed", amount: "€1.2M", date: "Sep 18 2025" }],
    sources: "Silicon Canals",
  },
];

const latestRoundBars = [
  { company: "Profound", value: 35, label: "Series B", display: "$35M" },
  { company: "Bluefish", value: 20, label: "Series A", display: "$20M" },
  { company: "Evertune", value: 15, label: "Series A", display: "$15M" },
  { company: "Scrunch", value: 15, label: "Series A", display: "$15M" },
  { company: "Peec", value: 5.6, label: "Seed (EUR)", display: "€5.2M" },
  { company: "AthenaHQ", value: 2.2, label: "Seed", display: "$2.2M" },
  { company: "PromptWatch", value: 1.3, label: "Seed (EUR)", display: "€1.2M" },
];

const velocityData = [
  {
    company: "Profound",
    checkpoints: [
      { label: "Seed", detail: "Aug 2024" },
      { label: "Series A", detail: "Jun 2025 (~10 months)" },
      { label: "Series B", detail: "Aug 2025 (~8 weeks later)" },
    ],
    sources: "TechCrunch · Adweek · PR Newswire",
  },
  {
    company: "Bluefish",
    checkpoints: [
      { label: "Launch", detail: "Late 2024" },
      { label: "Series A", detail: "Aug 2025 (~12 months)" },
      { label: "Total", detail: "$24M raised within first year" },
    ],
    sources: "PR Newswire",
  },
  {
    company: "Peec",
    checkpoints: [
      { label: "Pre-seed", detail: "Apr 2025" },
      { label: "Seed", detail: "Jul 2025 (~5 months)" },
      { label: "Valuation", detail: "Reports cite ~$30M at ~6 months" },
    ],
    sources: "Silicon Canals · Inc.com",
  },
];

const investorLeads = [
  {
    company: "Profound",
    leads: "Kleiner Perkins (A), Sequoia (B), NVentures, Khosla, SV Angel",
  },
  { company: "Bluefish", leads: "NEA, Salesforce Ventures" },
  { company: "Evertune", leads: "Felicis, Eniac, NextView" },
  { company: "Scrunch", leads: "Decibel, Mayfield" },
  {
    company: "Peec",
    leads: "20VC, Antler, Foreword, Identity.VC, Combination, S20",
  },
  { company: "AthenaHQ", leads: "YC, FCVC, Red Bike, Amino Capital" },
  { company: "PromptWatch", leads: "Arches Capital" },
];

const pricingSpread = [
  {
    company: "ZipTie.dev",
    range: "$69 – $159/mo",
    notes: "Public pricing page with trial tier",
    source: "ZipTie.dev",
  },
  {
    company: "Otterly",
    range: "$29 – $422/mo",
    notes: "Lite at $29, Standard ~$189 commonly cited",
    source: "Otterly",
  },
  {
    company: "RankScale",
    range: "Credit-based plans",
    notes: "Usage-based pricing for SME + enterprise",
    source: "RankScale.ai",
  },
];

const geographyData = [
  {
    region: "United States",
    companies: 5,
    label: "Profound, Bluefish, Evertune, Scrunch, Athena",
  },
  { region: "Europe", companies: 2, label: "Peec, PromptWatch" },
];

const boardMomentumPoints = [
  "Momentum is real: fast follow-ons and tier-one leads already in GEO/AEO.",
  "Premium marks happen: outliers like Peec show peer-stretch multiples.",
  "Our structure captures upside: 100% channel profit + 2% warrant + £20k stake with product ops outside CD.",
  "Action: paper the spin-out now to approach investors while the category is hot.",
];

const fundingAppendixRows = [
  {
    company: "Profound",
    rounds: "Seed Aug 13 2024 — $3.5M",
    amount: "$3.5M",
    notes: "TechCrunch, Adweek",
  },
  {
    company: "Profound",
    rounds: "Series A Jun 19 2025 — $20M",
    amount: "$20M",
    notes: "PR Newswire",
  },
  {
    company: "Profound",
    rounds: "Series B Aug 12 2025 — $35M",
    amount: "$35M",
    notes: "PR Newswire",
  },
  {
    company: "Bluefish",
    rounds: "Series A Aug 20 2025 — $20M",
    amount: "$20M",
    notes: "PR Newswire",
  },
  {
    company: "Evertune",
    rounds: "Seed Oct 30 2024 — $4M",
    amount: "$4M",
    notes: "Business Insider",
  },
  {
    company: "Evertune",
    rounds: "Series A Aug 12 2025 — $15M",
    amount: "$15M",
    notes: "GlobeNewswire",
  },
  {
    company: "Scrunch",
    rounds: "Seed Mar 4 2025 — $4M",
    amount: "$4M",
    notes: "TechCrunch",
  },
  {
    company: "Scrunch",
    rounds: "Series A Jul 23 2025 — $15M",
    amount: "$15M",
    notes: "The SaaS News",
  },
  {
    company: "Peec",
    rounds: "Pre-seed Apr 2025 — €1.8M",
    amount: "€1.8M",
    notes: "Silicon Canals",
  },
  {
    company: "Peec",
    rounds: "Seed Jul 2025 — €5.2M",
    amount: "€5.2M",
    notes: "Silicon Canals",
  },
  {
    company: "Peec",
    rounds: "Valuation (press) ~6 months",
    amount: "~$30M",
    notes: "Inc.com",
  },
  {
    company: "AthenaHQ",
    rounds: "Seed Jun 18 2025 — $2.2M",
    amount: "$2.2M",
    notes: "FinSMEs",
  },
  {
    company: "PromptWatch",
    rounds: "Seed Sep 18 2025 — €1.2M",
    amount: "€1.2M",
    notes: "Silicon Canals",
  },
];

export function FundingMomentumTimeline() {
  return (
    <div className="flex flex-col gap-8">
      {fundingTimelineData.map((entry) => (
        <div key={entry.company} className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <h4 className="text-lg font-semibold text-[var(--foreground)]">
              {entry.company}
            </h4>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {entry.rounds.map((round, index) => (
              <div
                key={`${entry.company}-${round.label}`}
                className="flex items-center gap-3"
              >
                <div className="rounded-full border border-[color-mix(in srgb, var(--foreground) 20%, transparent)] bg-[color-mix(in srgb, white 96%, var(--background))] px-4 py-2 text-sm font-medium">
                  <span className="uppercase tracking-[0.2em] text-xs text-[color-mix(in srgb, var(--foreground) 65%, transparent)]">
                    {round.label}
                  </span>
                  <div className="text-sm text-[var(--foreground)]">
                    {round.amount} · {round.date}
                  </div>
                </div>
                {index < entry.rounds.length - 1 ? (
                  <div
                    className="h-px w-8 bg-[color-mix(in srgb, var(--foreground) 20%, transparent)] md:w-12"
                    aria-hidden
                  />
                ) : null}
              </div>
            ))}
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-[color-mix(in srgb, var(--foreground) 55%, transparent)]">
            Sources: {entry.sources}
          </p>
        </div>
      ))}
    </div>
  );
}

export function LatestRoundsBarChart() {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart
        data={latestRoundBars}
        margin={{ top: 24, right: 32, bottom: 24, left: 24 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={chartPalette.grid} />
        <XAxis
          dataKey="company"
          fontSize={FONT_SIZE}
          tickLine={false}
          stroke={chartPalette.mutedAxis}
        />
        <YAxis
          tickFormatter={(value: number) => `${value.toFixed(1)}M`}
          fontSize={FONT_SIZE}
          tickLine={false}
          stroke={chartPalette.mutedAxis}
        />
        <Tooltip
          formatter={(rawValue, _name, entry) => {
            const payload = (
              entry as { payload?: (typeof latestRoundBars)[number] }
            )?.payload;
            const numericValue =
              typeof rawValue === "number" ? rawValue : Number(rawValue ?? 0);
            const display = payload
              ? `${payload.display}`
              : `$${numericValue.toFixed(1)}M`;
            const label = payload ? payload.label : "Latest round";
            return [display, label];
          }}
          wrapperStyle={{ outline: "none" }}
        />
        <Legend
          verticalAlign="bottom"
          align="left"
          iconType="circle"
          height={36}
        />
        <Bar
          dataKey="value"
          name="Approx. round size (USD millions)"
          fill={chartPalette.primary}
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function FundingVelocityLadder() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {velocityData.map((entry) => (
        <div
          key={entry.company}
          className="flex flex-col gap-3 rounded-3xl border border-[color-mix(in srgb, var(--foreground) 12%, transparent)] bg-[color-mix(in srgb, white 96%, var(--background))] p-5"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-[color-mix(in srgb, var(--foreground) 65%, transparent)]">
            {entry.company}
          </p>
          <div className="flex flex-col gap-2">
            {entry.checkpoints.map((point) => (
              <div
                key={`${entry.company}-${point.label}`}
                className="flex items-start gap-3"
              >
                <div
                  className="mt-1 h-2 w-2 rounded-full bg-[var(--accent)]"
                  aria-hidden
                />
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">
                    {point.label}
                  </p>
                  <p className="text-sm text-[color-mix(in srgb, var(--foreground) 75%, transparent)]">
                    {point.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-[color-mix(in srgb, var(--foreground) 55%, transparent)]">
            Sources: {entry.sources}
          </p>
        </div>
      ))}
    </div>
  );
}

export function InvestorLeadTable() {
  return (
    <div className="overflow-hidden rounded-3xl border border-[color-mix(in srgb, var(--foreground) 12%, transparent)]">
      <div className="grid grid-cols-[1.2fr_2fr] bg-[color-mix(in srgb, white 96%, var(--background))] px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[color-mix(in srgb, var(--foreground) 70%, transparent)]">
        <span>Company</span>
        <span>Lead investors / notable participation</span>
      </div>
      <div className="divide-y divide-[color-mix(in srgb, var(--foreground) 12%, transparent)] bg-[color-mix(in srgb, white 98%, var(--background))]">
        {investorLeads.map((row) => (
          <div
            key={row.company}
            className="grid grid-cols-[1.2fr_2fr] gap-4 px-4 py-4 text-sm text-[color-mix(in srgb, var(--foreground) 82%, transparent)]"
          >
            <span className="font-semibold text-[var(--foreground)]">
              {row.company}
            </span>
            <span>{row.leads}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ValuationOutlierHighlight() {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-[color-mix(in srgb, var(--accent) 22%, transparent)] bg-[color-mix(in srgb, var(--accent) 12%, transparent)] p-6">
      <p className="text-xs uppercase tracking-[0.2em] text-[color-mix(in srgb, var(--accent) 70%, black)]">
        Peec valuation snapshot
      </p>
      <p className="text-lg font-semibold text-[color-mix(in srgb, var(--foreground) 95%, transparent)]">
        Press reports cite ~$30M valuation within ~6 months, with €650k ARR, an
        outlier &gt;30× trailing ARR.
      </p>
      <p className="text-sm text-[color-mix(in srgb, var(--foreground) 85%, transparent)]">
        Treat as peer-stretch, not base case, but it shows the ceiling investors
        are already paying for GEO/AEO leaders.
      </p>
      <div className="grid gap-2 rounded-2xl border border-[color-mix(in srgb, var(--accent) 25%, transparent)] bg-[color-mix(in srgb, white 96%, transparent)] p-4 text-sm">
        <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr] gap-3 text-xs uppercase tracking-[0.15em] text-[color-mix(in srgb, var(--foreground) 60%, transparent)]">
          <span>Band</span>
          <span>£40m exit</span>
          <span>£80m exit</span>
          <span>£120m exit</span>
        </div>
        {[
          {
            band: "10× (base)",
            arr: [4.0, 8.0, 12.0],
          },
          {
            band: "20× (ambitious)",
            arr: [2.0, 4.0, 6.0],
          },
          {
            band: "30–35× (peer-stretch)",
            arr: [1.14, 2.29, 3.43],
          },
        ].map((row) => (
          <div
            key={row.band}
            className="grid grid-cols-[1.2fr_1fr_1fr_1fr] gap-3"
          >
            <span className="font-semibold text-[var(--foreground)]">
              {row.band}
            </span>
            {row.arr.map((val, idx) => (
              <span
                key={`${row.band}-${idx}`}
                className="text-[color-mix(in srgb, var(--foreground) 80%, transparent)]"
              >
                ARR £{val.toFixed(2)}m
              </span>
            ))}
          </div>
        ))}
      </div>
      <p className="text-xs uppercase tracking-[0.2em] text-[color-mix(in srgb, var(--foreground) 60%, transparent)]">
        Sources: Silicon Canals · Inc.com
      </p>
    </div>
  );
}

export function PricingSpreadCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {pricingSpread.map((row) => (
        <div
          key={row.company}
          className="flex flex-col gap-3 rounded-3xl border border-[color-mix(in srgb, var(--foreground) 12%, transparent)] bg-[color-mix(in srgb, white 96%, var(--background))] p-5"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-[color-mix(in srgb, var(--foreground) 65%, transparent)]">
            {row.company}
          </p>
          <p className="text-lg font-semibold text-[var(--foreground)]">
            {row.range}
          </p>
          <p className="text-sm text-[color-mix(in srgb, var(--foreground) 80%, transparent)]">
            {row.notes}
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-[color-mix(in srgb, var(--foreground) 55%, transparent)]">
            Source: {row.source}
          </p>
        </div>
      ))}
    </div>
  );
}

export function GeographyFundingColumns() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={geographyData}
        margin={{ top: 24, right: 24, bottom: 16, left: 24 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={chartPalette.grid} />
        <XAxis
          dataKey="region"
          fontSize={FONT_SIZE}
          tickLine={false}
          stroke={chartPalette.mutedAxis}
        />
        <YAxis
          allowDecimals={false}
          tickFormatter={(value: number) => `${value}`}
          fontSize={FONT_SIZE}
          tickLine={false}
          stroke={chartPalette.mutedAxis}
        />
        <Tooltip
          formatter={(rawValue, _name, entry) => {
            const payload = (
              entry as { payload?: (typeof geographyData)[number] }
            )?.payload;
            const numericValue =
              typeof rawValue === "number" ? rawValue : Number(rawValue ?? 0);
            return [`${numericValue} disclosed rounds`, payload?.label ?? ""];
          }}
          wrapperStyle={{ outline: "none" }}
        />
        <Legend verticalAlign="bottom" height={32} />
        <Bar
          dataKey="companies"
          name="Disclosed rounds"
          fill={chartPalette.primary}
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function BoardMomentumConclusion() {
  return (
    <div className="grid gap-3">
      {boardMomentumPoints.map((point, index) => (
        <div
          key={point}
          className="flex items-start gap-3 rounded-2xl border border-[color-mix(in srgb, var(--foreground) 12%, transparent)] bg-[color-mix(in srgb, white 96%, var(--background))] px-4 py-3"
        >
          <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[color-mix(in srgb, var(--accent) 18%, transparent)] text-xs font-semibold text-[color-mix(in srgb, var(--accent) 80%, black)]">
            {index + 1}
          </span>
          <p className="text-sm text-[color-mix(in srgb, var(--foreground) 85%, transparent)]">
            {point}
          </p>
        </div>
      ))}
    </div>
  );
}

export function FundingDataAppendixTable() {
  return (
    <div className="overflow-hidden rounded-3xl border border-[color-mix(in srgb, var(--foreground) 12%, transparent)]">
      <div className="grid grid-cols-[1.2fr_1.6fr_1fr_1.2fr] bg-[color-mix(in srgb, white 96%, var(--background))] px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[color-mix(in srgb, var(--foreground) 70%, transparent)]">
        <span>Company</span>
        <span>Round &amp; date</span>
        <span>Amount</span>
        <span>Sources / notes</span>
      </div>
      <div className="divide-y divide-[color-mix(in srgb, var(--foreground) 12%, transparent)] bg-[color-mix(in srgb, white 98%, var(--background))]">
        {fundingAppendixRows.map((row, index) => (
          <div
            key={`${row.company}-${index}`}
            className="grid grid-cols-[1.2fr_1.6fr_1fr_1.2fr] gap-3 px-4 py-3 text-sm text-[color-mix(in srgb, var(--foreground) 82%, transparent)]"
          >
            <span className="font-semibold text-[var(--foreground)]">
              {row.company}
            </span>
            <span>{row.rounds}</span>
            <span>{row.amount}</span>
            <span>{row.notes}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
