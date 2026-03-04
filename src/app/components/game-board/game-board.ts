import { Component, computed, effect, input, signal } from '@angular/core';
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
  protected grid_cols = signal(3);
  auxGameArray = computed(() => Array.from({ length: this.items_count}, (_, i) => i));
  
  constructor() {
    effect(() => {
      const config = this.gameConfig();
      if(config) {
        this.items_count = config.difficulty.items_count;

        if(config.difficulty.key === "hard") {
          this.grid_cols.set(4);
        }
      }
    });
  }

  protected getGridCols() {
    return `grid-cols-${this.grid_cols()}`;
  }
}
