import { Platform } from "@/enumerations/platform";
import { Queue } from "@/enumerations/queue";
import { Rank } from "@/enumerations/Rank";
import { Role } from "@/enumerations/Role";
import { Tier } from "@/enumerations/Tier";
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
  return [
    {
      id: "QBGNsX8ULRqNxhiFl7Ngi5IlyiKLx7f-y3Z40RPGBANEP5oBbTxQGLT3cA",
      puuid:
        "hXxK3nrVNKCY4UaBUrnUbsqox6b16daqKIlr6cJmZFkfUCmMJFI_nMFNhium3CKHU4pk1_cTc0EcoQ",
      teamId: 100,
      win: false,
      totalWin: 6,
      totalLoose: 4,
      championPlayed: "Aatrox",
      summonerName: "yatsuhurakun",
      teamPosition: Role.TOP,
      tier: Tier.GOLD,
      rank: Rank.IV,
      leaguePoints: 1,
      totalWinSeason: 13,
      totalLooseSeason: 12,
      calculatedElo: 1201,
      ally: true,
    },
    {
      id: "_b0pjZSo1T-zkRufI_NrUXWMjXlDorxskma1eyMkGpuLXNajJuM1MJVBSQ",
      puuid:
        "OUxDzaB87Z3HjQ9V3oIz9JH2QhW5YZkcNDhsHUmaMt549Osz4MJjYiSBCw-HlzsFwPCrOr3uQnbu0A",
      teamId: 100,
      win: false,
      totalWin: 7,
      totalLoose: 3,
      championPlayed: "Zed",
      summonerName: "yatsuhura",
      teamPosition: Role.JUNGLE,
      tier: Tier.EMPTY,
      rank: Rank.EMPTY,
      leaguePoints: -1,
      totalWinSeason: -1,
      totalLooseSeason: -1,
      calculatedElo: 0,
      ally: true,
    },
    {
      id: "eFNsjdbtl2XM5PNCHmgokHPdgNvnuYVg6GCdvbuBxY39zF1xt4GGCzz48g",
      puuid:
        "8QrYRuPvu79-PXPzrsvikF7UQ0vlkiP91Xr9XM1rbeBDApqVo_iw03mukKxGuPWUIzsKcieuAW5ROQ",
      teamId: 100,
      win: false,
      totalWin: 7,
      totalLoose: 3,
      championPlayed: "Veigar",
      summonerName: "TrollerRightHere",
      teamPosition: Role.MIDDLE,
      tier: Tier.GOLD,
      rank: Rank.III,
      leaguePoints: 18,
      totalWinSeason: 33,
      totalLooseSeason: 34,
      calculatedElo: 1318,
      ally: true,
    },
    {
      id: "VJOc09qc6-m4gTj2jLvXw_uMzTYPQR9FXoyP8KOserg2YCLH",
      puuid:
        "dMnaONaHPbWoKbPzE1LU4mVuRLm177U_FACnjQxQcNpGrUf4GIOpHEulojJDT_MIqE2mpQT0NSY37g",
      teamId: 100,
      win: false,
      totalWin: 1,
      totalLoose: 9,
      championPlayed: "Caitlyn",
      summonerName: "CharizardSOCHEAT",
      teamPosition: Role.BOTTOM,
      tier: Tier.SILVER,
      rank: Rank.II,
      leaguePoints: 13,
      totalWinSeason: 11,
      totalLooseSeason: 20,
      calculatedElo: 1013,
      ally: true,
    },
    {
      id: "f6SNwA9-trr-7YFK5I73rsxoJ26UbPjY98EyCu05T6fOHFU",
      puuid:
        "DbsPV_uKOfjLTwDh8gJyG9Qv5W9D2-7eDYfstWN4_M1W8Wk0lYHq4YoBY-sjrr-ZixX6CsY6BuCMQA",
      teamId: 100,
      win: false,
      totalWin: 3,
      totalLoose: 7,
      championPlayed: "Lux",
      summonerName: "Apony",
      teamPosition: Role.UTILITY,
      tier: Tier.EMPTY,
      rank: Rank.EMPTY,
      leaguePoints: -1,
      totalWinSeason: -1,
      totalLooseSeason: -1,
      calculatedElo: 0,
      ally: true,
    },
    {
      id: "kwqLMojsCKXZc1qkky1YaDYzj5lJBsYtTF9mX8Aa3zN1U1Y",
      puuid:
        "m8oPr1VgcwZf-yfR798a4TE6TxYfTkZtSQjs0B8Jc1OkEA3M_QFPMAc5sudBRxXMBljctyr_hXBQ8A",
      teamId: 200,
      win: true,
      totalWin: 4,
      totalLoose: 6,
      championPlayed: "Warwick",
      summonerName: "Bilibis",
      teamPosition: Role.TOP,
      tier: Tier.EMPTY,
      rank: Rank.EMPTY,
      leaguePoints: -1,
      totalWinSeason: -1,
      totalLooseSeason: -1,
      calculatedElo: 0,
      ally: false,
    },
    {
      id: "urtkkEW2un8Xk6DiwucnojpG-4ROYHiGb_4eKez0zXJKUVuh",
      puuid:
        "fIP14uAJ2GNhcjlmATTgmi3kSUYWp_XPczjx5sEJpfA-X4rlTY6wyRLC9VsjBSbAX8vh3baacm7GwQ",
      teamId: 200,
      win: true,
      totalWin: 3,
      totalLoose: 7,
      championPlayed: "Nidalee",
      summonerName: "R0UNDABOUT",
      teamPosition: Role.JUNGLE,
      tier: Tier.SILVER,
      rank: Rank.II,
      leaguePoints: 39,
      totalWinSeason: 9,
      totalLooseSeason: 10,
      calculatedElo: 1039,
      ally: false,
    },
    {
      id: "AEqYz-uDwv-hfTbUKGqQ-bOkolT93tDVHCNB1hRpVoStYy4",
      puuid:
        "TFvcEy0PRyRrrOGFQiid6pbp0Z5cdbhLf5e0suCw6OveM8Hv3COlzlZFAMsy0JwJkXJtkbhrFGDyCQ",
      teamId: 200,
      win: true,
      totalWin: 4,
      totalLoose: 6,
      championPlayed: "Yone",
      summonerName: "Ropebutcher",
      teamPosition: Role.MIDDLE,
      tier: Tier.SILVER,
      rank: Rank.III,
      leaguePoints: 39,
      totalWinSeason: 5,
      totalLooseSeason: 10,
      calculatedElo: 939,
      ally: false,
    },
    {
      id: "Ag9mFV4hcO27-dCMv8pgZQkTGzBerF7ZJ5iMj1hOI_WgU3c",
      puuid:
        "M-C1u5RIkgUlcJq4_6nauO4E6NYb6IzSiD4_tI2-TxCowhRvRcOVUIfThdCxWoab-RPtKZV_hPB5Yg",
      teamId: 200,
      win: true,
      totalWin: 3,
      totalLoose: 7,
      championPlayed: "Kaisa",
      summonerName: "Y4CIN",
      teamPosition: Role.BOTTOM,
      tier: Tier.SILVER,
      rank: Rank.II,
      leaguePoints: 68,
      totalWinSeason: 25,
      totalLooseSeason: 28,
      calculatedElo: 1068,
      ally: false,
    },
    {
      id: "eg1ENd-euKeGLqWVuv8RmUom5OlpaQ1qoA8AolcT01uzPiU5GS9gAp1R7w",
      puuid:
        "gVONT5MkariZXv87ViBFhmC24Rja48cCbqWCn3i1rX4jWPzgejhGkU0O7wO8M-Tz6RFYLqqfzchw2A",
      teamId: 200,
      win: true,
      totalWin: 4,
      totalLoose: 6,
      championPlayed: "Amumu",
      summonerName: "Rowya Zarys",
      teamPosition: Role.UTILITY,
      tier: Tier.GOLD,
      rank: Rank.III,
      leaguePoints: 53,
      totalWinSeason: 13,
      totalLooseSeason: 19,
      calculatedElo: 1253,
      ally: false,
    },
  ];
}
