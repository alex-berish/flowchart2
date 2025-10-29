import { DeckNavigator } from "@/components/deck/deck-navigator";
import { getDeckSlides } from "@/components/deck/slides";

export default async function UpsideDeckPage() {
  const slides = await getDeckSlides("upside");

  return <DeckNavigator slides={slides} />;
}
