import { Role } from "@/enumerations/Role";
import { RoleSelectable } from "@/enumerations/RoleSelectable";

export interface OverView {
  role: Role | RoleSelectable;
  isAlly: boolean;
  winrateLastGame: number;
  calculatedElo: number;
  eloString: string;
  seasoninrate: number;
  championPlayed: string;
  valid: boolean;
  kdaLastGames: number;
}
