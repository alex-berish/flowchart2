import type {
  ComponentProps,
  CSSProperties,
  ReactElement,
  ReactNode,
} from "react";
import { Children, cloneElement, isValidElement } from "react";

import { LogoImage } from "@/components/media/logo-image";
import { FundingMomentumChart } from "@/components/slides/orientation/funding-momentum-chart";
import { ProfitDistributionComparisonChart } from "@/components/slides/orientation/profit-distribution-comparison-chart";
import {
  BoardMomentumConclusion,
  CashEquityVenn,
  CDEquityMultiplesChart,
  CDEquityProceedsChart,
  ChannelEquitySplitPanel,
  DilutionScenarioPies,
  FundingDataAppendixTable,
  FundingMomentumTimeline,
  FundingVelocityLadder,
  GeographyFundingColumns,
  InstrumentsComparisonTable,
  InvestorLeadTable,
  LatestRoundsBarChart,
  LiquidationPreferenceIllustration,
  PersonalEquityProceedsChart,
  PersonalMultiplesChart,
  PreSeedOwnershipPie,
  PricingSpreadCards,
  UpsideFundingTimeline,
  ValuationMultipleMatrix,
  ValuationOutlierHighlight,
  ValuationToRevenueChart,
  VentureCashFlowWaterfall,
  VentureRoundStaircase,
  WarrantContributionMatrix,
  WarrantTermsSnapshot,
  WarrantTriggerTimeline,
  WarrantUnitsExample,
} from "@/components/slides/upside/charts";

import { BarChartBlock, LineChartBlock } from "./chart-blocks";
import { ChartFrame } from "./chart-frame";
import { cx } from "./utils";

const typeScale = {
  title: "var(--deck-title, 7rem)",
  heading: "var(--deck-heading, 3.25rem)",
  subhead: "var(--deck-subhead, 1.9rem)",
  body: "var(--deck-body, 1.2rem)",
  caption: "var(--deck-caption, 1rem)",
  footnote: "var(--deck-footnote, 0.75rem)",
  eyebrow: "var(--deck-eyebrow, 0.75rem)",
  kicker: "var(--deck-kicker, 1.125rem)",
  label: "var(--deck-label, 0.9rem)",
  button: "var(--deck-button, 1rem)",
} as const;

const lineHeights = {
  tight: "var(--deck-line-tight, 1.05)",
  snug: "var(--deck-line-snug, 1.3)",
  regular: "var(--deck-line-regular, 1.6)",
} as const;

type WithClassName<T> = T & { className?: string };

type HeadingProps = WithClassName<ComponentProps<"h1">>;

type SlideHeaderProps = {
  eyebrow?: string;
  align?: "left" | "center";
  kicker?: string;
  children: ReactNode;
  className?: string;
};

type SlideSubheadProps = WithClassName<ComponentProps<"div">>;

type SlideBodyProps = WithClassName<ComponentProps<"div">>;

type BulletListProps = WithClassName<ComponentProps<"ul">>;

type FootnoteProps = WithClassName<ComponentProps<"div">>;

type SidebarNoteProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

type ImageFrameProps = WithClassName<{ children: ReactNode }>;

type HighlightCalloutProps = WithClassName<{
  title?: string;
  children: ReactNode;
}>;

type FaqPageProps = WithClassName<{
  question: string;
  questionLabel?: string;
  answerLabel?: string;
  children: ReactNode;
}>;

export function SlideHeader({
  eyebrow,
  kicker,
  align = "left",
  children,
  className,
}: SlideHeaderProps) {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-left";
  const headingContent = Children.map(children, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      return (
        <span
          className="block text-[length:var(--deck-title,7rem)] leading-[var(--deck-line-tight,1.05)]"
          style={{
            fontSize: typeScale.title,
            lineHeight: lineHeights.tight,
          }}
        >
          {child}
        </span>
      );
    }

    if (isValidElement(child)) {
      const existingClass =
        (child.props as { className?: string }).className ?? "";
      const mergedStyle = {
        ...(child.props as { style?: CSSProperties }).style,
        fontSize: typeScale.title,
        lineHeight: lineHeights.tight,
      };

      return cloneElement(
        child as ReactElement,
        {
          className: cx(
            "block text-[length:var(--deck-title,7rem)] leading-[var(--deck-line-tight,1.05)]",
            existingClass,
          ),
          style: mergedStyle,
        } as Record<string, unknown>,
      );
    }

    return child;
  });

  return (
    <header className={cx(`flex flex-col gap-4 ${alignment}`, className)}>
      {eyebrow ? (
        <span
          className="font-semibold uppercase tracking-[0.25em] text-[color-mix(in srgb, var(--accent) 45%, white)]"
          style={{
            fontSize: typeScale.eyebrow,
            lineHeight: lineHeights.snug,
          }}
        >
          {eyebrow}
        </span>
      ) : null}
      <h1
        className="slide-title font-semibold tracking-normal text-[var(--foreground)]"
        style={{
          fontSize: typeScale.title,
          lineHeight: lineHeights.tight,
        }}
      >
        {headingContent}
      </h1>
      {kicker ? (
        <p
          className="font-medium text-[color-mix(in srgb, var(--foreground) 85%, transparent)]"
          style={{
            fontSize: typeScale.kicker,
            lineHeight: lineHeights.snug,
          }}
        >
          {kicker}
        </p>
      ) : null}
    </header>
  );
}

