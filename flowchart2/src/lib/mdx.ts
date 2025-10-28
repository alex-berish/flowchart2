import { readFile } from "node:fs/promises";
import path from "node:path";

const SLIDE_ROOT = path.join(process.cwd(), "src", "content", "slides");

export async function loadSlide(name: string): Promise<string>;
export async function loadSlide(deck: string, name: string): Promise<string>;
export async function loadSlide(arg1: string, arg2?: string): Promise<string> {
  const hasDeck = typeof arg2 === "string";
  const deck = hasDeck ? arg1 : "";
  const name = hasDeck ? arg2 : arg1;

  const filePath = deck
    ? path.join(SLIDE_ROOT, deck, name)
    : path.join(SLIDE_ROOT, name);

  return readFile(filePath, "utf8");
}
