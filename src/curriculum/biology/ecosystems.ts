/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Biology
 * Topic: Ecosystem Dynamics, Nutrient Cycles, and Biomass
 * Standard: Class 12
 * Exam Weightage: ~8%
 */

export interface CurriculumTopic_ecosystems {
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

export const ecosystems: CurriculumTopic_ecosystems = {
  id: 'ecosystems',
  title: 'Ecosystem Dynamics, Nutrient Cycles, and Biomass',
  subject: 'Biology',
  standard: 12,
  weightagePercent: 8,
  academicCycle: '2025-2026',
  lastReviewed: '2026-10-05',
  revisionNumber: 359,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Ecosystem Dynamics, Nutrient Cycles, and Biomass',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 12,
  sampleProblemCount: 40
};

export default ecosystems;
