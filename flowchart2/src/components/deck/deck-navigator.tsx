"use client";

import Link from "next/link";
import { MDXRemote } from "next-mdx-remote";
import { useMemo, useState } from "react";

import { BarChartExample } from "../mdx/bar-chart-example";
import { defaultMDXComponents } from "../mdx/registry";
import type { DeckSlide } from "./types";

const defaultComponents = {
  ...defaultMDXComponents,
  BarChartExample,
};

type DeckNavigatorProps = {
  slides: DeckSlide[];
};

const SLIDE_WIDTH = 960;
const SLIDE_HEIGHT = 720;

export function DeckNavigator({ slides }: DeckNavigatorProps) {
  const [index, setIndex] = useState(0);
  const [referenceOpen, setReferenceOpen] = useState(false);
  const total = slides.length;
  const activeSlide = useMemo(() => slides[index], [slides, index]);
  const defaultNotes =
    "Keep this drawer ready for quick definitions, facilitation cues, or follow-up actions. The copy can flex per slide without crowding the main canvas.";
  const slideNotes = activeSlide.notes ?? defaultNotes;

  const goPrevious = () => setIndex((value) => Math.max(0, value - 1));
  const goNext = () => setIndex((value) => Math.min(total - 1, value + 1));
  const toggleReference = () => setReferenceOpen((value) => !value);

  const isFirst = index === 0;
  const isLast = index === total - 1;

  return (
    <div className="min-h-screen w-full bg-[var(--background)] text-[var(--foreground)] flex flex-col items-center px-6 py-10 gap-8">
      <header className="w-full max-w-screen-xl flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span
            className="uppercase tracking-[0.3em] text-[color-mix(in srgb, var(--accent) 40%, white)]"
            style={{
              fontSize: "var(--deck-eyebrow, 0.75rem)",
              lineHeight: "var(--deck-line-snug, 1.3)",
            }}
          >
            Deck Viewer
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/decks"
            className="rounded-full border border-[color-mix(in srgb, var(--foreground) 12%, transparent)] px-4 py-2 font-medium text-[color-mix(in srgb, var(--foreground) 80%, transparent)] hover:bg-[color-mix(in srgb, var(--accent) 10%, transparent)] transition"
            style={{
              fontSize: "var(--deck-label, 0.9rem)",
              lineHeight: "var(--deck-line-snug, 1.3)",
            }}
          >
            ← Back to decks
          </Link>
          <button
            type="button"
            onClick={toggleReference}
            aria-expanded={referenceOpen}
            className="min-w-[120px] rounded-full border border-[color-mix(in srgb, var(--foreground) 15%, transparent)] px-4 py-2 font-semibold uppercase tracking-[0.2em] hover:bg-[color-mix(in srgb, var(--accent) 12%, transparent)] transition"
            style={{
              fontSize: "var(--deck-label, 0.9rem)",
              lineHeight: "var(--deck-line-snug, 1.3)",
            }}
          >
            {referenceOpen ? "Hide notes" : "Show notes"}
          </button>
        </div>
      </header>

      <div className="relative w-full max-w-screen-xl">
        <section
          className="relative flex items-center justify-center border border-[color-mix(in srgb, var(--foreground) 6%, transparent)] rounded-[24px] shadow-lg bg-[color-mix(in srgb, white 94%, var(--background))] overflow-hidden transition-[padding] duration-200 ease-out"
          style={{
            height: `min(85vh, ${SLIDE_HEIGHT}px)`,
            paddingRight: referenceOpen ? 280 : 0,
          }}
          aria-live="polite"
        >
          <div className="flex h-full w-full items-center justify-center p-10">
            <div
              className="w-full h-full flex flex-col items-center justify-center text-center"
              style={{ maxWidth: SLIDE_WIDTH }}
            >
              <MDXRemote
                {...activeSlide.source}
                components={{
                  ...defaultComponents,
                  ...(activeSlide.components ?? {}),
                }}
              />
            </div>
          </div>
        </section>

        <aside
          aria-hidden={!referenceOpen}
          className={`hidden md:flex flex-col gap-3 absolute top-6 right-6 w-[240px] rounded-[20px] border border-dashed border-[color-mix(in srgb, var(--foreground) 18%, transparent)] bg-[color-mix(in srgb, white 94%, var(--background))] px-5 py-6 text-left text-[color-mix(in srgb, var(--foreground) 75%, transparent)] transition-[opacity,transform] duration-200 ease-out ${referenceOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"}`}
          style={{
            fontSize: "var(--deck-caption, 1rem)",
            lineHeight: "var(--deck-line-regular, 1.6)",
          }}
        >
          <p
            className="uppercase tracking-[0.2em] text-[color-mix(in srgb, var(--foreground) 70%, transparent)]"
            style={{
              fontSize: "var(--deck-eyebrow, 0.75rem)",
              lineHeight: "var(--deck-line-snug, 1.3)",
            }}
          >
            Facilitation notes
          </p>
          <p className="whitespace-pre-line">{slideNotes}</p>
        </aside>
      </div>

      {referenceOpen ? (
        <div
          className="w-full md:hidden rounded-[20px] border border-dashed border-[color-mix(in srgb, var(--foreground) 18%, transparent)] bg-[color-mix(in srgb, white 94%, var(--background))] px-5 py-6 text-left text-[color-mix(in srgb, var(--foreground) 75%, transparent)]"
          style={{
            fontSize: "var(--deck-caption, 1rem)",
            lineHeight: "var(--deck-line-regular, 1.6)",
          }}
        >
          <p
            className="uppercase tracking-[0.2em] text-[color-mix(in srgb, var(--foreground) 70%, transparent)]"
            style={{
              fontSize: "var(--deck-eyebrow, 0.75rem)",
              lineHeight: "var(--deck-line-snug, 1.3)",
            }}
          >
            Facilitation notes
          </p>
          <p className="mt-3 whitespace-pre-line">{slideNotes}</p>
        </div>
      ) : null}

      <nav className="w-full max-w-screen-xl flex flex-wrap items-center justify-center gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={goPrevious}
            disabled={isFirst}
            className="rounded-full border border-[color-mix(in srgb, var(--foreground) 12%, transparent)] px-5 py-2 font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[color-mix(in srgb, var(--accent) 10%, transparent)] transition"
            style={{
              fontSize: "var(--deck-button, 1rem)",
              lineHeight: "var(--deck-line-snug, 1.3)",
            }}
          >
            Previous
          </button>
          {!isLast ? (
            <button
              type="button"
              onClick={goNext}
              className="rounded-full bg-[var(--accent)] text-white px-6 py-2 font-medium transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              style={{
                fontSize: "var(--deck-button, 1rem)",
                lineHeight: "var(--deck-line-snug, 1.3)",
              }}
            >
              Next
            </button>
          ) : null}
        </div>
      </nav>
    </div>
  );
}
