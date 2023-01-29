import { Game } from "./game";
import { Participant } from "./participant";

export interface GameBoxSelectEvent {
  selected: boolean;
  game: Game;
}
