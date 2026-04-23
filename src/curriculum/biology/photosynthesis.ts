/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Biology
 * Topic: Light Reactions and Carbon Fixation Mechanisms
 * Standard: Class 11
 * Exam Weightage: ~12%
 */

export interface CurriculumTopic_photosynthesis {
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

export const photosynthesis: CurriculumTopic_photosynthesis = {
  id: 'photosynthesis',
  title: 'Light Reactions and Carbon Fixation Mechanisms',
  subject: 'Biology',
  standard: 11,
  weightagePercent: 12,
  academicCycle: '2025-2026',
  lastReviewed: '2026-04-23',
  revisionNumber: 194,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Light Reactions and Carbon Fixation Mechanisms',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 18,
  sampleProblemCount: 60
};

export default photosynthesis;
