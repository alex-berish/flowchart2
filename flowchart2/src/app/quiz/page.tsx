import { QuizEngine } from "@/components/quiz/quiz-engine";
import { loadDecisionTree } from "@/lib/quiz";

export default async function QuizPage() {
  const tree = await loadDecisionTree();

  return <QuizEngine tree={tree} />;
}
