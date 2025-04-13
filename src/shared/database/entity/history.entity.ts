export interface HistoryEntity {
  id: number,
  date: Date,
  gameMode: string,
  won: boolean,
  correctAnswers: number,
  wrongAnswers: number,
  totalScore: number,
}
