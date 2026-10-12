/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: English
 * Topic: Structured Note-Making and Abbreviation Syntax
 * Standard: Class 11
 * Exam Weightage: ~10%
 */

export interface CurriculumTopic_note_making_summarizing {
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

export const note_making_summarizing: CurriculumTopic_note_making_summarizing = {
  id: 'note-making-summarizing',
  title: 'Structured Note-Making and Abbreviation Syntax',
  subject: 'English',
  standard: 11,
  weightagePercent: 10,
  academicCycle: '2025-2026',
  lastReviewed: '2026-05-27',
  revisionNumber: 351,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Structured Note-Making and Abbreviation Syntax',
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
  conceptDerivations: [
    {
      topic: 'Core Derivation for Structured Note-Making and Abbreviation Syntax',
      steps: [
        'State primary postulates and initial state constraints',
        'Establish differential equilibrium equation',
        'Integrate over standard boundary limits',
        'Formulate definitive solution form'
      ],
      concludingEquation: 'Q(t) = Q_0 * exp(-lambda * t) + C'
    }
  ]
};

export default note_making_summarizing;
