import { Participant } from "./participant";

export interface Game {
  id: string;
  timeStampCreation: number;
  allyTeam: number;
  win: boolean;
  lstParticipants: Participant[];
  championPlayed: string;
  uuidPlayer: string;
  assists: number;
  deaths: number;
  kills: number;
}
