import { serialize } from "next-mdx-remote/serialize";

import { loadSlide } from "@/lib/mdx";

import type { DeckSlide } from "../types";

export async function getSlide02(): Promise<DeckSlide> {
  const raw = await loadSlide("slide-02.mdx");
  const source = await serialize(raw);

  return {
    id: "slide-02",
    label: "Chart Preview",
    source,
  };
}
