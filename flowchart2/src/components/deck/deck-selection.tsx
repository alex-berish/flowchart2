import Link from "next/link";

type DeckOption = {
  slug: string;
  title: string;
  description: string;
  href?: string;
  comingSoon?: boolean;
};

const DECK_OPTIONS: DeckOption[] = [
  {
    slug: "orientation",
    title: "Proposal Overview",
    description:
      "Overview covering roles, economics, and the execution checklist, all subject to discussion.",
    href: "/deck",
  },
  {
    slug: "upside",
    title: "The Upside",
    description:
      "Venture math for Clean Digital: how a small cheque plus warrant compounds alongside the channel cash.",
    href: "/decks/upside",
  },
  {
    slug: "eot",
    title: "EOT Perspective",
    description:
      "The proposal as viewed through the EOT lens, focused on beneficiary outcomes and governance.",
    href: "/decks/eot",
  },
  {
    slug: "board",
    title: "Board Perspective",
    description:
      "Board-level view covering fiduciary questions, risk posture, and other mechanics.",
    href: "/decks/board",
  },
  {
    slug: "employee",
    title: "Employee Perspective",
    description:
      "FAQs for Clean Digital employees: what to expect, how upside flows, etc.",
    href: "/decks/employee",
  },
  {
    slug: "next-steps",
    title: "Next Steps",
    description:
      "Action checklist covering approvals, company formation, paperwork, and seed contingency.",
    href: "/decks/next-steps",
  },
];

export function DeckSelectionView() {
  const primaryDeck = DECK_OPTIONS.find((deck) => deck.slug === "orientation");
  const secondaryDecks = DECK_OPTIONS.filter(
    (deck) => deck.slug !== "orientation",
  );

  return (
    <div className="w-full max-w-5xl flex flex-col gap-10">
      <header className="flex flex-col gap-4 text-center md:text-left">
        <h1 className="text-4xl font-semibold tracking-tight">
          Chatobserver x Clean Digital
        </h1>
        <p className="text-base text-[color-mix(in srgb, var(--foreground) 78%, transparent)] max-w-2xl mx-auto md:mx-0">
          Start with the Proposal Overview deck to anchor the idea, then
          continue with EOT, board, and employee decks. Note that everything is
          a proposal subject to discussion and refinement.
        </p>
      </header>

      <section className="flex flex-col gap-6">
        {primaryDeck ? (
          <Link
            key={primaryDeck.slug}
            href={primaryDeck.href ?? "/decks"}
            className="relative overflow-hidden rounded-3xl border border-[color-mix(in srgb, var(--accent) 28%, transparent)] bg-[color-mix(in srgb, white 97%, var(--background))] p-8 shadow-sm transition-transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            <div className="absolute inset-y-0 right-0 w-1/3 pointer-events-none bg-[color-mix(in srgb, var(--accent) 18%, transparent)] blur-[96px]" />
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-3">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[color-mix(in srgb, var(--accent) 55%, white)]">
                  Start here
                </div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  {primaryDeck.title}
                </h2>
              </div>
              <span className="flex h-9 items-center rounded-full bg-[var(--accent)] px-4 text-xs font-semibold uppercase tracking-[0.3em] text-white">
                Launch deck →
              </span>
            </div>
            <p className="mt-4 text-base text-[color-mix(in srgb, var(--foreground) 75%, transparent)]">
              {primaryDeck.description}
            </p>
          </Link>
        ) : null}

        {secondaryDecks.map((deck) => {
          const isDisabled = !deck.href;
          const isUpside = deck.slug === "upside";
          const content = (
            <>
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-xl font-semibold tracking-tight">
                  {deck.title}
                </h2>
                {deck.comingSoon ? (
                  <span className="text-xs uppercase tracking-[0.25em] text-[color-mix(in srgb, var(--foreground) 55%, transparent)]">
                    Coming soon
                  </span>
                ) : null}
              </div>
              <p className="text-sm text-[color-mix(in srgb, var(--foreground) 75%, transparent)]">
                {deck.description}
              </p>
              {!isDisabled ? (
                isUpside ? (
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#fbbf24] px-3 py-1.5 text-sm font-semibold text-[#3f2f00] shadow-sm">
                    Open deck
                    <span aria-hidden>→</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]">
                    Open deck
                    <span aria-hidden>→</span>
                  </span>
                )
              ) : (
                <span className="inline-flex items-center gap-2 text-sm font-medium text-[color-mix(in srgb, var(--foreground) 65%, transparent)]">
                  Preparing materials
                </span>
              )}
            </>
          );

          const baseClasses =
            "rounded-3xl border bg-[color-mix(in srgb, white 94%, var(--background))] p-6 flex flex-col gap-4 transition-transform";
          const cardClasses = isUpside
            ? `${baseClasses} border-[#fbbf24] bg-[color-mix(in srgb, #fbbf24 12%, var(--background))] shadow-[0_18px_40px_-15px_rgb(251_191_36/0.55)]`
            : `${baseClasses} border-[color-mix(in srgb, var(--foreground) 12%, transparent)]`;
          const focusOutlineClass = isUpside
            ? "focus-visible:outline-[#fbbf24]"
            : "focus-visible:outline-[var(--accent)]";

          if (isDisabled) {
            return (
              <div
                key={deck.slug}
                className={`${cardClasses} opacity-70 cursor-not-allowed`}
                aria-disabled="true"
              >
                {content}
              </div>
            );
          }

          return (
            <Link
              key={deck.slug}
              href={deck.href ?? "/decks"}
              className={`${cardClasses} hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${focusOutlineClass}`}
            >
              {content}
            </Link>
          );
        })}
      </section>
    </div>
  );
}

export function DeckSelectionPageShell() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col items-center px-6 py-12">
      <DeckSelectionView />
    </main>
  );
}
