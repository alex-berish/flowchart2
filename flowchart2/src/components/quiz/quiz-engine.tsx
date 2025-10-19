"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type {
  DecisionNode,
  DecisionOption,
  DecisionTree,
  Outcome,
} from "@/types/quiz";

type Step =
  | {
      kind: "node";
      id: string;
    }
  | {
      kind: "outcome";
      id: string;
    };

type MissingTarget = {
  type: "node" | "outcome";
  id: string;
};

type QuizEngineProps = {
  tree: DecisionTree;
};

export function QuizEngine({ tree }: QuizEngineProps) {
  const nodeMap = useMemo(
    () => new Map(tree.nodes.map((node) => [node.id, node])),
    [tree.nodes],
  );
  const outcomeMap = useMemo(
    () => new Map(tree.outcomes.map((outcome) => [outcome.id, outcome])),
    [tree.outcomes],
  );

  const [history, setHistory] = useState<Step[]>([
    { kind: "node", id: tree.start },
  ]);
  const [missing, setMissing] = useState<MissingTarget | null>(null);

  const current = history[history.length - 1];
  const canGoBack = history.length > 1;

  const reset = () => {
    setHistory([{ kind: "node", id: tree.start }]);
    setMissing(null);
  };

  const goBack = () => {
    if (!canGoBack) return;
    setMissing(null);
    setHistory((prev) => prev.slice(0, -1));
  };

  const handleOptionSelect = (option: DecisionOption) => {
    setMissing(null);

    if (option.next) {
      const nextNode = nodeMap.get(option.next);
      if (!nextNode) {
        setMissing({ type: "node", id: option.next });
        return;
      }
      setHistory((prev) => [...prev, { kind: "node", id: nextNode.id }]);
      return;
    }

    if (option.outcome) {
      const nextOutcome = outcomeMap.get(option.outcome);
      if (!nextOutcome) {
        setMissing({ type: "outcome", id: option.outcome });
        return;
      }
      setHistory((prev) => [...prev, { kind: "outcome", id: nextOutcome.id }]);
      return;
    }

    // No viable path defined on the option.
    setMissing({ type: "node", id: "unknown" });
  };

  const renderNode = (node: DecisionNode) => {
    return (
      <div className="flex flex-col gap-6">
        {node.eyebrow ? (
          <span
            className="uppercase tracking-[0.3em] text-[color-mix(in srgb, var(--accent) 40%, white)]"
            style={{
              fontSize: "var(--deck-eyebrow, 0.75rem)",
              lineHeight: "var(--deck-line-snug, 1.3)",
            }}
          >
            {node.eyebrow}
          </span>
        ) : null}
        <h2
          className="font-semibold tracking-normal"
          style={{
            fontSize: "var(--deck-heading, 3.25rem)",
            lineHeight: "var(--deck-line-tight, 1.05)",
          }}
        >
          {node.prompt}
        </h2>
        <fieldset className="flex flex-col gap-3 border-0 p-0 m-0">
          <legend className="sr-only">{node.prompt}</legend>
          {node.options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleOptionSelect(option)}
              className="text-left rounded-2xl border border-[color-mix(in srgb, var(--foreground) 12%, transparent)] bg-[color-mix(in srgb, white 92%, var(--background))] px-5 py-4 transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              <div
                className="font-medium text-[var(--foreground)]"
                style={{
                  fontSize: "var(--deck-subhead, 1.9rem)",
                  lineHeight: "var(--deck-line-snug, 1.3)",
                }}
              >
                {option.label}
              </div>
              {option.helper ? (
                <p
                  className="mt-1 text-[color-mix(in srgb, var(--foreground) 75%, transparent)]"
                  style={{
                    fontSize: "var(--deck-caption, 1rem)",
                    lineHeight: "var(--deck-line-regular, 1.6)",
                  }}
                >
                  {option.helper}
                </p>
              ) : null}
            </button>
          ))}
        </fieldset>
      </div>
    );
  };

  const renderOutcome = (outcome: Outcome) => {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <span
            className="inline-flex items-center justify-center rounded-full border border-[color-mix(in srgb, var(--accent) 40%, transparent)] px-4 py-1 uppercase tracking-[0.2em] text-[color-mix(in srgb, var(--accent) 60%, white)]"
            style={{
              fontSize: "var(--deck-label, 0.9rem)",
              lineHeight: "var(--deck-line-snug, 1.3)",
            }}
          >
            Option {outcome.optionNumber}
          </span>
          <span
            className="text-[color-mix(in srgb, var(--foreground) 75%, transparent)]"
            style={{
              fontSize: "var(--deck-caption, 1rem)",
              lineHeight: "var(--deck-line-regular, 1.6)",
            }}
          >
            Outcome reached
          </span>
        </div>
        <h2
          className="font-semibold tracking-normal"
          style={{
            fontSize: "var(--deck-heading, 3.25rem)",
            lineHeight: "var(--deck-line-tight, 1.05)",
          }}
        >
          {outcome.title}
        </h2>
        <p
          className="text-[color-mix(in srgb, var(--foreground) 75%, transparent)]"
          style={{
            fontSize: "var(--deck-body, 1.2rem)",
            lineHeight: "var(--deck-line-regular, 1.6)",
          }}
        >
          {outcome.narrative}
        </p>

        {outcome.implications?.length ? (
          <Section title="Implications" items={outcome.implications} />
        ) : null}
        {outcome.economics?.length ? (
          <Section title="Economics" items={outcome.economics} />
        ) : null}
        {outcome.actions.length ? (
          <Section
            title="Recommended actions"
            items={outcome.actions}
            ordered
          />
        ) : null}
        {outcome.faqs?.length ? (
          <Section title="FAQs" items={outcome.faqs} />
        ) : null}

        <div
          className="rounded-2xl border border-dashed border-[color-mix(in srgb, var(--accent) 30%, transparent)] px-4 py-3 text-[color-mix(in srgb, var(--accent) 60%, white)]"
          style={{
            fontSize: "var(--deck-body, 1.2rem)",
            lineHeight: "var(--deck-line-regular, 1.6)",
          }}
        >
          Flow reminder: Each branch shifts IP, ownership, and velocity. Pick
          the arc that matches the growth thesis.
        </div>
      </div>
    );
  };

  const renderMissing = (target: MissingTarget) => (
    <div className="flex flex-col gap-4 text-center items-center">
      <h2
        className="font-semibold tracking-normal"
        style={{
          fontSize: "var(--deck-heading, 3.25rem)",
          lineHeight: "var(--deck-line-tight, 1.05)",
        }}
      >
        Data unavailable
      </h2>
      <p
        className="text-[color-mix(in srgb, var(--foreground) 75%, transparent)]"
        style={{
          fontSize: "var(--deck-body, 1.2rem)",
          lineHeight: "var(--deck-line-regular, 1.6)",
        }}
      >
        We couldn&apos;t locate the {target.type} referenced in this path (
        {target.id}). Restart the flow to choose a different branch.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-full bg-[var(--accent)] text-white px-6 py-3 font-medium transition-transform hover:-translate-y-0.5"
        style={{
          fontSize: "var(--deck-button, 1rem)",
          lineHeight: "var(--deck-line-snug, 1.3)",
        }}
      >
        Restart the decision flow
      </button>
    </div>
  );

  const activeNode = current.kind === "node" ? nodeMap.get(current.id) : null;
  const activeOutcome =
    current.kind === "outcome" ? outcomeMap.get(current.id) : null;

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col items-center px-6 py-12 gap-10">
      <header className="text-center flex flex-col items-center gap-3 max-w-3xl">
        <span
          className="uppercase tracking-[0.3em] text-[color-mix(in srgb, var(--accent) 40%, white)]"
          style={{
            fontSize: "var(--deck-eyebrow, 0.75rem)",
            lineHeight: "var(--deck-line-snug, 1.3)",
          }}
        >
          Interactive Demo
        </span>
        <h1
          className="font-semibold tracking-normal"
          style={{
            fontSize: "var(--deck-heading, 3.25rem)",
            lineHeight: "var(--deck-line-tight, 1.05)",
          }}
        >
          {tree.theme}
        </h1>
        <p
          className="text-[color-mix(in srgb, var(--foreground) 75%, transparent)]"
          style={{
            fontSize: "var(--deck-body, 1.2rem)",
            lineHeight: "var(--deck-line-regular, 1.6)",
          }}
        >
          {tree.goal}
        </p>
      </header>

      <section className="w-full max-w-3xl bg-[color-mix(in srgb, white 92%, var(--background))] border border-[color-mix(in srgb, var(--foreground) 12%, transparent)] rounded-[32px] px-8 py-10 shadow-sm">
        {missing
          ? renderMissing(missing)
          : current.kind === "node"
            ? activeNode
              ? renderNode(activeNode)
              : renderMissing({ type: "node", id: current.id })
            : activeOutcome
              ? renderOutcome(activeOutcome)
              : renderMissing({ type: "outcome", id: current.id })}
      </section>

      <nav className="flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={goBack}
          disabled={!canGoBack}
          className="rounded-full border border-[color-mix(in srgb, var(--foreground) 12%, transparent)] px-5 py-2 font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[color-mix(in srgb, var(--accent) 10%, transparent)] transition"
          style={{
            fontSize: "var(--deck-button, 1rem)",
            lineHeight: "var(--deck-line-snug, 1.3)",
          }}
        >
          Back
        </button>
        <button
          type="button"
          onClick={reset}
          className="rounded-full font-medium px-5 py-2 border border-transparent bg-[color-mix(in srgb, var(--accent) 12%, transparent)] text-[color-mix(in srgb, var(--accent) 70%, black)] hover:bg-[color-mix(in srgb, var(--accent) 16%, transparent)] transition"
          style={{
            fontSize: "var(--deck-button, 1rem)",
            lineHeight: "var(--deck-line-snug, 1.3)",
          }}
        >
          Restart
        </button>
        <Link
          href="/deck"
          className="rounded-full font-medium px-5 py-2 border border-transparent bg-[color-mix(in srgb, var(--muted) 20%, transparent)] text-[var(--foreground)] hover:bg-[color-mix(in srgb, var(--muted) 28%, transparent)] transition"
          style={{
            fontSize: "var(--deck-button, 1rem)",
            lineHeight: "var(--deck-line-snug, 1.3)",
          }}
        >
          Revisit orientation deck
        </Link>
      </nav>

      <footer
        className="flex flex-col items-center gap-2 text-[color-mix(in srgb, var(--foreground) 75%, transparent)]"
        style={{
          fontSize: "var(--deck-caption, 1rem)",
          lineHeight: "var(--deck-line-regular, 1.6)",
        }}
      >
        <span>
          Each branch shifts IP, ownership, and velocity. Pick the arc that
          matches the growth thesis.
        </span>
        <span>Blueprint by Interactive Pitch Build</span>
      </footer>
    </div>
  );
}

type SectionProps = {
  title: string;
  items: string[];
  ordered?: boolean;
};

function Section({ title, items, ordered }: SectionProps) {
  return (
    <section className="flex flex-col gap-3">
      <h3
        className="font-semibold"
        style={{
          fontSize: "var(--deck-subhead, 1.9rem)",
          lineHeight: "var(--deck-line-snug, 1.3)",
        }}
      >
        {title}
      </h3>
      {ordered ? (
        <ol
          className="list-decimal list-inside space-y-2 text-[color-mix(in srgb, var(--foreground) 75%, transparent)]"
          style={{
            fontSize: "var(--deck-body, 1.2rem)",
            lineHeight: "var(--deck-line-regular, 1.6)",
          }}
        >
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      ) : (
        <ul
          className="list-disc list-inside space-y-2 text-[color-mix(in srgb, var(--foreground) 75%, transparent)]"
          style={{
            fontSize: "var(--deck-body, 1.2rem)",
            lineHeight: "var(--deck-line-regular, 1.6)",
          }}
        >
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
