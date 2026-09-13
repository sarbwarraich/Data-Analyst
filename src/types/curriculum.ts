export type SubjectId =
  | 'data-analytics'
  | 'data-visualization'
  | 'probability-statistics'
  | 'machine-learning'
  | 'time-series';

export interface FlowchartStep {
  id: string;
  title: string;
  description: string;
  category: 'input' | 'process' | 'decision' | 'output' | 'evaluation';
  details?: string;
  codeSnippet?: string;
}

export interface Flowchart {
  title: string;
  description: string;
  steps: FlowchartStep[];
}

export interface Formula {
  name: string;
  latex: string;
  explanation: string;
  variables: { symbol: string; meaning: string }[];
}

export interface CaseStudy {
  title: string;
  industry: string;
  companyExample: string;
  problem: string;
  solutionWorkflow: string[];
  metricsUsed: string[];
  outcome: string;
  keyTakeaway: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TopicVisual {
  imageUrl: string;
  caption: string;
  badge: string;
  diagramType?: 'architecture' | 'flow' | 'matrix' | 'distribution' | 'comparison';
}

export interface Topic {
  id: string;
  title: string;
  subjectId: SubjectId;
  category: string;
  difficulty: 'Foundational' | 'Intermediate' | 'Advanced';
  summary: string;
  keyConcepts: string[];
  formulas?: Formula[];
  interactiveType?:
    | 'pipeline'
    | 'kmeans'
    | 'regression'
    | 'confusion-matrix'
    | 'distributions'
    | 'hypothesis-testing'
    | 'eda-visualizer'
    | 'queuing'
    | 'timeseries-decomp'
    | 'lstm-cell'
    | 'decision-tree'
    | 'data-types';
  flowchart?: Flowchart;
  visualDiagram?: TopicVisual;
  caseStudy: CaseStudy;
  pythonSnippet: {
    title: string;
    code: string;
    explanation: string;
  };
  suggestedPrompts: string[];
  quiz: QuizQuestion[];
}

export interface Subject {
  id: SubjectId;
  title: string;
  badge: string;
  importance: string;
  description: string;
  color: string;
  iconName: string;
  topics: Topic[];
}

export interface Flashcard {
  id: string;
  subjectId: SubjectId;
  topicTitle: string;
  front: string;
  back: string;
  formula?: string;
  tag: string;
}

export interface CheatSheetEntry {
  id: string;
  subjectId: SubjectId;
  category: string;
  title: string;
  formulaOrSyntax: string;
  description: string;
  ruleOfThumb?: string;
  pythonSnippet?: string;
}
