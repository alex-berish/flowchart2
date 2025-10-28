import { DeckNavigator } from "@/components/deck/deck-navigator";
import { getDeckSlides } from "@/components/deck/slides";

export default async function BoardDeckPage() {
  const slides = await getDeckSlides("board");

  return <DeckNavigator slides={slides} />;
}
