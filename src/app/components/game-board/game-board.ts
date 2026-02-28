import { Component, effect, input } from '@angular/core';
import { IGameDifficulty, IGameMode } from "../../constants/game";

@Component({
  selector: 'app-game-board',
  imports: [],
  templateUrl: './game-board.html',
  styleUrl: './game-board.css',
})
export class GameBoard {
  readonly gameConfig = input.required<{gamemode: IGameMode, difficulty: IGameDifficulty } | null>();
  
  constructor() {
    effect(() => {
      const config = this.gameConfig();
      if(config) {
        console.log(config);
      }
    });
  }
}
