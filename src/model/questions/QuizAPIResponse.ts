export interface QuizAPIResponse {
  id: number,
  question: string,
  description: string,
  answers: QuizAPIResponseAnswers
  multiple_correct_answers: boolean,
  correct_answers: QuizAPIResponseCorrectAnswers
  correct_answer: string,
  explanation: string,
  tip: string,
  tags: QuizAPIResponseTag[],
  category: string,
  difficulty: 'Easy' | 'Medium' | 'Hard'
}

export interface QuizAPIResponseAnswers {
  answer_a: string | null,
  answer_b: string | null,
  answer_c: string | null,
  answer_d: string | null,
  answer_e: string | null,
  answer_f: string | null,
}

export interface QuizAPIResponseCorrectAnswers {
  answer_a_correct: boolean,
  answer_b_correct: boolean,
  answer_c_correct: boolean,
  answer_d_correct: boolean,
  answer_e_correct: boolean,
  answer_f_correct: boolean,
}

interface QuizAPIResponseTag {
  name: string
}
