export function convertDateToEpochSecond(date: Date): number {
  return Math.round(date.getTime() / 1000);
}
