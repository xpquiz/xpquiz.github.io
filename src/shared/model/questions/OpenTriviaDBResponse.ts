export interface OpenTriviaDBResponse {
  response_code: 0 | 1 | 2 | 3 | 4 | 5,
  results: OpenTriviaDBQuestion[]
}

interface OpenTriviaDBQuestion {
  type: string;
  difficulty: string,
  category: 'easy' | 'medium' | 'hard',
  question: string,
  correct_answer: string,
  incorrect_answers: string[]
}
