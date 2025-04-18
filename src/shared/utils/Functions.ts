import {isAfter, isBefore} from "date-fns";
import {HistoryEntity} from "@Shared/database/entity/history.entity";

export const sortAscendingDate = (d1: Date, d2: Date): number => {
  if (isAfter(d1, d2))
    return 1
  else if (isBefore(d1, d2))
    return -1
  return 0;
}

export const sortDescendingDate = (d1: Date, d2: Date): number => {
  if (isAfter(d1, d2))
    return -1
  else if (isBefore(d1, d2))
    return 1
  return 0;
}

export const sumScoresFromMatches = (h1: HistoryEntity, h2: HistoryEntity): number => {
  return h1.totalPoints + h2.totalPoints;
}

export const sumScores = (n1: number, n2: number): number => {
  return n1 + n2;
}
