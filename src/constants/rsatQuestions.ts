export interface RSATQuestion {
  id: number;
  subject: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export const rsatQuestionBank: RSATQuestion[] = [
  {
    id: 1,
    subject: 'Physics',
    question: 'A car accelerates uniformly from rest to a speed of 20 m/s in 10 seconds. What is its acceleration?',
    options: ['1 m/s²', '2 m/s²', '0.5 m/s²', '4 m/s²'],
    correctAnswer: '2 m/s²',
  },
  {
    id: 2,
    subject: 'Physics',
    question: 'Which law of motion gives the measure of force (F = ma)?',
    options: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", 'Law of Gravitation'],
    correctAnswer: "Newton's Second Law",
  },
  {
    id: 3,
    subject: 'Physics',
    question: 'What is the SI unit of electric potential difference?',
    options: ['Ampere', 'Volt', 'Ohm', 'Coulomb'],
    correctAnswer: 'Volt',
  },
  {
    id: 4,
    subject: 'Physics',
    question: 'An object is placed at the focal point of a concave mirror. Where is the image formed?',
    options: ['At the focus', 'At the center of curvature', 'At infinity', 'Between focus and pole'],
    correctAnswer: 'At infinity',
  },
  {
    id: 5,
    subject: 'Physics',
    question: 'The refractive index of glass with respect to air is 1.5. What is the speed of light in glass? (c = 3 × 10⁸ m/s)',
    options: ['2 × 10⁸ m/s', '1.5 × 10⁸ m/s', '2.5 × 10⁸ m/s', '3 × 10⁸ m/s'],
    correctAnswer: '2 × 10⁸ m/s',
  },
  {
    id: 6,
    subject: 'Chemistry',
    question: 'What is the pH value of pure water at 25°C?',
    options: ['0', '7', '14', '1'],
    correctAnswer: '7',
  },
  {
    id: 7,
    subject: 'Chemistry',
    question: 'Which gas is released when dilute hydrochloric acid reacts with zinc granules?',
    options: ['Oxygen', 'Carbon dioxide', 'Hydrogen', 'Nitrogen'],
    correctAnswer: 'Hydrogen',
  },
  {
    id: 8,
    subject: 'Chemistry',
    question: 'What is the chemical formula for Plaster of Paris?',
    options: ['CaSO₄ · 2H₂O', 'CaSO₄ · ½H₂O', 'CaSO₄ · H₂O', 'CaCO₃'],
    correctAnswer: 'CaSO₄ · ½H₂O',
  },
  {
    id: 9,
    subject: 'Chemistry',
    question: 'Which of the following is the most electronegative element in the periodic table?',
    options: ['Chlorine', 'Oxygen', 'Fluorine', 'Nitrogen'],
    correctAnswer: 'Fluorine',
  },
  {
    id: 10,
    subject: 'Chemistry',
    question: 'The process of coating iron with zinc to prevent rusting is called:',
    options: ['Corrosion', 'Galvanization', 'Alloying', 'Electroplating'],
    correctAnswer: 'Galvanization',
  },
  {
    id: 11,
    subject: 'Mathematics',
    question: 'If the roots of quadratic equation ax² + bx + c = 0 are equal, then the discriminant (D) is:',
    options: ['D > 0', 'D < 0', 'D = 0', 'D ≥ 0'],
    correctAnswer: 'D = 0',
  },
  {
    id: 12,
    subject: 'Mathematics',
    question: 'What is the 10th term of the Arithmetic Progression (AP): 2, 7, 12, 17, ...?',
    options: ['45', '47', '50', '52'],
    correctAnswer: '47',
  },
  {
    id: 13,
    subject: 'Mathematics',
    question: 'If sin θ = 3/5, what is the value of cos θ (for acute angle θ)?',
    options: ['4/5', '3/4', '5/4', '1/2'],
    correctAnswer: '4/5',
  },
  {
    id: 14,
    subject: 'Mathematics',
    question: 'What is the volume of a sphere of radius r?',
    options: ['(4/3) πr³', '4 πr²', '(2/3) πr³', 'πr²h'],
    correctAnswer: '(4/3) πr³',
  },
  {
    id: 15,
    subject: 'Mathematics',
    question: 'If two dice are rolled simultaneously, what is the probability of getting a sum equal to 7?',
    options: ['1/12', '1/6', '5/36', '7/36'],
    correctAnswer: '1/6',
  },
  {
    id: 16,
    subject: 'Aptitude & Logic',
    question: 'Find the next number in the series: 3, 7, 15, 31, 63, ?',
    options: ['95', '127', '128', '125'],
    correctAnswer: '127',
  },
  {
    id: 17,
    subject: 'Aptitude & Logic',
    question: 'Pointing to a photograph, Rohan said: "Her mother is the only daughter of my mother." How is Rohan related to the person in the photograph?',
    options: ['Brother', 'Father', 'Uncle', 'Grandfather'],
    correctAnswer: 'Father',
  },
  {
    id: 18,
    subject: 'Aptitude & Logic',
    question: 'If CLOCK is coded as KCOLC, then how will RAVEN be coded in that code?',
    options: ['NEVAR', 'ANVER', 'NEVRA', 'NAREV'],
    correctAnswer: 'NEVAR',
  },
  {
    id: 19,
    subject: 'General Science',
    question: 'Which organelle is universally known as the powerhouse of the cell?',
    options: ['Ribosome', 'Golgi apparatus', 'Mitochondria', 'Nucleus'],
    correctAnswer: 'Mitochondria',
  },
  {
    id: 20,
    subject: 'General Science',
    question: 'What is the normal atmospheric pressure at sea level in Pascals (approx)?',
    options: ['1.013 × 10⁵ Pa', '1.013 × 10³ Pa', '10⁵ kPa', '760 Pa'],
    correctAnswer: '1.013 × 10⁵ Pa',
  },
];
