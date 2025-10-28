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
    title: "Clean Digital x Chatobserver",
    description:
      "Spin-out structure overview covering operator/channel roles, economics, and the execution checklist.",
    href: "/deck",
  },
  {
    slug: "eot",
    title: "EOT Perspective",
    description:
      "Tailored walkthrough for the Employee Ownership Trust trustees, focused on beneficiary outcomes and governance.",
    href: "/decks/eot",
  },
  {
    slug: "board",
    title: "Board Perspective",
    description:
      "Board-level view covering fiduciary questions, risk posture, and resolution mechanics.",
    href: "/decks/board",
  },
  {
    slug: "employee",
    title: "Employee Perspective",
    description:
      "Internal narrative for the Clean Digital team: what changes, how upside flows, and how to stay aligned.",
    comingSoon: true,
  },
];

export function DeckSelectionView() {
  const primaryDeck = DECK_OPTIONS.find((deck) => deck.slug === "orientation");
  const secondaryDecks = DECK_OPTIONS.filter((deck) => deck.slug !== "orientation");

  return (
    <div className="w-full max-w-5xl flex flex-col gap-10">
      <header className="flex flex-col gap-4 text-center md:text-left">

        <h1 className="text-4xl font-semibold tracking-tight">Pick a deck to explore</h1>
        <p className="text-base text-[color-mix(in srgb, var(--foreground) 78%, transparent)] max-w-2xl mx-auto md:mx-0">
          Start with the Clean Digital x Chatobserver deck to anchor the partnership story, then continue with trustee, board, and employee perspectives.
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
                <h2 className="text-2xl font-semibold tracking-tight">{primaryDeck.title}</h2>
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
          const content = (
            <>
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-xl font-semibold tracking-tight">{deck.title}</h2>
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
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]">
                  Open deck
                  <span aria-hidden>→</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 text-sm font-medium text-[color-mix(in srgb, var(--foreground) 65%, transparent)]">
                  Preparing materials
                </span>
              )}
            </>
          );

          const baseClasses =
            "rounded-3xl border border-[color-mix(in srgb, var(--foreground) 12%, transparent)] bg-[color-mix(in srgb, white 94%, var(--background))] p-6 flex flex-col gap-4 transition-transform";

          if (isDisabled) {
            return (
              <div
                key={deck.slug}
                className={`${baseClasses} opacity-70 cursor-not-allowed`}
                role="group"
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
              className={`${baseClasses} hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]`}
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
