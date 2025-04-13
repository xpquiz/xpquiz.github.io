export interface QuizAPIResponse {
  id: number,
  question: string,
  description: string,
  answers: QuizAPIResponseAnswers
  multiple_correct_answers: string,
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
  answer_a_correct: string,
  answer_b_correct: string,
  answer_c_correct: string,
  answer_d_correct: string,
  answer_e_correct: string,
  answer_f_correct: string,
}

interface QuizAPIResponseTag {
  name: string
}
