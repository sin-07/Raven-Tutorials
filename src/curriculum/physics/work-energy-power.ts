/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Physics
 * Topic: Work-Energy Theorem and Elastic Collisions
 * Standard: Class 11
 * Exam Weightage: ~10%
 */

export interface CurriculumTopic_work_energy_power {
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
  commonPitfalls?: string[];
  laboratoryExperiments?: Array<{
    title: string;
    apparatus: string[];
    objective: string;
    conceptDerivations?: Array<{
    topic: string;
    steps: string[];
    concludingEquation: string;
  }>;
}>;
}

export const work_energy_power: CurriculumTopic_work_energy_power = {
  id: 'work-energy-power',
  title: 'Work-Energy Theorem and Elastic Collisions',
  subject: 'Physics',
  standard: 11,
  weightagePercent: 10,
  academicCycle: '2025-2026',
  lastReviewed: '2026-08-04',
  revisionNumber: 297,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Work-Energy Theorem and Elastic Collisions',
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
  commonPitfalls: [
    'Confusing sign conventions during scalar and vector decompositions',
    'Overlooking dimensional consistency in intermediate equations',
    'Neglecting edge-case boundary restrictions in Work-Energy Theorem and Elastic Collisions',
    'Premature approximation prior to final algebraic simplification'
  ],
  lastReviewed: '2026-04-22',
  revisionNumber: 298
  laboratoryExperiments: [
    {
      title: 'Experimental Verification for Work-Energy Theorem and Elastic Collisions',
      apparatus: ['Standard test bench', 'Precision multimeter / sensor kit', 'Calibration weights'],
      objective: 'Empirically verify theoretical predictions and quantify experimental error percentage'
    }
  ],
  lastReviewed: '2026-07-10',
  revisionNumber: 298
  conceptDerivations: [
    {
      topic: 'Core Derivation for Work-Energy Theorem and Elastic Collisions',
      steps: [
        'State primary postulates and initial state constraints',
        'Establish differential equilibrium equation',
        'Integrate over standard boundary limits',
        'Formulate definitive solution form'
      ],
      concludingEquation: 'Q(t) = Q_0 * exp(-lambda * t) + C'
    }
  ],
  lastReviewed: '2026-07-15',
  revisionNumber: 298
};

export default work_energy_power;
