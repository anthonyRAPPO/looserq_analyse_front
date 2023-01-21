import { Platform } from "@/enumerations/platform";
import { Queue } from "@/enumerations/queue";
import { Game } from "@/interfaces/game";
import { Participant } from "@/interfaces/participant";
import axios, { AxiosResponse } from "axios";

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
  const lstParticipant: Participant[] = [];
  lstParticipant.push({
    puuid:
      "hXxK3nrVNKCY4UaBUrnUbsqox6b16daqKIlr6cJmZFkfUCmMJFI_nMFNhium3CKHU4pk1_cTc0EcoQ",
    teamId: 100,
    win: false,
    totalLoose: 4,
    totalWin: 6,
  });
  lstParticipant.push({
    puuid:
      "OUxDzaB87Z3HjQ9V3oIz9JH2QhW5YZkcNDhsHUmaMt549Osz4MJjYiSBCw-HlzsFwPCrOr3uQnbu0A",
    teamId: 100,
    win: false,
    totalLoose: 7,
    totalWin: 3,
  });
  lstParticipant.push({
    puuid: "PXPzrsvikF7UQ0vlkiP91Xr9XM1rbeBDApqVo_iw03mukKxGuPWUIzsKcieuAW5ROQ",
    teamId: 100,
    win: false,
    totalLoose: 5,
    totalWin: 5,
  });
  lstParticipant.push({
    puuid:
      "dMnaONaHPbWoKbPzE1LU4mVuRLm177U_FACnjQxQcNpGrUf4GIOpHEulojJDT_MIqE2mpQT0NSY37g",
    teamId: 100,
    win: false,
    totalLoose: 4,
    totalWin: 6,
  });
  lstParticipant.push({
    puuid:
      "DbsPV_uKOfjLTwDh8gJyG9Qv5W9D2-7eDYfstWN4_M1W8Wk0lYHq4YoBY-sjrr-ZixX6CsY6BuCMQA",
    teamId: 100,
    win: false,
    totalLoose: 3,
    totalWin: 7,
  });
  lstParticipant.push({
    puuid:
      "hXxK3nrVNKCY4UaBUrnUbsqox6b16daqKIlr6cJmZFkfUCmMJFI_nMFNhium3CKHU4pk1_cTc0EcoQ",
    teamId: 200,
    win: true,
    totalLoose: 8,
    totalWin: 2,
  });
  lstParticipant.push({
    puuid:
      "hXxK3nrVNKCY4UaBUrnUbsqox6b16daqKIlr6cJmZFkfUCmMJFI_nMFNhium3CKHU4pk1_cTc0EcoQ",
    teamId: 200,
    win: true,
    totalLoose: 5,
    totalWin: 5,
  });
  lstParticipant.push({
    puuid:
      "hXxK3nrVNKCY4UaBUrnUbsqox6b16daqKIlr6cJmZFkfUCmMJFI_nMFNhium3CKHU4pk1_cTc0EcoQ",
    teamId: 200,
    win: true,
    totalLoose: 6,
    totalWin: 4,
  });
  lstParticipant.push({
    puuid:
      "hXxK3nrVNKCY4UaBUrnUbsqox6b16daqKIlr6cJmZFkfUCmMJFI_nMFNhium3CKHU4pk1_cTc0EcoQ",
    teamId: 200,
    win: true,
    totalLoose: 4,
    totalWin: 6,
  });
  lstParticipant.push({
    puuid:
      "hXxK3nrVNKCY4UaBUrnUbsqox6b16daqKIlr6cJmZFkfUCmMJFI_nMFNhium3CKHU4pk1_cTc0EcoQ",
    teamId: 200,
    win: true,
    totalLoose: 5,
    totalWin: 5,
  });
  return lstParticipant;
}
