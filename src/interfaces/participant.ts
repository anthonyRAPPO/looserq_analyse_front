import { Role } from "../enumerations/Role";

export interface Participant {
  puuid: string;
  teamId: number;
  win: boolean;
  totalWin: number;
  totalLoose: number;
  championPlayed: string;
  summonerName: string;
  teamPosition: Role;
}
