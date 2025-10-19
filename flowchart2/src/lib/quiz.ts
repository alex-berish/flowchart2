import { readFile } from "node:fs/promises";
import path from "node:path";
import { parse } from "yaml";

import type { DecisionTree } from "@/types/quiz";

const QUIZ_SOURCE = path.join(
  process.cwd(),
  "src",
  "content",
  "quiz",
  "placeholder.yaml",
);

export async function loadDecisionTree(): Promise<DecisionTree> {
  const fileContents = await readFile(QUIZ_SOURCE, "utf8");
  const parsed = parse(fileContents) as DecisionTree;
  return parsed;
}
