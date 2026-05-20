/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Continuity, Differentiability, and Chain Rule
 * Standard: Class 12
 * Exam Weightage: ~14%
 */

export interface CurriculumTopic_continuity_differentiability {
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

export const continuity_differentiability: CurriculumTopic_continuity_differentiability = {
  id: 'continuity-differentiability',
  title: 'Continuity, Differentiability, and Chain Rule',
  subject: 'Mathematics',
  standard: 12,
  weightagePercent: 14,
  academicCycle: '2025-2026',
  lastReviewed: '2026-05-20',
  revisionNumber: 258,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Continuity, Differentiability, and Chain Rule',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)',
    'Demonstrate advanced competency in Continuity, Differentiability, and Chain Rule module section #20 for competitive examinations',
    'Demonstrate advanced competency in Continuity, Differentiability, and Chain Rule module section #8 for competitive examinations',
    'Demonstrate advanced competency in Continuity, Differentiability, and Chain Rule module section #20 for competitive examinations',
    'Demonstrate advanced competency in Continuity, Differentiability, and Chain Rule module section #8 for competitive examinations',
    'Demonstrate advanced competency in Continuity, Differentiability, and Chain Rule module section #20 for competitive examinations',
    'Demonstrate advanced competency in Continuity, Differentiability, and Chain Rule module section #8 for competitive examinations'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 21,
  sampleProblemCount: 70,
  conceptDerivations: [
    {
      topic: 'Core Derivation for Continuity, Differentiability, and Chain Rule',
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

export default continuity_differentiability;
