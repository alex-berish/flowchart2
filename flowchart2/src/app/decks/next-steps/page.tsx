import { DeckNavigator } from "@/components/deck/deck-navigator";
import { getDeckSlides } from "@/components/deck/slides";

export default async function NextStepsDeckPage() {
  const slides = await getDeckSlides("next-steps");

  return <DeckNavigator slides={slides} />;
}
