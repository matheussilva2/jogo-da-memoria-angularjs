import { Component, computed, effect, input } from '@angular/core';
import { IGameDifficulty, IGameMode } from "../../constants/game";
import { GameCard } from "../game-card/game-card";

@Component({
  selector: 'app-game-board',
  imports: [GameCard],
  templateUrl: './game-board.html',
  styleUrl: './game-board.css',
})
export class GameBoard {
  readonly gameConfig = input.required<{gamemode: IGameMode, difficulty: IGameDifficulty } | null>();
  protected items_count = 0;
  auxGameArray = computed(() => Array.from({ length: this.items_count}, (_, i) => i));
  
  constructor() {
    effect(() => {
      const config = this.gameConfig();
      if(config) {
        this.items_count = config.difficulty.items_count;
      }
    });
  }
}
