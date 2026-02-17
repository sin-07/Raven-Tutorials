/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Chemistry
 * Topic: Coordination Chemistry, Ligands, and Isomerism
 * Standard: Class 12
 * Exam Weightage: ~11%
 */

export interface CurriculumTopic_coordination_compounds {
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
  recommendedResources?: string[];
}

export const coordination_compounds: CurriculumTopic_coordination_compounds = {
  id: 'coordination-compounds',
  title: 'Coordination Chemistry, Ligands, and Isomerism',
  subject: 'Chemistry',
  standard: 12,
  weightagePercent: 11,
  academicCycle: '2025-2026',
  lastReviewed: '2026-08-20',
  revisionNumber: 313,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Coordination Chemistry, Ligands, and Isomerism',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 17,
  sampleProblemCount: 55
  recommendedResources: [
    'NCERT Exemplar Class 12 - Chapter Core Problems',
    'Raven Tutorials Advanced Lecture Notes & Problem Vault',
    'National Board Previous 10 Years Solved Question Papers',
    'Interactive 3D Visual Concept Simulation Modules'
  ],
  lastReviewed: '2026-02-17',
  revisionNumber: 314
};

export default coordination_compounds;
