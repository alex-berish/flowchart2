import { serialize } from "next-mdx-remote/serialize";

import { loadSlide } from "@/lib/mdx";

import type { DeckSlide } from "../types";

type SlideManifestEntry = {
  id: string;
  label: string;
  file: string;
  notes?: string;
};

type DeckDefinition = {
  slides: SlideManifestEntry[];
};

export const DECK_IDS = [
  "orientation",
  "eot",
  "board",
  "employee",
  "upside",
] as const;

export type DeckId = (typeof DECK_IDS)[number];

const DECKS: Record<DeckId, DeckDefinition> = {
  orientation: {
    slides: [
      { id: "slide-01", label: "Cover", file: "slide-01.mdx", notes: "" },
      {
        id: "slide-02",
        label: "Partnership Snapshot",
        file: "slide-02.mdx",
        notes:
          "Operator/channel/economics summary—CD captures 100% profit on its cohort.",
      },
      {
        id: "slide-03",
        label: "Provenance & Rationale",
        file: "slide-03.mdx",
        notes:
          "CD retains perpetual profit and provides initial working capital.",
      },
      {
        id: "slide-04",
        label: "Governance & Conflicts",
        file: "slide-04.mdx",
        notes:
          "I will recuse from EOT discussions on chatobserver (disclosure, recusal, arm's-length treatment)",
      },
      {
        id: "slide-05",
        label: "Parties & Boundaries",
        file: "slide-05.mdx",
        notes:
          "Clarify operator vs channel, staffing, and firewall expectations.",
      },
      {
        id: "slide-06",
        label: "Core Economics",
        file: "slide-06.mdx",
        notes: "Define profit formula and zero margin retained by NewCo.",
      },
      {
        id: "slide-07",
        label: "Scope & Pricing",
        file: "slide-07.mdx",
        notes:
          "These terms can be reworked obviously, but we can start with this",
      },
      {
        id: "slide-08",
        label: "Reporting & Audit",
        file: "slide-08.mdx",
        notes: "Monthly statement + audit right keeps trustees informed.",
      },
      {
        id: "slide-09",
        label: "Why Now",
        file: "slide-09.mdx",
        notes:
          "GEO/AEO momentum is rising and we need to operate with sense of urgency. This necessitates a streamlined structure that minimises friction and complexity and insulates CD from product risk.",
      },
      {
        id: "slide-11",
        label: "Funding Momentum",
        file: "slide-11.mdx",
        notes: "Use competitor raises to highlight fresh, investable category.",
      },
      {
        id: "slide-12",
        label: "Financial Example",
        file: "slide-13.mdx",
        notes: "Walk through £500/month account economics for CD.",
      },
      {
        id: "slide-13",
        label: "Papering Checklist",
        file: "slide-14.mdx",
        notes:
          "Assignment, channel letter, firewall, outside-hours, conflicts.",
      },
      {
        id: "slide-14",
        label: "Decision & Next Steps",
        file: "slide-15.mdx",
        notes:
          "Approve, instruct counsel, launch attribution capture, start pilot.",
      },
      {
        id: "slide-15",
        label: "In Summary",
        file: "slide-16.mdx",
        notes:
          "Compare capped £30k MRR outcomes with uncapped heavy-tail upside; reinforce baseline £1k guarantee.",
      },
    ],
  },
  eot: {
    slides: [
      {
        id: "slide-01",
        label: "EOT Perspective",
        file: "slide-01.mdx",
        notes: "",
      },
      {
        id: "slide-02",
        label: "EOT Benefit Test",
        file: "slide-02.mdx",
        notes:
          "Emphasise predictable cash, limited risk, preserved PPC focus, and credible upside.",
      },
      {
        id: "slide-03",
        label: "Operating Model Fit",
        file: "slide-03.mdx",
        notes:
          "Highlight founder-led execution plus channel economics as the best-fit structure.",
      },
      {
        id: "slide-04",
        label: "Safeguards & Boundaries",
        file: "slide-04.mdx",
        notes:
          "Underline the brand firewall, outside-hours commitment, and light but regular reporting.",
      },
      {
        id: "slide-05",
        label: "Trustee Resolution",
        file: "slide-05.mdx",
        notes:
          "Walk through approve/direct/review wording and tie back to benefit-first logic.",
      },
    ],
  },
  board: {
    slides: [
      {
        id: "slide-01",
        label: "Board Mandate",
        file: "slide-01.mdx",
        notes:
          "Open on the board's mandate: protect PPC, add profit stream, and keep product risk away from the agency.",
      },
      {
        id: "slide-02",
        label: "Business Model",
        file: "slide-02.mdx",
        notes:
          "Underline perpetual profit share, NewCo pricing control with a floor, and the attribution rules.",
      },
      {
        id: "slide-03",
        label: "Risk & Brand",
        file: "slide-03.mdx",
        notes:
          "Stress MoR = NewCo, brand firewall, outside-hours posture, and zero staff allocation.",
      },
      {
        id: "slide-04",
        label: "Cashflow & Governance",
        file: "slide-04.mdx",
        notes:
          "Highlight monthly remittance, reporting cadence, audit right, and quarterly decision gates.",
      },
      {
        id: "slide-05",
        label: "Board Actions",
        file: "slide-05.mdx",
        notes:
          "Walk through approve/execute/review phrasing—align with a 10-day close and 30-day check-in.",
      },
    ],
  },
  employee: {
    slides: [
      {
        id: "faq-01",
        label: "What is ChatObserver?",
        file: "slide-01.mdx",
      },
      {
        id: "faq-02",
        label: "Why isn't this kept inside CD?",
        file: "slide-02.mdx",
      },
      {
        id: "faq-03",
        label: "Is this just Alex trying to make money off CD?",
        file: "slide-03.mdx",
      },
      {
        id: "faq-04",
        label: "How is this allowed if we're employee-owned?",
        file: "slide-04.mdx",
      },
      {
        id: "faq-05",
        label: "Who owns the product company?",
        file: "slide-05.mdx",
      },
      {
        id: "faq-06",
        label: "Doesn't Alex being CD staff and trustee create a conflict?",
        file: "slide-06.mdx",
      },
      {
        id: "faq-07",
        label: "What does CD get, exactly?",
        file: "slide-07.mdx",
      },
      {
        id: "faq-08",
        label: 'What counts as a "CD-sourced" customer?',
        file: "slide-08.mdx",
      },
      {
        id: "faq-09",
        label: "Will this distract people from client work?",
        file: "slide-09.mdx",
      },
      {
        id: "faq-10",
        label: "Who handles data privacy and uptime risk?",
        file: "slide-10.mdx",
      },
      {
        id: "faq-11",
        label: "What if this gets big?",
        file: "slide-11.mdx",
      },
    ],
  },
  upside: {
    slides: [
      {
        id: "upside-00",
        label: "Title",
        file: "slide-00-title.mdx",
      },
      {
        id: "upside-01",
        label: "Venture Crash Course",
        file: "slide-01.mdx",
      },
      {
        id: "upside-01-chart",
        label: "Venture Journey Chart",
        file: "slide-01-chart.mdx",
      },
      {
        id: "upside-02",
        label: "Instruments Overview",
        file: "slide-02.mdx",
      },
      {
        id: "upside-02-chart",
        label: "Instrument Comparison",
        file: "slide-02-chart.mdx",
      },
      {
        id: "upside-03",
        label: "CD Package",
        file: "slide-03.mdx",
      },
      {
        id: "upside-03-warrant-basics",
        label: "What a Warrant Is",
        file: "slide-03-warrant-basics.mdx",
      },
      {
        id: "upside-03-warrant-basics-chart",
        label: "Warrant Timeline",
        file: "slide-03-warrant-basics-chart.mdx",
      },
      {
        id: "upside-03-warrant-terms",
        label: "Warrant Key Terms",
        file: "slide-03-warrant-terms.mdx",
      },
      {
        id: "upside-03-warrant-terms-chart",
        label: "Pre/Post Money Snapshot",
        file: "slide-03-warrant-terms-chart.mdx",
      },
      {
        id: "upside-03-warrant-why",
        label: "Why CD Gets It",
        file: "slide-03-warrant-why.mdx",
      },
      {
        id: "upside-03-warrant-why-chart",
        label: "Contribution vs Return",
        file: "slide-03-warrant-why-chart.mdx",
      },
      {
        id: "upside-04",
        label: "Pre-seed Maths",
        file: "slide-04.mdx",
      },
      {
        id: "upside-04-chart",
        label: "Pre-seed Ownership Chart",
        file: "slide-04-chart.mdx",
      },
      {
        id: "upside-05",
        label: "Dilution to Exit",
        file: "slide-05.mdx",
      },
      {
        id: "upside-05-chart",
        label: "Dilution Scenario Chart",
        file: "slide-05-chart.mdx",
      },
      {
        id: "upside-06",
        label: "Valuation ↔ ARR ↔ MRR",
        file: "slide-06.mdx",
      },
      {
        id: "upside-06-chart",
        label: "ARR / MRR Matrix",
        file: "slide-06-chart.mdx",
      },
      {
        id: "upside-07",
        label: "CD Equity Proceeds",
        file: "slide-07.mdx",
      },
      {
        id: "upside-07-chart",
        label: "CD Proceeds Chart",
        file: "slide-07-chart.mdx",
      },
      {
        id: "upside-09",
        label: "Personal £5k Proceeds",
        file: "slide-09.mdx",
      },
      {
        id: "upside-09-chart",
        label: "Personal Cheque Proceeds Chart",
        file: "slide-09-chart.mdx",
      },
      {
        id: "upside-10",
        label: "Personal Cheque Multiples",
        file: "slide-10.mdx",
      },
      {
        id: "upside-11",
        label: "Exit Primer",
        file: "slide-11.mdx",
      },
      {
        id: "upside-11-chart",
        label: "Funding Timeline",
        file: "slide-11-chart.mdx",
      },
      {
        id: "upside-12-liquidation",
        label: "Liquidation Preference",
        file: "slide-11-liquidation.mdx",
      },
      {
        id: "upside-12-chart",
        label: "Preference Illustration",
        file: "slide-12-chart.mdx",
      },
      {
        id: "upside-13",
        label: "Why It’s Aligned",
        file: "slide-13.mdx",
      },
      {
        id: "upside-14-latest-rounds",
        label: "Latest Rounds",
        file: "slide-14-latest-rounds.mdx",
      },
      {
        id: "upside-14-latest-rounds-chart",
        label: "Latest Rounds Chart",
        file: "slide-14-latest-rounds-chart.mdx",
      },
      {
        id: "upside-14-investors",
        label: "Investor Leads",
        file: "slide-14-investors.mdx",
      },
      {
        id: "upside-14-investors-chart",
        label: "Investor Leads Chart",
        file: "slide-14-investors-chart.mdx",
      },
      {
        id: "upside-14-valuation-outlier",
        label: "Valuation Outlier",
        file: "slide-14-valuation-outlier.mdx",
      },
      {
        id: "upside-14-valuation-outlier-chart",
        label: "Valuation Outlier Chart",
        file: "slide-14-valuation-outlier-chart.mdx",
      },
      {
        id: "upside-14-pricing",
        label: "Pricing Spread",
        file: "slide-14-pricing.mdx",
      },
      {
        id: "upside-14-geography-chart",
        label: "Geography Chart",
        file: "slide-14-geography-chart.mdx",
      },
      {
        id: "upside-14-conclusion",
        label: "Board Conclusion",
        file: "slide-14-conclusion.mdx",
      },
    ],
  },
};

export function listDeckIds(): DeckId[] {
  return [...DECK_IDS];
}

export async function getDeckSlides(
  deck: DeckId = "orientation",
): Promise<DeckSlide[]> {
  const definition = DECKS[deck];
  if (!definition) {
    throw new Error(`Deck not found: ${deck}`);
  }

  return Promise.all(
    definition.slides.map(async ({ id, label, file, notes }) => {
      const raw = await loadSlide(deck, file);
      const source = await serialize(raw);

      return {
        id,
        label,
        source,
        notes,
      };
    }),
  );
}
