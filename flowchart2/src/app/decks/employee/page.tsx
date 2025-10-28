import { DeckNavigator } from "@/components/deck/deck-navigator";
import { getDeckSlides } from "@/components/deck/slides";

export default async function EmployeeDeckPage() {
  const slides = await getDeckSlides("employee");

  return <DeckNavigator slides={slides} />;
}
