/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: English
 * Topic: Reported Speech and Indirect Discourse
 * Standard: Class 10
 * Exam Weightage: ~7%
 */

export interface CurriculumTopic_direct_indirect_speech {
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

export const direct_indirect_speech: CurriculumTopic_direct_indirect_speech = {
  id: 'direct-indirect-speech',
  title: 'Reported Speech and Indirect Discourse',
  subject: 'English',
  standard: 10,
  weightagePercent: 7,
  academicCycle: '2025-2026',
  lastReviewed: '2026-03-30',
  revisionNumber: 170,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Reported Speech and Indirect Discourse',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 11,
  sampleProblemCount: 35
};

export default direct_indirect_speech;
