export interface TriviaResponse {
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
  question: Question;
  correctAnswer: string;
  incorrectAnswers: string[];
  type: 'text_choice';
}

interface Question {
  text: string;
}
