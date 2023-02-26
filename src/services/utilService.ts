import { Game } from "@/interfaces/game";

export function convertDateToEpochSecond(date: Date): number {
  return Math.round(date.getTime() / 1000);
}

export function getSrcImgByGame(game: Game): string {
  return `https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${game.championPlayed}.png`;
}

export function getSrcImgByName(championPlayed: string): string {
  return `https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${championPlayed}.png`;
}

export function getStringDateFromNumber(dateStamp: number): string {
  const date = new Date(0);
  date.setUTCSeconds(dateStamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
  return diffDays + " days ago";
}
