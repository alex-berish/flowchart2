import Link from "next/link";

export default function SplashPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col items-center justify-between px-6 py-12">
      <div className="w-full max-w-2xl flex flex-col items-center text-center gap-6">
        <span className="uppercase tracking-[0.3em] text-xs text-[color-mix(in srgb, var(--accent) 40%, white)]">
          Interactive preview
        </span>
        <h1 className="text-4xl font-semibold tracking-tight">
          Interactive Demo
        </h1>
        <p className="text-base text-[color-mix(in srgb, var(--foreground) 80%, transparent)]">
          Get a rapid orientation before diving into the ChatObserver
          partnership journey. When you&apos;re ready, step through the slides
          and explore the branching decision flow.
        </p>
        <Link
          href="/deck"
          className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] text-white px-6 py-3 text-base font-medium transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          Get started
        </Link>
      </div>
      <footer className="text-sm text-[color-mix(in srgb, var(--foreground) 80%, transparent)]">
        Blueprint by Interactive Pitch Build
      </footer>
    </main>
  );
}
