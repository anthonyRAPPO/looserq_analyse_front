import { Platform } from "@/enumerations/platform";
import { Queue } from "@/enumerations/queue";
import { Role } from "@/enumerations/Role";
import { Game } from "@/interfaces/game";
import { Participant } from "@/interfaces/participant";
import axios, { AxiosResponse } from "axios";

export async function getHistoryByLoginQueueDateCountRegion(
  login: string,
  queue: Queue,
  dateDebut: number,
  dateFin: number,
  count: number,
  platform: Platform
): Promise<AxiosResponse> {
  return await axios.get(
    `${process.env.VUE_APP_API_URL}/api/game/${login}:${queue}:${dateDebut}:${dateFin}:${count}:${platform}`
  );
}

export async function getParticipantByGame(
  game: Game,
  queue: Queue,
  platform: Platform,
  numberGame: number
): Promise<AxiosResponse> {
  return await axios.post(
    `${process.env.VUE_APP_API_URL}/api/participant/${queue}:${platform}:${numberGame}`,
    game
  );
}

export function getParticipantByPass(): Participant[] {
  return [];
}
