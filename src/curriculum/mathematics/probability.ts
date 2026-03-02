/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Classical Definition of Probability & Event Spaces
 * Standard: Class 10
 * Exam Weightage: ~6%
 */

export interface CurriculumTopic_probability {
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

export const probability: CurriculumTopic_probability = {
  id: 'probability',
  title: 'Classical Definition of Probability & Event Spaces',
  subject: 'Mathematics',
  standard: 10,
  weightagePercent: 6,
  academicCycle: '2025-2026',
  lastReviewed: '2026-03-02',
  revisionNumber: 334,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Classical Definition of Probability & Event Spaces',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 9,
  sampleProblemCount: 30,
  practiceQuestions: [
    {
      id: 'pq-10',
      question: 'Analyze the institutional exam problem scenario #7 regarding Classical Definition of Probability & Event Spaces under Class 10 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    },
    {
      id: 'pq-22',
      question: 'Analyze the institutional exam problem scenario #19 regarding Classical Definition of Probability & Event Spaces under Class 10 syllabus criteria.',
      difficulty: 'hard',
      marks: 2,
      hint: 'Apply core definitions, boundary restrictions, and systematic simplification.'
    }
  ]
  commonPitfalls: [
    'Confusing sign conventions during scalar and vector decompositions',
    'Overlooking dimensional consistency in intermediate equations',
    'Neglecting edge-case boundary restrictions in Classical Definition of Probability & Event Spaces',
    'Premature approximation prior to final algebraic simplification'
  ]
};

export default probability;
