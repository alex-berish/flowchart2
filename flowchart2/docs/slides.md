# Slide Authoring Guide

This guide summarizes the MDX components available when building deck slides.

## Core headings & copy

```mdx
# Top-Level Heading

## Subheading

Paragraph text here.
```

- `#` → renders via the shared `h1` override (40px, tight tracking).
- `##` → renders via the shared `h2` override (28px).
- Plain paragraphs inherit the default `p` override (base size, muted tone).

## Structured components

```mdx
<SlideHeader eyebrow="Interactive Demo" kicker="Two-minute overview" align="left">
  Where This Experience Fits
</SlideHeader>

<SlideSubhead>
  Quick setup for the partnership flow.
</SlideSubhead>

<SlideBody>
  <p>Snapshot of the journey before the decisions.</p>
  <BulletList>
    <li>Sets up strategic options</li>
    <li>Runs in under two minutes</li>
  </BulletList>
</SlideBody>
```

| Component | Props | Notes |
| --- | --- | --- |
| `SlideHeader` | `eyebrow?`, `kicker?`, `align?` (`left` \| `center`) | Primary title block with optional eyebrow/kicker. |
| `SlideSubhead` | standard `p` props | Secondary leading sentence. |
| `SlideBody` | standard `div` props | Wraps supporting paragraphs or lists; already spaced. |
| `BulletList` | standard `ul` props | Styled bullet list; can be nested within `SlideBody`. |
| `Footnote` | standard `p` props | Uppercased helper text at the bottom of a slide. |
| `SidebarNote` | `title?` | Use inside responsive layouts for quick definitions. |
| `HighlightCallout` | `title?` | Accent block for key stats or takeaways. |
| `ImageFrame` | – | Wrap static imagery in consistent padding + border. |
| `ChartFrame` | `title?`, `subtitle?`, `footnote?` | Styled shell for charts; handles spacing and captions. |
| `BarChartBlock` | `data`, `xKey?`, `yKey?`, `color?`, `formatValue?` | Preconfigured Recharts bar chart with theme styling. |

## Layout patterns

### Two-column content

```mdx
<div className="grid grid-cols-[2fr_1fr] gap-8">
  <SlideBody>
    <p>Main narrative copy.</p>
    <BulletList>
      <li>Key point one</li>
      <li>Key point two</li>
    </BulletList>
  </SlideBody>
  <SidebarNote title="Partner insight">
    <p>Quick definition or facilitation cue.</p>
  </SidebarNote>
</div>
```

### Chart blocks

```mdx
<SlideHeader eyebrow="Adoption" align="center">
  Example adoption curve from pilot cohorts
</SlideHeader>

<ChartFrame
  title="Adoption velocity"
  subtitle="Weekly cohorts advancing through the pilot"
  footnote="Alignment improves after each milestone when teams navigate the flow together"
>
  <BarChartBlock
    data={[
      { label: "Discover", value: 24 },
      { label: "Explore", value: 46 },
      { label: "Prototype", value: 68 },
      { label: "Adopt", value: 80 },
    ]}
  />
</ChartFrame>
```

`BarChartBlock` handles responsiveness and shared axis styling automatically. Wrap other Recharts helpers in `ChartFrame` to keep spacing consistent.

## Authoring tips

- Favor Markdown syntax for headings/paragraphs when defaults are acceptable; switch to JSX for precise control.
- Every component accepts an optional `className` prop for edge cases.
- `SidebarNote` is collapsed by default in the deck chrome; expose relevant context by toggling the “Show notes” control.
- For reusable patterns (e.g., badge + text), create a dedicated MDX component and add it to `defaultMDXComponents` in `src/components/mdx/registry.tsx`.

## Adding new components

1. Implement the React component in `src/components/mdx/registry.tsx` (or split into a dedicated file if complex).
2. Export it via `defaultMDXComponents` so it is available in MDX.
3. Document the usage snippet here.

With this structure, new layout or typography variants can be introduced without touching the deck navigation logic.
