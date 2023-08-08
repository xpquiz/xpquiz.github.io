export enum TemplateEnum {
  WEEK_SCORE = "/assets/templates/week_score.mustache"
}

export interface TemplateParams {
}

export interface WeekScoreTemplateParams extends TemplateParams {
  week: number,
  rightAnswers: number,
  wrongAnswers: number,
  totalScore: number
}
