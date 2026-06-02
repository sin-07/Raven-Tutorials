/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Mathematics
 * Topic: Application of Derivatives: Tangents & Maxima-Minima
 * Standard: Class 12
 * Exam Weightage: ~15%
 */

export interface CurriculumTopic_application_of_derivatives {
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
    examWeightageBreakdown?: {
    shortAnswerMarks: number;
    longAnswerMarks: number;
    numericalMarks: number;
    practicalMarks: number;
  };
}>;
}

export const application_of_derivatives: CurriculumTopic_application_of_derivatives = {
  id: 'application-of-derivatives',
  title: 'Application of Derivatives: Tangents & Maxima-Minima',
  subject: 'Mathematics',
  standard: 12,
  weightagePercent: 15,
  academicCycle: '2025-2026',
  lastReviewed: '2026-06-24',
  revisionNumber: 256,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Application of Derivatives: Tangents & Maxima-Minima',
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
  conceptDerivations: [
    {
      topic: 'Core Derivation for Application of Derivatives: Tangents & Maxima-Minima',
      steps: [
        'State primary postulates and initial state constraints',
        'Establish differential equilibrium equation',
        'Integrate over standard boundary limits',
        'Formulate definitive solution form'
      ],
      concludingEquation: 'Q(t) = Q_0 * exp(-lambda * t) + C'
    }
  ],
  lastReviewed: '2026-03-08',
  revisionNumber: 257
  examWeightageBreakdown: {
    shortAnswerMarks: 4,
    longAnswerMarks: 6,
    numericalMarks: 5,
    practicalMarks: 3
  },
  lastReviewed: '2026-06-02',
  revisionNumber: 257
};

export default application_of_derivatives;
