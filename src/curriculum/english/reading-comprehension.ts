/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: English
 * Topic: Advanced Reading Comprehension Strategy
 * Standard: Class 11
 * Exam Weightage: ~12%
 */

export interface CurriculumTopic_reading_comprehension {
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

export const reading_comprehension: CurriculumTopic_reading_comprehension = {
  id: 'reading-comprehension',
  title: 'Advanced Reading Comprehension Strategy',
  subject: 'English',
  standard: 11,
  weightagePercent: 12,
  academicCycle: '2025-2026',
  lastReviewed: '2026-04-03',
  revisionNumber: 349,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Advanced Reading Comprehension Strategy',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 18,
  sampleProblemCount: 60,
  revisionChecklist: [
    'Verify complete mastery of Advanced Reading Comprehension Strategy conceptual derivations and NCERT practice set #11',
    'Verify complete mastery of Advanced Reading Comprehension Strategy conceptual derivations and NCERT practice set #23',
    'Verify complete mastery of Advanced Reading Comprehension Strategy conceptual derivations and NCERT practice set #11',
    'Verify complete mastery of Advanced Reading Comprehension Strategy conceptual derivations and NCERT practice set #23'
  ]
};

export default reading_comprehension;
