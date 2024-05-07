export interface Question {
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  isNiche: boolean;
}
