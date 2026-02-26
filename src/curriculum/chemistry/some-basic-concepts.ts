/**
 * Raven Tutorials Academic Curriculum Specification
 * Subject: Chemistry
 * Topic: Mole Concept and Stoichiometric Calculations
 * Standard: Class 11
 * Exam Weightage: ~8%
 */

export interface CurriculumTopic_some_basic_concepts {
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

export const some_basic_concepts: CurriculumTopic_some_basic_concepts = {
  id: 'some-basic-concepts',
  title: 'Mole Concept and Stoichiometric Calculations',
  subject: 'Chemistry',
  standard: 11,
  weightagePercent: 8,
  academicCycle: '2025-2026',
  lastReviewed: '2026-09-19',
  revisionNumber: 343,
  learningObjectives: [
    'Master foundational principles and analytical reasoning for Mole Concept and Stoichiometric Calculations',
    'Solve NCERT Exemplar and past 10 years institutional board examination problems',
    'Apply conceptual models in competitive examination formats (JEE / NEET / Boards)'
  ],
  keyFormulaeOrConcepts: [
    'Concept 1: Definition, postulates, and boundary conditions',
    'Concept 2: Derivations, graphical interpretation, and mathematical models',
    'Concept 3: Standard error analysis and edge case resolutions'
  ],
  recommendedHours: 12,
  sampleProblemCount: 40
  conceptDerivations: [
    {
      topic: 'Core Derivation for Mole Concept and Stoichiometric Calculations',
      steps: [
        'State primary postulates and initial state constraints',
        'Establish differential equilibrium equation',
        'Integrate over standard boundary limits',
        'Formulate definitive solution form'
      ],
      concludingEquation: 'Q(t) = Q_0 * exp(-lambda * t) + C'
    }
  ],
  lastReviewed: '2026-02-26',
  revisionNumber: 344
};

export default some_basic_concepts;
