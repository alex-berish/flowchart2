import { DeckNavigator } from "@/components/deck/deck-navigator";
import { getDeckSlides } from "@/components/deck/slides";

export default async function EotDeckPage() {
  const slides = await getDeckSlides("eot");

  return <DeckNavigator slides={slides} />;
}
