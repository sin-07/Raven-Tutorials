/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Conic Sections: Parabola, Ellipse, and Hyperbola
 * Standard: Class 11
 * Exam Weightage: ~12%
 */

export interface CurriculumTopic_conic_sections {
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
    examWeightageBreakdown?: {
    shortAnswerMarks: number;
    longAnswerMarks: number;
    numericalMarks: number;
    practicalMarks: number;
  };
}>;
}>;
}

export const conic_sections: CurriculumTopic_conic_sections = {
  id: 'conic-sections',
  title: 'Conic Sections: Parabola, Ellipse, and Hyperbola',
  subject: 'Mathematics',
  standard: 11,
  weightagePercent: 12,
  academicCycle: '2025-2026',
  lastReviewed: '2026-05-30',
  revisionNumber: 231,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Conic Sections: Parabola, Ellipse, and Hyperbola',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 18,
  sampleProblemCount: 60
  laboratoryExperiments: [
    {
      title: 'Experimental Verification for Conic Sections: Parabola, Ellipse, and Hyperbola',
      apparatus: ['Standard test bench', 'Precision multimeter / sensor kit', 'Calibration weights'],
      objective: 'Empirically verify theoretical predictions and quantify experimental error percentage'
    }
  ],
  lastReviewed: '2026-03-08',
  revisionNumber: 232
  conceptDerivations: [
    {
      topic: 'Core Derivation for Conic Sections: Parabola, Ellipse, and Hyperbola',
      steps: [
        'State primary postulates and initial state constraints',
        'Establish differential equilibrium equation',
        'Integrate over standard boundary limits',
        'Formulate definitive solution form'
      ],
      concludingEquation: 'Q(t) = Q_0 * exp(-lambda * t) + C'
    }
  ],
  lastReviewed: '2026-03-13',
  revisionNumber: 232
  examWeightageBreakdown: {
    shortAnswerMarks: 4,
    longAnswerMarks: 6,
    numericalMarks: 5,
    practicalMarks: 3
  },
  lastReviewed: '2026-06-07',
  revisionNumber: 232
};

export default conic_sections;
