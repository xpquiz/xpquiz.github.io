export enum TemplateEnum {
  WEEK_SCORE = "/assets/templates/week_score.mustache",
  QUESTION_RESULT = "/assets/templates/question_result.mustache",
  QUESTION_RESULT_TRIFECTA = "/assets/templates/question_result_trifecta.mustache"
}

export interface TemplateParams {
}

// Score

export interface WeekScoreTemplateParams extends TemplateParams {
  year: number,
  week: number,
  rightAnswers: number,
  wrongAnswers: number,
  totalScore: number
}

// Normal question

export interface QuestionResultTemplateParams extends TemplateParams {
  question: string,
  questionPoints: number | null,
  selectedAnswer: string,
  rightAnswer: string,
  wrongAnswers: string[]
}

// Trifecta

export interface QuestionResultTrifectaTemplateParams extends TemplateParams {
  questions: string[],
  correctAnswers: string[],
  selectedAnswers: TrifectaSelectedAnswer[],
  questionPoints: number
}

interface TrifectaSelectedAnswer {
  icon: string,
  answer: string,
  points: string
}
