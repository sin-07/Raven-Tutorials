/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Chemistry
 * Topic: Carbonyl Compounds, Aldol, and Cannizzaro Reactions
 * Standard: Class 12
 * Exam Weightage: ~13%
 */

export interface CurriculumTopic_aldehydes_ketones {
  id: string;
  title: string;
  subject: string;
  standard: number;
  weightagePercent: number;
  academicCycle?: string;
  lastReviewed?: string;
  revisionNumber?: number;
  learningObjectives: string[];
  keyFormulaeOrConcepts: string[];
  recommendedHours: number;
  sampleProblemCount: number;
  practiceQuestions?: Array<{
    id: string;
    question: string;
    difficulty: 'easy' | 'medium' | 'hard';
    marks: number;
    hint?: string;
  }>;
  examWeightageBreakdown?: {
    shortAnswerMarks: number;
    longAnswerMarks: number;
    numericalMarks: number;
    practicalMarks: number;
  };
  conceptDerivations?: Array<{
    topic: string;
    steps: string[];
    concludingEquation: string;
  }>;
  commonPitfalls?: string[];
  recommendedResources?: string[];
  realWorldApplications?: string[];
  revisionChecklist?: string[];
  laboratoryExperiments?: Array<{
    title: string;
    apparatus: string[];
    objective: string;
  }>;
}

export const aldehydes_ketones: CurriculumTopic_aldehydes_ketones = {
  id: 'aldehydes-ketones',
  title: 'Carbonyl Compounds, Aldol, and Cannizzaro Reactions',
  subject: 'Chemistry',
  standard: 12,
  weightagePercent: 13,
  academicCycle: '2025-2026',
  lastReviewed: '2026-07-12',
  revisionNumber: 338,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Carbonyl Compounds, Aldol, and Cannizzaro Reactions',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)',
    'Demonstrate advanced competency in Carbonyl Compounds, Aldol, and Cannizzaro Reactions module section #14 for competitive examinations',
    'Demonstrate advanced competency in Carbonyl Compounds, Aldol, and Cannizzaro Reactions module section #2 for competitive examinations',
    'Demonstrate advanced competency in Carbonyl Compounds, Aldol, and Cannizzaro Reactions module section #14 for competitive examinations',
    'Demonstrate advanced competency in Carbonyl Compounds, Aldol, and Cannizzaro Reactions module section #2 for competitive examinations',
    'Demonstrate advanced competency in Carbonyl Compounds, Aldol, and Cannizzaro Reactions module section #14 for competitive examinations',
    'Demonstrate advanced competency in Carbonyl Compounds, Aldol, and Cannizzaro Reactions module section #2 for competitive examinations',
    'Demonstrate advanced competency in Carbonyl Compounds, Aldol, and Cannizzaro Reactions module section #14 for competitive examinations',
    'Demonstrate advanced competency in Carbonyl Compounds, Aldol, and Cannizzaro Reactions module section #2 for competitive examinations',
    'Demonstrate advanced competency in Carbonyl Compounds, Aldol, and Cannizzaro Reactions module section #14 for competitive examinations'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 20,
  sampleProblemCount: 65,
  conceptDerivations: [
    {
      topic: 'Core Derivation for Carbonyl Compounds, Aldol, and Cannizzaro Reactions',
      steps: [
        'State primary postulates and initial state constraints',
        'Establish differential equilibrium equation',
        'Integrate over standard boundary limits',
        'Formulate definitive solution form'
      ],
      concludingEquation: 'Q(t) = Q_0 * exp(-lambda * t) + C'
    }
  ]
};

export default aldehydes_ketones;
