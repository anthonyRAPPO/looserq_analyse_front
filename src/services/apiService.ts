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

export async function getParticipantByGames(
  gameLst: Game[],
  queue: Queue,
  platform: Platform,
  numberGame: number
): Promise<AxiosResponse> {
  return await axios.post(
    `${process.env.VUE_APP_API_URL}/api/participant/${queue}:${platform}:${numberGame}`,
    gameLst
  );
}

export function getParticipantByPass(): Participant[] {
  return [
    {
      puuid:
        "hXxK3nrVNKCY4UaBUrnUbsqox6b16daqKIlr6cJmZFkfUCmMJFI_nMFNhium3CKHU4pk1_cTc0EcoQ",
      teamId: 100,
      win: false,
      totalWin: 6,
      totalLoose: 4,
      championPlayed: "Aatrox",
      summonerName: "yatsuhurakun",
      teamPosition: Role.TOP,
    },
    {
      puuid:
        "OUxDzaB87Z3HjQ9V3oIz9JH2QhW5YZkcNDhsHUmaMt549Osz4MJjYiSBCw-HlzsFwPCrOr3uQnbu0A",
      teamId: 100,
      win: false,
      totalWin: 7,
      totalLoose: 3,
      championPlayed: "Zed",
      summonerName: "yatsuhura",
      teamPosition: Role.JUNGLE,
    },
    {
      puuid:
        "8QrYRuPvu79-PXPzrsvikF7UQ0vlkiP91Xr9XM1rbeBDApqVo_iw03mukKxGuPWUIzsKcieuAW5ROQ",
      teamId: 100,
      win: false,
      totalWin: 7,
      totalLoose: 3,
      championPlayed: "Veigar",
      summonerName: "TrollerRightHere",
      teamPosition: Role.MIDDLE,
    },
    {
      puuid:
        "dMnaONaHPbWoKbPzE1LU4mVuRLm177U_FACnjQxQcNpGrUf4GIOpHEulojJDT_MIqE2mpQT0NSY37g",
      teamId: 100,
      win: false,
      totalWin: 1,
      totalLoose: 9,
      championPlayed: "Caitlyn",
      summonerName: "CharizardSOCHEAT",
      teamPosition: Role.BOTTOM,
    },
    {
      puuid:
        "DbsPV_uKOfjLTwDh8gJyG9Qv5W9D2-7eDYfstWN4_M1W8Wk0lYHq4YoBY-sjrr-ZixX6CsY6BuCMQA",
      teamId: 100,
      win: false,
      totalWin: 3,
      totalLoose: 7,
      championPlayed: "Lux",
      summonerName: "Apony",
      teamPosition: Role.UTILITY,
    },
    {
      puuid:
        "m8oPr1VgcwZf-yfR798a4TE6TxYfTkZtSQjs0B8Jc1OkEA3M_QFPMAc5sudBRxXMBljctyr_hXBQ8A",
      teamId: 200,
      win: true,
      totalWin: 4,
      totalLoose: 6,
      championPlayed: "Warwick",
      summonerName: "Bilibis",
      teamPosition: Role.TOP,
    },
    {
      puuid:
        "fIP14uAJ2GNhcjlmATTgmi3kSUYWp_XPczjx5sEJpfA-X4rlTY6wyRLC9VsjBSbAX8vh3baacm7GwQ",
      teamId: 200,
      win: true,
      totalWin: 3,
      totalLoose: 7,
      championPlayed: "Nidalee",
      summonerName: "R0UNDABOUT",
      teamPosition: Role.JUNGLE,
    },
    {
      puuid:
        "TFvcEy0PRyRrrOGFQiid6pbp0Z5cdbhLf5e0suCw6OveM8Hv3COlzlZFAMsy0JwJkXJtkbhrFGDyCQ",
      teamId: 200,
      win: true,
      totalWin: 4,
      totalLoose: 6,
      championPlayed: "Yone",
      summonerName: "Ropebutcher",
      teamPosition: Role.MIDDLE,
    },
    {
      puuid:
        "M-C1u5RIkgUlcJq4_6nauO4E6NYb6IzSiD4_tI2-TxCowhRvRcOVUIfThdCxWoab-RPtKZV_hPB5Yg",
      teamId: 200,
      win: true,
      totalWin: 3,
      totalLoose: 7,
      championPlayed: "Kaisa",
      summonerName: "Y4CIN",
      teamPosition: Role.BOTTOM,
    },
    {
      puuid:
        "gVONT5MkariZXv87ViBFhmC24Rja48cCbqWCn3i1rX4jWPzgejhGkU0O7wO8M-Tz6RFYLqqfzchw2A",
      teamId: 200,
      win: true,
      totalWin: 4,
      totalLoose: 6,
      championPlayed: "Amumu",
      summonerName: "Rowya Zarys",
      teamPosition: Role.UTILITY,
    },
  ];
}
