export interface TheTriviaApiResponse {
  category:
    | 'music'
    | 'sport_and_leisure'
    | 'film_and_tv'
    | 'arts_and_literature'
    | 'history'
    | 'society_and_culture'
    | 'science'
    | 'geography'
    | 'food_and_drink'
    | 'general_knowledge';
  id: string;
  tags: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  regions: string[];
  isNiche: boolean;
  question: TheTriviaApiQuestion;
  correctAnswer: string;
  incorrectAnswers: string[];
  type: 'text_choice';
}

interface TheTriviaApiQuestion {
  text: string;
}
