/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Physics
 * Topic: Electrostatic Potential and Parallel Plate Capacitors
 * Standard: Class 12
 * Exam Weightage: ~10%
 */

export interface CurriculumTopic_capacitance {
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

export const capacitance: CurriculumTopic_capacitance = {
  id: 'capacitance',
  title: 'Electrostatic Potential and Parallel Plate Capacitors',
  subject: 'Physics',
  standard: 12,
  weightagePercent: 10,
  academicCycle: '2025-2026',
  lastReviewed: '2026-09-08',
  revisionNumber: 332,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Electrostatic Potential and Parallel Plate Capacitors',
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
      topic: 'Core Derivation for Electrostatic Potential and Parallel Plate Capacitors',
      steps: [
        'State primary postulates and initial state constraints',
        'Establish differential equilibrium equation',
        'Integrate over standard boundary limits',
        'Formulate definitive solution form'
      ],
      concludingEquation: 'Q(t) = Q_0 * exp(-lambda * t) + C'
    }
  ],
  lastReviewed: '2026-04-07',
  revisionNumber: 333
};

export default capacitance;
