export interface AllTimeScoreInfo {
  totalGamesPlayed: number;
  totalWins: number;
  totalLosses: number;
  totalPointsEarned: number;
  totalPointsMissed: number;
  correctAnswers: number;
  wrongAnswers: number;
  firstGamePlayed: Date;
  lastGamePlayed: Date;
  lastDefeat: Date;
  firstDefeat: Date;
  firstVictory: Date;
  lastVictory: Date
}
