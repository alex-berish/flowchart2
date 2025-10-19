import { serialize } from "next-mdx-remote/serialize";

import { loadSlide } from "@/lib/mdx";

import type { DeckSlide } from "../types";

export async function getSlide01(): Promise<DeckSlide> {
  const raw = await loadSlide("slide-01.mdx");
  const source = await serialize(raw);

  return {
    id: "slide-01",
    label: "Greeting",
    source,
  };
}
