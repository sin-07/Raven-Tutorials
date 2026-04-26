/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Chemistry
 * Topic: Bohr Model and Quantum Electronic Configurations
 * Standard: Class 11
 * Exam Weightage: ~10%
 */

export interface CurriculumTopic_structure_of_atom {
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

export const structure_of_atom: CurriculumTopic_structure_of_atom = {
  id: 'structure-of-atom',
  title: 'Bohr Model and Quantum Electronic Configurations',
  subject: 'Chemistry',
  standard: 11,
  weightagePercent: 10,
  academicCycle: '2025-2026',
  lastReviewed: '2026-04-26',
  revisionNumber: 354,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Bohr Model and Quantum Electronic Configurations',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 15,
  sampleProblemCount: 50,
  revisionChecklist: [
    'Verify complete mastery of Bohr Model and Quantum Electronic Configurations conceptual derivations and NCERT practice set #5',
    'Verify complete mastery of Bohr Model and Quantum Electronic Configurations conceptual derivations and NCERT practice set #17',
    'Verify complete mastery of Bohr Model and Quantum Electronic Configurations conceptual derivations and NCERT practice set #5',
    'Verify complete mastery of Bohr Model and Quantum Electronic Configurations conceptual derivations and NCERT practice set #17',
    'Verify complete mastery of Bohr Model and Quantum Electronic Configurations conceptual derivations and NCERT practice set #5'
  ]
  conceptDerivations: [
    {
      topic: 'Core Derivation for Bohr Model and Quantum Electronic Configurations',
      steps: [
        'State primary postulates and initial state constraints',
        'Establish differential equilibrium equation',
        'Integrate over standard boundary limits',
        'Formulate definitive solution form'
      ],
      concludingEquation: 'Q(t) = Q_0 * exp(-lambda * t) + C'
    }
  ],
  commonPitfalls: [
    'Confusing sign conventions during scalar and vector decompositions',
    'Overlooking dimensional consistency in intermediate equations',
    'Neglecting edge-case boundary restrictions in Bohr Model and Quantum Electronic Configurations',
    'Premature approximation prior to final algebraic simplification'
  ]
};

export default structure_of_atom;
