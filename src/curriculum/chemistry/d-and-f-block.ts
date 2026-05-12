/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Chemistry
 * Topic: Transition Metals and Lanthanoid Contraction
 * Standard: Class 12
 * Exam Weightage: ~9%
 */

export interface CurriculumTopic_d_and_f_block {
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
  realWorldApplications?: string[];
  practiceQuestions?: Array<{
    id: string;
    question: string;
    difficulty: 'easy' | 'medium' | 'hard';
    marks: number;
    hint?: string;
    recommendedResources?: string[];
}>;
}

export const d_and_f_block: CurriculumTopic_d_and_f_block = {
  id: 'd-and-f-block',
  title: 'Transition Metals and Lanthanoid Contraction',
  subject: 'Chemistry',
  standard: 12,
  weightagePercent: 9,
  academicCycle: '2025-2026',
  lastReviewed: '2026-08-15',
  revisionNumber: 308,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Transition Metals and Lanthanoid Contraction',
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
  realWorldApplications: [
    'Industrial automation and precision measurement sensors',
    'Biomedical diagnostics and pharmacological formulation analysis',
    'Computational simulations and algorithmic optimization in aerospace',
    'Modern renewable energy grid stabilization techniques'
  ],
  lastReviewed: '2026-02-17',
  revisionNumber: 309
  practiceQuestions: [
    {
      id: 'pq-1',
      question: 'Explain the fundamental theorem and underlying physical/mathematical model of Transition Metals and Lanthanoid Contraction.',
      difficulty: 'easy',
      marks: 2,
      hint: 'Recall core definitions and standard boundary conditions.'
    },
    {
      id: 'pq-2',
      question: 'Derive the analytical expression for Transition Metals and Lanthanoid Contraction under standard Class 12 test scenarios.',
      difficulty: 'medium',
      marks: 3,
      hint: 'Apply step-by-step mathematical substitution.'
    },
    {
      id: 'pq-3',
      question: 'Evaluate an edge-case problem involving composite systems in Transition Metals and Lanthanoid Contraction.',
      difficulty: 'hard',
      marks: 5,
      hint: 'Check conservation laws and symmetry properties.'
    }
  ],
  lastReviewed: '2026-02-21',
  revisionNumber: 309
  recommendedResources: [
    'NCERT Exemplar Class 12 - Chapter Core Problems',
    'Raven Tutorials Advanced Lecture Notes & Problem Vault',
    'National Board Previous 10 Years Solved Question Papers',
    'Interactive 3D Visual Concept Simulation Modules'
  ],
  lastReviewed: '2026-05-12',
  revisionNumber: 309
};

export default d_and_f_block;
