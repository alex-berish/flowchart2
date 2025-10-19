import type { DeckSlide } from "../types";

import { getSlide01 } from "./slide-01";
import { getSlide02 } from "./slide-02";
import { getSlide03 } from "./slide-03";

export async function getDeckSlides(): Promise<DeckSlide[]> {
  return Promise.all([getSlide01(), getSlide02(), getSlide03()]);
}