export function SlideSubhead({
  className,
  children,
  ...rest
}: SlideSubheadProps) {
  return (
    <div
      className={cx(
        "flex flex-col items-center text-center gap-6 font-medium text-[color-mix(in srgb, var(--foreground) 88%, transparent)]",
        className,
      )}
      style={{
        fontSize: typeScale.subhead,
        lineHeight: lineHeights.snug,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

export function SlideBody({ className, children, ...rest }: SlideBodyProps) {
  return (
    <div
      className={cx(
        "flex flex-col items-start gap-4 text-left text-[color-mix(in srgb, var(--foreground) 90%, transparent)]",
        className,
      )}
      style={{
        fontSize: typeScale.body,
        lineHeight: lineHeights.regular,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

export function BulletList({ className, children, ...rest }: BulletListProps) {
  return (
    <ul
      className={cx(
        "list-disc list-outside pl-6 space-y-2 text-left text-[color-mix(in srgb, var(--foreground) 88%, transparent)]",
        className,
      )}
      style={{
        fontSize: typeScale.body,
        lineHeight: lineHeights.regular,
      }}
      {...rest}
    >
      {children}
    </ul>
  );
}

export function Footnote({ className, children, ...rest }: FootnoteProps) {
  return (
    <div
      className={cx(
        "mt-auto uppercase tracking-[0.35em] text-[var(--muted)]",
        className,
      )}
      style={{
        fontSize: typeScale.footnote,
        lineHeight: lineHeights.snug,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

export function SidebarNote({ title, children, className }: SidebarNoteProps) {
  return (
    <aside
      className={cx(
        "rounded-2xl border border-dashed border-[color-mix(in srgb, var(--foreground) 18%, transparent)] bg-[color-mix(in srgb, white 95%, var(--background))] p-5 text-[var(--foreground)]",
        className,
      )}
      style={{
        fontSize: typeScale.caption,
        lineHeight: lineHeights.regular,
      }}
    >
      {title ? (
        <p
          className="mb-2 font-semibold uppercase tracking-[0.25em] text-[color-mix(in srgb, var(--foreground) 75%, transparent)]"
          style={{
            fontSize: typeScale.eyebrow,
            lineHeight: lineHeights.snug,
          }}
        >
          {title}
        </p>
      ) : null}
      {children}
    </aside>
  );
}

export function ImageFrame({ className, children }: ImageFrameProps) {
  return (
    <figure
      className={cx(
        "rounded-3xl bg-[color-mix(in srgb, white 96%, var(--background))] border border-[color-mix(in srgb, var(--foreground) 18%, transparent)] p-4 flex items-center justify-center",
        className,
      )}
    >
      {children}
    </figure>
  );
}

export function HighlightCallout({
  title,
  className,
  children,
}: HighlightCalloutProps) {
  return (
    <div
      className={cx(
        "rounded-[28px] border border-[color-mix(in srgb, var(--accent) 25%, transparent)] bg-[color-mix(in srgb, var(--accent) 12%, transparent)] p-6 text-left",
        className,
      )}
    >
      {title ? (
        <h3
          className="font-semibold uppercase tracking-[0.2em] text-[var(--accent)]"
          style={{
            fontSize: typeScale.label,
            lineHeight: lineHeights.snug,
          }}
        >
          {title}
        </h3>
      ) : null}
      <div
        className="mt-3 text-[color-mix(in srgb, var(--accent) 70%, black)]"
        style={{
          fontSize: typeScale.body,
          lineHeight: lineHeights.regular,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function FaqPage({
  question,
  questionLabel = "Question",
  answerLabel = "Answer",
  className,
  children,
}: FaqPageProps) {
  return (
    <section
      className={cx(
        "flex h-full w-full flex-col px-8 py-6 text-left text-[color-mix(in srgb, var(--foreground) 90%, transparent)]",
        className,
      )}
    >
      <div
        className="mx-auto flex min-h-0 flex-1 flex-col justify-center gap-8 py-8"
        style={{ maxWidth: "64rem" }}
      >
        <div className="flex flex-col gap-3">
          <span
            className="font-semibold uppercase tracking-[0.25em] text-[color-mix(in srgb, var(--accent) 45%, white)]"
            style={{
              fontSize: typeScale.eyebrow,
              lineHeight: lineHeights.snug,
            }}
          >
            {questionLabel}
          </span>
          <h2
            className="font-semibold text-[var(--foreground)]"
            style={{
              fontSize: typeScale.heading,
              lineHeight: lineHeights.snug,
            }}
          >
            {question}
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          <span
            className="font-semibold uppercase tracking-[0.2em] text-[color-mix(in srgb, var(--foreground) 65%, transparent)]"
            style={{
              fontSize: typeScale.label,
              lineHeight: lineHeights.snug,
            }}
          >
            {answerLabel}
          </span>
          <div
            className="space-y-4 text-[color-mix(in srgb, var(--foreground) 88%, transparent)]"
            style={{
              fontSize: typeScale.body,
              lineHeight: lineHeights.regular,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

const Heading1 = ({ className, children, ...rest }: HeadingProps) => (
  <h1
    className={cx(
      "font-semibold tracking-normal text-[var(--foreground)]",
      className,
    )}
    style={{
      fontSize: typeScale.heading,
      lineHeight: lineHeights.tight,
    }}
    {...rest}
  >
    {children}
  </h1>
);

const Heading2 = ({
  className,
  children,
  ...rest
}: WithClassName<ComponentProps<"h2">>) => (
  <h2
    className={cx(
      "font-semibold tracking-normal text-[var(--foreground)]",
      className,
    )}
    style={{
      fontSize: typeScale.subhead,
      lineHeight: lineHeights.snug,
    }}
    {...rest}
  >
    {children}
  </h2>
);

const Paragraph = ({
  className,
  children,
  ...rest
}: WithClassName<ComponentProps<"div">>) => (
  <div
    className={cx(
      "text-[color-mix(in srgb, var(--foreground) 88%, transparent)]",
      className,
    )}
    style={{
      fontSize: typeScale.body,
      lineHeight: lineHeights.regular,
    }}
    {...rest}
  >
    {children}
  </div>
);

const List = ({
  className,
  children,
  ...rest
}: WithClassName<ComponentProps<"ul">>) => (
  <ul
    className={cx(
      "list-disc list-outside pl-6 space-y-2 text-left text-[color-mix(in srgb, var(--foreground) 88%, transparent)]",
      className,
    )}
    style={{
      fontSize: typeScale.body,
      lineHeight: lineHeights.regular,
    }}
    {...rest}
  >
    {children}
  </ul>
);

const ListItem = ({
  className,
  children,
  ...rest
}: WithClassName<ComponentProps<"li">>) => (
  <li
    className={cx("pl-1", className)}
    style={{
      fontSize: typeScale.body,
      lineHeight: lineHeights.regular,
    }}
    {...rest}
  >
    {children}
  </li>
);

export const defaultMDXComponents = {
  h1: Heading1,
  h2: Heading2,
  p: Paragraph,
  ul: List,
  li: ListItem,
  ChartFrame,
  BarChartBlock,
  LineChartBlock,
  FundingMomentumChart,
  ProfitDistributionComparisonChart,
  ValuationToRevenueChart,
  ValuationMultipleMatrix,
  PreSeedOwnershipPie,
  DilutionScenarioPies,
  UpsideFundingTimeline,
  FundingMomentumTimeline,
  LatestRoundsBarChart,
  FundingVelocityLadder,
  InvestorLeadTable,
  ValuationOutlierHighlight,
  PricingSpreadCards,
  GeographyFundingColumns,
  BoardMomentumConclusion,
  FundingDataAppendixTable,
  CDEquityProceedsChart,
  CDEquityMultiplesChart,
  PersonalEquityProceedsChart,
  PersonalMultiplesChart,
  VentureCashFlowWaterfall,
  ChannelEquitySplitPanel,
  VentureRoundStaircase,
  InstrumentsComparisonTable,
  CashEquityVenn,
  LiquidationPreferenceIllustration,
  WarrantTriggerTimeline,
  WarrantTermsSnapshot,
  WarrantContributionMatrix,
  WarrantUnitsExample,
  LogoImage,
  SlideHeader,
  SlideSubhead,
  SlideBody,
  BulletList,
  Footnote,
  SidebarNote,
  ImageFrame,
  HighlightCallout,
  FaqPage,
};

type ComponentValue =
  (typeof defaultMDXComponents)[keyof typeof defaultMDXComponents];

export type MDXComponentMap = Record<string, ComponentValue>;
