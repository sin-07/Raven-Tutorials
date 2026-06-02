/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Biology
 * Topic: Recombinant DNA Tools and Electrophoresis
 * Standard: Class 12
 * Exam Weightage: ~12%
 */

export interface CurriculumTopic_biotechnology_principles {
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

export const biotechnology_principles: CurriculumTopic_biotechnology_principles = {
  id: 'biotechnology-principles',
  title: 'Recombinant DNA Tools and Electrophoresis',
  subject: 'Biology',
  standard: 12,
  weightagePercent: 12,
  academicCycle: '2025-2026',
  lastReviewed: '2026-06-02',
  revisionNumber: 352,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Recombinant DNA Tools and Electrophoresis',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)',
    'Demonstrate advanced competency in Recombinant DNA Tools and Electrophoresis module section #2 for competitive examinations',
    'Demonstrate advanced competency in Recombinant DNA Tools and Electrophoresis module section #14 for competitive examinations',
    'Demonstrate advanced competency in Recombinant DNA Tools and Electrophoresis module section #2 for competitive examinations',
    'Demonstrate advanced competency in Recombinant DNA Tools and Electrophoresis module section #14 for competitive examinations',
    'Demonstrate advanced competency in Recombinant DNA Tools and Electrophoresis module section #2 for competitive examinations',
    'Demonstrate advanced competency in Recombinant DNA Tools and Electrophoresis module section #14 for competitive examinations',
    'Demonstrate advanced competency in Recombinant DNA Tools and Electrophoresis module section #2 for competitive examinations'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 18,
  sampleProblemCount: 60,
  practiceQuestions: [
    {
      id: 'pq-1',
      question: 'Explain the fundamental theorem and underlying physical/mathematical model of Recombinant DNA Tools and Electrophoresis.',
      difficulty: 'easy',
      marks: 2,
      hint: 'Recall core definitions and standard boundary conditions.'
    },
    {
      id: 'pq-2',
      question: 'Derive the analytical expression for Recombinant DNA Tools and Electrophoresis under standard Class 12 test scenarios.',
      difficulty: 'medium',
      marks: 3,
      hint: 'Apply step-by-step mathematical substitution.'
    },
    {
      id: 'pq-3',
      question: 'Evaluate an edge-case problem involving composite systems in Recombinant DNA Tools and Electrophoresis.',
      difficulty: 'hard',
      marks: 5,
      hint: 'Check conservation laws and symmetry properties.'
    }
  ],
  examWeightageBreakdown: {
    shortAnswerMarks: 4,
    longAnswerMarks: 6,
    numericalMarks: 5,
    practicalMarks: 3
  }
};

export default biotechnology_principles;
