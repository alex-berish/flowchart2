import { readFile } from "node:fs/promises";
import path from "node:path";

const SLIDE_ROOT = path.join(process.cwd(), "src", "content", "slides");

export async function loadSlide(name: string) {
  const filePath = path.join(SLIDE_ROOT, name);
  return readFile(filePath, "utf8");
}
