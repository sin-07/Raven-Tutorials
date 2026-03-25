/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: English
 * Topic: Active and Passive Voice Syntactic Rules
 * Standard: Class 10
 * Exam Weightage: ~6%
 */

export interface CurriculumTopic_active_passive_voice {
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

export const active_passive_voice: CurriculumTopic_active_passive_voice = {
  id: 'active-passive-voice',
  title: 'Active and Passive Voice Syntactic Rules',
  subject: 'English',
  standard: 10,
  weightagePercent: 6,
  academicCycle: '2025-2026',
  lastReviewed: '2026-03-25',
  revisionNumber: 165,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Active and Passive Voice Syntactic Rules',
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

export default active_passive_voice;
