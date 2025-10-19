import { DeckNavigator } from "@/components/deck/deck-navigator";
import { getDeckSlides } from "@/components/deck/slides";

export default async function DeckPage() {
  const slides = await getDeckSlides();

  return <DeckNavigator slides={slides} />;
}
