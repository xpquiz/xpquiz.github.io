export enum TemplateEnum {
  WEEK_SCORE = "/assets/templates/week_score.mustache",
  QUESTION_RESULT = "/assets/templates/question_result.mustache"
}

export interface TemplateParams {
}

export interface WeekScoreTemplateParams extends TemplateParams {
  year: number,
  week: number,
  rightAnswers: number,
  wrongAnswers: number,
  totalScore: number
}

export interface QuestionResultTemplateParams extends TemplateParams {
  question: string,
  questionPoints: number | null,
  selectedAnswer: string,
  rightAnswer: string,
  wrongAnswers: string[]
}
