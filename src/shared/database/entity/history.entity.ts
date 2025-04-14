export interface HistoryEntity {
  id?: number,
  date: Date,
  gameMode: 'normal' | 'trifecta' | 'time-rush',
  won: boolean,
  correctAnswers: number,
  wrongAnswers: number,
  totalScore: number,
}
