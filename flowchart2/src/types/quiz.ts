export type DecisionOption = {
  id: string;
  label: string;
  helper?: string;
  next?: string;
  outcome?: string;
};

export type DecisionNode = {
  id: string;
  eyebrow?: string;
  prompt: string;
  options: DecisionOption[];
};

export type Outcome = {
  id: string;
  optionNumber: number;
  title: string;
  narrative: string;
  implications?: string[];
  economics?: string[];
  actions: string[];
  faqs?: string[];
};

export type DecisionTree = {
  theme: string;
  goal: string;
  start: string;
  nodes: DecisionNode[];
  outcomes: Outcome[];
};
