/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: English
 * Topic: Persuasive Speech Architecture and Debate Logic
 * Standard: Class 12
 * Exam Weightage: ~9%
 */

export interface CurriculumTopic_speech_and_debate {
  id: string;
  title: string;
  subject: string;
  standard: number;
  weightagePercent: number;
  learningObjectives: string[];
  keyFormulaeOrConcepts: string[];
  recommendedHours: number;
  sampleProblemCount: number;
}

export const speech_and_debate: CurriculumTopic_speech_and_debate = {
  id: 'speech-and-debate',
  title: 'Persuasive Speech Architecture and Debate Logic',
  subject: 'English',
  standard: 12,
  weightagePercent: 9,
  academicCycle: '2025-2026',
  lastReviewed: '2026-07-18',
  revisionNumber: 280,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Persuasive Speech Architecture and Debate Logic',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 14,
  sampleProblemCount: 45
};

export default speech_and_debate;
