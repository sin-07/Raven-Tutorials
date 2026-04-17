/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Physics
 * Topic: Reflection, Refraction, and Lens Maker Formula
 * Standard: Class 12
 * Exam Weightage: ~15%
 */

export interface CurriculumTopic_ray_optics {
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

export const ray_optics: CurriculumTopic_ray_optics = {
  id: 'ray-optics',
  title: 'Reflection, Refraction, and Lens Maker Formula',
  subject: 'Physics',
  standard: 12,
  weightagePercent: 15,
  academicCycle: '2025-2026',
  lastReviewed: '2026-10-03',
  revisionNumber: 357,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Reflection, Refraction, and Lens Maker Formula',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 23,
  sampleProblemCount: 75
  laboratoryExperiments: [
    {
      title: 'Experimental Verification for Reflection, Refraction, and Lens Maker Formula',
      apparatus: ['Standard test bench', 'Precision multimeter / sensor kit', 'Calibration weights'],
      objective: 'Empirically verify theoretical predictions and quantify experimental error percentage'
    }
  ],
  lastReviewed: '2026-04-12',
  revisionNumber: 358
  conceptDerivations: [
    {
      topic: 'Core Derivation for Reflection, Refraction, and Lens Maker Formula',
      steps: [
        'State primary postulates and initial state constraints',
        'Establish differential equilibrium equation',
        'Integrate over standard boundary limits',
        'Formulate definitive solution form'
      ],
      concludingEquation: 'Q(t) = Q_0 * exp(-lambda * t) + C'
    }
  ],
  lastReviewed: '2026-04-17',
  revisionNumber: 358
};

export default ray_optics;
