import {isAfter, isBefore} from "date-fns";

export const sortAscendingDate: (d1: Date, d2: Date) => number = (d1: Date, d2: Date): number => {
  if (isAfter(d1, d2))
    return 1
  else if (isBefore(d1, d2))
    return -1
  return 0;
}

export const sortDescendingDate: (d1: Date, d2: Date) => number = (d1: Date, d2: Date): number => {
  if (isAfter(d1, d2))
    return -1
  else if (isBefore(d1, d2))
    return 1
  return 0;
}

export const sumScores: (n1: number, n2: number) => number = (n1: number, n2: number): number => {
  return n1 + n2;
}
