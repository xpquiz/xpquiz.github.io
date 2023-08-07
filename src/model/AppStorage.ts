export interface AppStorage {
  lastQuizResponseDate: string | null,
  weekScoreMap: Map<number, WeekScore> | undefined
}

export interface WeekScore {
  score: number,
  rightAnswers: number,
  wrongAnswers: number
}
