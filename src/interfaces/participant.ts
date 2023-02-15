import { Rank } from "@/enumerations/Rank";
import { Tier } from "@/enumerations/Tier";
import { Role } from "../enumerations/Role";

export interface Participant {
  id: string;
  puuid: string;
  teamId: number;
  win: boolean;
  totalWin: number;
  totalLoose: number;
  championPlayed: string;
  summonerName: string;
  teamPosition: Role;
  ally: boolean;
  tier: Tier;
  rank: Rank;
  leaguePoints: number;
  totalWinSeason: number;
  totalLooseSeason: number;
  calculatedElo: number;
  kill: number;
  death: number;
  assist: number;
  kda: number;
  gold: number;
  dmgDealt: number;
  dmgTaken: number;
  visionScore: number;
  totalcs: number;
  longestTimeLiving: number;
}
