import { Platform } from "@/enumerations/platform";
import { Queue } from "@/enumerations/queue";
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
