/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Vectors: Dot Product and Cross Product Operations
 * Standard: Class 12
 * Exam Weightage: ~10%
 */

export interface CurriculumTopic_vectors {
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

export const vectors: CurriculumTopic_vectors = {
  id: 'vectors',
  title: 'Vectors: Dot Product and Cross Product Operations',
  subject: 'Mathematics',
  standard: 12,
  weightagePercent: 10,
  academicCycle: '2025-2026',
  lastReviewed: '2026-07-22',
  revisionNumber: 281,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Vectors: Dot Product and Cross Product Operations',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 15,
  sampleProblemCount: 50,
  revisionChecklist: [
    'Verify complete mastery of Vectors: Dot Product and Cross Product Operations conceptual derivations and NCERT practice set #17',
    'Verify complete mastery of Vectors: Dot Product and Cross Product Operations conceptual derivations and NCERT practice set #5',
    'Verify complete mastery of Vectors: Dot Product and Cross Product Operations conceptual derivations and NCERT practice set #17',
    'Verify complete mastery of Vectors: Dot Product and Cross Product Operations conceptual derivations and NCERT practice set #5',
    'Verify complete mastery of Vectors: Dot Product and Cross Product Operations conceptual derivations and NCERT practice set #17',
    'Verify complete mastery of Vectors: Dot Product and Cross Product Operations conceptual derivations and NCERT practice set #5',
    'Verify complete mastery of Vectors: Dot Product and Cross Product Operations conceptual derivations and NCERT practice set #17',
    'Verify complete mastery of Vectors: Dot Product and Cross Product Operations conceptual derivations and NCERT practice set #5',
    'Verify complete mastery of Vectors: Dot Product and Cross Product Operations conceptual derivations and NCERT practice set #17'
  ],
  commonPitfalls: [
    'Confusing sign conventions during scalar and vector decompositions',
    'Overlooking dimensional consistency in intermediate equations',
    'Neglecting edge-case boundary restrictions in Vectors: Dot Product and Cross Product Operations',
    'Premature approximation prior to final algebraic simplification'
  ]
};

export default vectors;
