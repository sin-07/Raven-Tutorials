/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Physics
 * Topic: Transverse Waves, Standing Waves, and Resonance
 * Standard: Class 11
 * Exam Weightage: ~10%
 */

export interface CurriculumTopic_waves {
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

export const waves: CurriculumTopic_waves = {
  id: 'waves',
  title: 'Transverse Waves, Standing Waves, and Resonance',
  subject: 'Physics',
  standard: 11,
  weightagePercent: 10,
  academicCycle: '2025-2026',
  lastReviewed: '2026-02-20',
  revisionNumber: 132,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Transverse Waves, Standing Waves, and Resonance',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 15,
  sampleProblemCount: 50
};

export default waves;
