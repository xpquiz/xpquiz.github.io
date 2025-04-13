export interface AppStorage {
  lastQuizResponseDate: string | null,
  yearScoreMap: Map<number, Map<number, WeekScore>>
}

export interface WeekScore {
  score: number,
  rightAnswers: number,
  wrongAnswers: number
}
