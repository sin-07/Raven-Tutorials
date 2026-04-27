/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Biology
 * Topic: Cell Architecture and Membrane Structure
 * Standard: Class 11
 * Exam Weightage: ~10%
 */

export interface CurriculumTopic_cell_the_unit_of_life {
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
  conceptDerivations?: Array<{
    topic: string;
    steps: string[];
    concludingEquation: string;
  }>;
}

export const cell_the_unit_of_life: CurriculumTopic_cell_the_unit_of_life = {
  id: 'cell-the-unit-of-life',
  title: 'Cell Architecture and Membrane Structure',
  subject: 'Biology',
  standard: 11,
  weightagePercent: 10,
  academicCycle: '2025-2026',
  lastReviewed: '2026-10-10',
  revisionNumber: 364,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Cell Architecture and Membrane Structure',
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
  conceptDerivations: [
    {
      topic: 'Core Derivation for Cell Architecture and Membrane Structure',
      steps: [
        'State primary postulates and initial state constraints',
        'Establish differential equilibrium equation',
        'Integrate over standard boundary limits',
        'Formulate definitive solution form'
      ],
      concludingEquation: 'Q(t) = Q_0 * exp(-lambda * t) + C'
    }
  ],
  lastReviewed: '2026-04-27',
  revisionNumber: 365
};

export default cell_the_unit_of_life;
