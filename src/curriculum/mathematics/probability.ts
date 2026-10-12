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
}

export const probability: CurriculumTopic_probability = {
  id: 'probability',
  title: 'Classical Definition of Probability & Event Spaces',
  subject: 'Mathematics',
  standard: 10,
  weightagePercent: 6,
  academicCycle: '2025-2026',
  lastReviewed: '2026-09-07',
  revisionNumber: 331,
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
  sampleProblemCount: 30
};

export default probability;
