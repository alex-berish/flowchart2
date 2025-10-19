import { serialize } from "next-mdx-remote/serialize";

import { loadSlide } from "@/lib/mdx";

import type { DeckSlide } from "../types";

export async function getSlide03(): Promise<DeckSlide> {
  const raw = await loadSlide("slide-03.mdx");
  const source = await serialize(raw);

  return {
    id: "slide-03",
    label: "Final Prompt",
    source,
  };
}
