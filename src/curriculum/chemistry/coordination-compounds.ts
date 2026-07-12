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

export const coordination_compounds: CurriculumTopic_coordination_compounds = {
  id: 'coordination-compounds',
  title: 'Coordination Chemistry, Ligands, and Isomerism',
  subject: 'Chemistry',
  standard: 12,
  weightagePercent: 11,
  academicCycle: '2025-2026',
  lastReviewed: '2026-07-12',
  revisionNumber: 323,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Coordination Chemistry, Ligands, and Isomerism',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)',
    'Demonstrate advanced competency in Coordination Chemistry, Ligands, and Isomerism module section #20 for competitive examinations',
    'Demonstrate advanced competency in Coordination Chemistry, Ligands, and Isomerism module section #8 for competitive examinations',
    'Demonstrate advanced competency in Coordination Chemistry, Ligands, and Isomerism module section #20 for competitive examinations',
    'Demonstrate advanced competency in Coordination Chemistry, Ligands, and Isomerism module section #8 for competitive examinations',
    'Demonstrate advanced competency in Coordination Chemistry, Ligands, and Isomerism module section #20 for competitive examinations',
    'Demonstrate advanced competency in Coordination Chemistry, Ligands, and Isomerism module section #8 for competitive examinations',
    'Demonstrate advanced competency in Coordination Chemistry, Ligands, and Isomerism module section #20 for competitive examinations',
    'Demonstrate advanced competency in Coordination Chemistry, Ligands, and Isomerism module section #8 for competitive examinations',
    'Demonstrate advanced competency in Coordination Chemistry, Ligands, and Isomerism module section #20 for competitive examinations'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 17,
  sampleProblemCount: 55,
  commonPitfalls: [
    'Confusing sign conventions during scalar and vector decompositions',
    'Overlooking dimensional consistency in intermediate equations',
    'Neglecting edge-case boundary restrictions in Coordination Chemistry, Ligands, and Isomerism',
    'Premature approximation prior to final algebraic simplification'
  ],
  recommendedResources: [
    'NCERT Exemplar Class 12 - Chapter Core Problems',
    'Raven Tutorials Advanced Lecture Notes & Problem Vault',
    'National Board Previous 10 Years Solved Question Papers',
    'Interactive 3D Visual Concept Simulation Modules'
  ]
};

export default coordination_compounds;
