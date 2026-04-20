/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Chemistry
 * Topic: VSEPR Theory and Molecular Orbital Theory
 * Standard: Class 11
 * Exam Weightage: ~13%
 */

export interface CurriculumTopic_chemical_bonding {
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

export const chemical_bonding: CurriculumTopic_chemical_bonding = {
  id: 'chemical-bonding',
  title: 'VSEPR Theory and Molecular Orbital Theory',
  subject: 'Chemistry',
  standard: 11,
  weightagePercent: 13,
  academicCycle: '2025-2026',
  lastReviewed: '2026-04-20',
  revisionNumber: 359,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for VSEPR Theory and Molecular Orbital Theory',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 20,
  sampleProblemCount: 65,
  revisionChecklist: [
    'Verify complete mastery of VSEPR Theory and Molecular Orbital Theory conceptual derivations and NCERT practice set #17',
    'Verify complete mastery of VSEPR Theory and Molecular Orbital Theory conceptual derivations and NCERT practice set #5',
    'Verify complete mastery of VSEPR Theory and Molecular Orbital Theory conceptual derivations and NCERT practice set #17',
    'Verify complete mastery of VSEPR Theory and Molecular Orbital Theory conceptual derivations and NCERT practice set #5',
    'Verify complete mastery of VSEPR Theory and Molecular Orbital Theory conceptual derivations and NCERT practice set #17'
  ]
  practiceQuestions: [
    {
      id: 'pq-1',
      question: 'Explain the fundamental theorem and underlying physical/mathematical model of VSEPR Theory and Molecular Orbital Theory.',
      difficulty: 'easy',
      marks: 2,
      hint: 'Recall core definitions and standard boundary conditions.'
    },
    {
      id: 'pq-2',
      question: 'Derive the analytical expression for VSEPR Theory and Molecular Orbital Theory under standard Class 11 test scenarios.',
      difficulty: 'medium',
      marks: 3,
      hint: 'Apply step-by-step mathematical substitution.'
    },
    {
      id: 'pq-3',
      question: 'Evaluate an edge-case problem involving composite systems in VSEPR Theory and Molecular Orbital Theory.',
      difficulty: 'hard',
      marks: 5,
      hint: 'Check conservation laws and symmetry properties.'
    }
  ],
  examWeightageBreakdown: {
    shortAnswerMarks: 4,
    longAnswerMarks: 6,
    numericalMarks: 5,
    practicalMarks: 3
  }
};

export default chemical_bonding;
