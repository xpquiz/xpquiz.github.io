export interface Question {
  question: string;
  answers: string[];
  correctAnswer: string;
  points: number;
  difficulty: DifficultyType;
  isNiche: boolean;
}

export type DifficultyType = 'easy' | 'medium' | 'hard';
