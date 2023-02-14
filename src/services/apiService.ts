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
      id: "I1Hnozfn6gpviHah6sFpRVyaji8GNiYDY2JP7PiG1fz4hJsI",
      puuid:
        "-t9bYpowsP6r1LFLl59BoUCURXBq17qS0vL1Tq9n9BTpVA8vVa1ofN1DBodeoc5Nc5jwz0y9lmgltg",
      teamId: 100,
      win: true,
      totalWin: 5,
      totalLoose: 5,
      championPlayed: "Kennen",
      summonerName: "Zaweka",
      teamPosition: Role.TOP,
      tier: Tier.CHALLENGER,
      rank: Rank.I,
      leaguePoints: 770,
      totalWinSeason: 241,
      totalLooseSeason: 198,
      calculatedElo: 3170,
      kill: 5,
      death: 5,
      assist: 0,
      kda: 1,
      ally: true,
    },
    {
      id: "zMLIQCmOtjIZG20O4ADP2FFwaeP3fOeJnzZnB1nxafwgkKA",
      puuid:
        "22HB1F0F91_-Tv5JaoMzArx4aYVjzedfMDjVdGxLpVMuOUxqaY-Gs9FwhhI8FJ7xNeicq-tUKDxcvQ",
      teamId: 100,
      win: true,
      totalWin: 8,
      totalLoose: 2,
      championPlayed: "Graves",
      summonerName: "A Starless Night",
      teamPosition: Role.JUNGLE,
      tier: Tier.GRANDMASTER,
      rank: Rank.I,
      leaguePoints: 572,
      totalWinSeason: 201,
      totalLooseSeason: 182,
      calculatedElo: 2972,
      kill: 5,
      death: 5,
      assist: 8,
      kda: 2.6,
      ally: true,
    },
    {
      id: "WyockVdddMSNW1IuunCoCW7SWDfUc3p5mX3gz_YdVmZWbGo",
      puuid:
        "zT4gRg_0CYlmh-g2LeTWTckD5yCwrc5eEgZIW0moVoPRys2BQHaxpYWi81rhaaEA61Xek2t4sTqX-g",
      teamId: 100,
      win: true,
      totalWin: 6,
      totalLoose: 4,
      championPlayed: "Viktor",
      summonerName: "Wesley Warren Jr",
      teamPosition: Role.MIDDLE,
      tier: Tier.CHALLENGER,
      rank: Rank.I,
      leaguePoints: 753,
      totalWinSeason: 97,
      totalLooseSeason: 78,
      calculatedElo: 3153,
      kill: 7,
      death: 3,
      assist: 9,
      kda: 5.3333335,
      ally: true,
    },
    {
      id: "ezmJyf5R-ilOHAuC4xL3ujQK459P8ZKSUZODpgpKvar8l7I",
      puuid:
        "ECc762E6kdUrhiL4df5_T5yJCfDzgfIQtFCi2ssFwjl0LKTMqkkMpbb_TVQhXcSW3ppUvwlrwDvI0w",
      teamId: 100,
      win: true,
      totalWin: 5,
      totalLoose: 5,
      championPlayed: "Varus",
      summonerName: "CHAP PXXL",
      teamPosition: Role.BOTTOM,
      tier: Tier.GRANDMASTER,
      rank: Rank.I,
      leaguePoints: 633,
      totalWinSeason: 167,
      totalLooseSeason: 150,
      calculatedElo: 3033,
      kill: 17,
      death: 1,
      assist: 2,
      kda: 19,
      ally: true,
    },
    {
      id: "nwCY0r_rNBJao6F1lF1xje_5uVZPYVVBbstsno5FQRhwA7tO",
      puuid:
        "bmf9RzLi_jQzocGwE7fawQ-fqJ9KjqLa1MmPkIvcC2Jwk_a8yzdlhthOtPi0gyIIVEdZOew-GNk8nA",
      teamId: 100,
      win: true,
      totalWin: 4,
      totalLoose: 6,
      championPlayed: "Renata",
      summonerName: "Zaremba",
      teamPosition: Role.UTILITY,
      tier: Tier.GRANDMASTER,
      rank: Rank.I,
      leaguePoints: 503,
      totalWinSeason: 80,
      totalLooseSeason: 75,
      calculatedElo: 2903,
      kill: 3,
      death: 1,
      assist: 20,
      kda: 23,
      ally: true,
    },
    {
      id: "VoT07ORzbIfdCHe8W7K0lK-_RLWXWpN0zAMYldTw_nspP67xDiIm9wncyg",
      puuid:
        "s653GanTnkLNDCHUPdr2kFnBVTuMcc40_aUW-tU-kufjn64R-_xEk7Yk3D1xHbpJqcmxA_Hds7MDkQ",
      teamId: 200,
      win: false,
      totalWin: 5,
      totalLoose: 5,
      championPlayed: "Irelia",
      summonerName: "PaoPaoPW YuJian",
      teamPosition: Role.TOP,
      tier: Tier.CHALLENGER,
      rank: Rank.I,
      leaguePoints: 851,
      totalWinSeason: 136,
      totalLooseSeason: 105,
      calculatedElo: 3251,
      kill: 1,
      death: 7,
      assist: 2,
      kda: 0.42857143,
      ally: false,
    },
    {
      id: "jlpQSugYx_8xu7Q5usoLobvzqOKEwOkIWPpCUc8t96GLzOg",
      puuid:
        "ERJQoLk5-0d53PZ6CbuJP9H-xl1vMxd8W0xctgLDnL3LvXCxkrAS-QpjCOkYex4YX8segqmawUEh8Q",
      teamId: 200,
      win: false,
      totalWin: 8,
      totalLoose: 2,
      championPlayed: "Kindred",
      summonerName: "smile on face",
      teamPosition: Role.JUNGLE,
      tier: Tier.GRANDMASTER,
      rank: Rank.I,
      leaguePoints: 596,
      totalWinSeason: 86,
      totalLooseSeason: 68,
      calculatedElo: 2996,
      kill: 4,
      death: 8,
      assist: 4,
      kda: 1,
      ally: false,
    },
    {
      id: "3V3eR_uZ27heYCsliBZs2Y6S8i8TFFWEQlUB0_VvceBxMXIwZMrD5W3bxQ",
      puuid:
        "KOENEdSsyIK25okVyBl1Gu7fPx7fKnNfSjuJTqFzVrrZNJYsQitNaU9KYCKMg0H7PcllH0DJsj_YYg",
      teamId: 200,
      win: false,
      totalWin: 6,
      totalLoose: 4,
      championPlayed: "Syndra",
      summonerName: "Cook it up",
      teamPosition: Role.MIDDLE,
      tier: Tier.GRANDMASTER,
      rank: Rank.I,
      leaguePoints: 703,
      totalWinSeason: 77,
      totalLooseSeason: 56,
      calculatedElo: 3103,
      kill: 4,
      death: 3,
      assist: 3,
      kda: 2.3333333,
      ally: false,
    },
    {
      id: "hIHj_iFl3tHZri8thwZu8V0n1cV_kyGrek7G_qdEF9iDG7Y",
      puuid:
        "e-esG1oWVcnrbZRtmhXxOlGJLNd1R2VeDHDoBvmJGd_9fml9uCUO8EKQ_dRov9RT5Ukqdxi9t1rXNw",
      teamId: 200,
      win: false,
      totalWin: 4,
      totalLoose: 6,
      championPlayed: "Kaisa",
      summonerName: "Neramin1",
      teamPosition: Role.BOTTOM,
      tier: Tier.GRANDMASTER,
      rank: Rank.I,
      leaguePoints: 622,
      totalWinSeason: 92,
      totalLooseSeason: 85,
      calculatedElo: 3022,
      kill: 4,
      death: 8,
      assist: 1,
      kda: 0.625,
      ally: false,
    },
    {
      id: "ar9g_f-fX2c7jsH9a57okRQKUK88SBw5Q2dfiQGTt0EKirdM_JIzzV4pUA",
      puuid:
        "LLgmNnw2wHlL9URLoi-I4yxhzmATs54QIJs79-WmGX3ziWJzH82Cm6nIWepoKbKaMsqdoCuVWaN2ag",
      teamId: 200,
      win: false,
      totalWin: 7,
      totalLoose: 3,
      championPlayed: "Pantheon",
      summonerName: "Skýlinè",
      teamPosition: Role.UTILITY,
      tier: Tier.GRANDMASTER,
      rank: Rank.I,
      leaguePoints: 680,
      totalWinSeason: 199,
      totalLooseSeason: 178,
      calculatedElo: 3080,
      kill: 2,
      death: 11,
      assist: 4,
      kda: 0.54545456,
      ally: false,
    },
  ];
}
