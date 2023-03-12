import { Platform } from "@/enumerations/platform";
import { Queue } from "@/enumerations/queue";
import { Rank } from "@/enumerations/Rank";
import { Role } from "@/enumerations/Role";
import { Tier } from "@/enumerations/Tier";
import { Game } from "@/interfaces/game";
import { Participant } from "@/interfaces/participant";
import axios, { AxiosResponse } from "axios";

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

export async function getHistoryByLoginQueueDateCountRegion(
  login: string,
  queue: Queue,
  dateDebut: number,
  dateFin: number,
  count: number,
  platform: Platform
): Promise<AxiosResponse> {
  return await axios.get(
    `${process.env.VUE_APP_API_URL}/api/game/${login}:${queue}:${dateDebut}:${dateFin}:${count}:${platform}`,
    config
  );
}

export async function fillParticipantByGame(
  game: Game,
  queue: Queue,
  platform: Platform,
  numberGame: number,
  participantId: string
): Promise<AxiosResponse> {
  return await axios.post(
    `${process.env.VUE_APP_API_URL}/api/participant/${queue}:${platform}:${numberGame}:${participantId}`,
    game,
    config
  );
}

export function getParticipantByPass(): Participant[] {
  return [];
}
