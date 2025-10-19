import type { ReactNode } from "react";

import { cx } from "./utils";

type ChartFrameProps = {
  title?: string;
  subtitle?: string;
  footnote?: string;
  children: ReactNode;
  className?: string;
};

export function ChartFrame({
  title,
  subtitle,
  footnote,
  children,
  className,
}: ChartFrameProps) {
  return (
    <figure
      className={cx(
        "w-full max-w-4xl mx-auto rounded-[28px] border border-[color-mix(in srgb, var(--foreground) 20%, transparent)] bg-[color-mix(in srgb, white 95%, var(--background))] p-6 flex flex-col gap-4",
        className,
      )}
    >
      {(title || subtitle) && (
        <header className="flex flex-col gap-1">
          {title ? (
            <h3
              className="font-semibold text-[var(--foreground)]"
              style={{
                fontSize: "var(--deck-subhead, 1.9rem)",
                lineHeight: "var(--deck-line-snug, 1.3)",
              }}
            >
              {title}
            </h3>
          ) : null}
          {subtitle ? (
            <p
              className="text-[color-mix(in srgb, var(--foreground) 75%, transparent)]"
              style={{
                fontSize: "var(--deck-caption, 1rem)",
                lineHeight: "var(--deck-line-regular, 1.6)",
              }}
            >
              {subtitle}
            </p>
          ) : null}
        </header>
      )}
      <div className="w-full">
        <div className="w-full h-[260px] sm:h-[320px] flex items-center justify-center">
          {children}
        </div>
      </div>
      {footnote ? (
        <figcaption
          className="uppercase tracking-[0.2em] text-[color-mix(in srgb, var(--foreground) 60%, transparent)]"
          style={{
            fontSize: "var(--deck-footnote, 0.75rem)",
            lineHeight: "var(--deck-line-snug, 1.3)",
          }}
        >
          {footnote}
        </figcaption>
      ) : null}
    </figure>
  );
}
