import { inject, Injectable, signal } from '@angular/core';
import { GAME_DIFFICULTIES, GAME_MODES, ICard, IGameDifficulty, IGameMode } from "../constants/game";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class GameService {
  readonly game_state = signal<'idle' | 'playing' | 'won' | 'lose'>('idle');
  readonly cards = signal<ICard[]>([]);
  readonly game_mode = signal<IGameMode | null>(null);
  readonly game_difficulty = signal<IGameDifficulty | null>(null);
  readonly remaining_time = signal(0);
  readonly moves = signal(0);

  private readonly router = inject(Router);

  initGame(gamemode: string, difficulty: string) {
    const game_config = this.getGameConfig(gamemode, difficulty);
    if(game_config === false) {
      this.router.navigate(['/jogar']);
    } else {
      this.game_mode.set(game_config.gamemode);
      this.game_difficulty.set(game_config.difficulty)
      this.startGame();
    }
  }

  startGame() {
    this.game_state.set('playing');
  }

  checkForMatch(card_index_1: number, card_index_2:number):boolean {
    return this.cards()[card_index_1].content === this.cards()[card_index_2].content;
  }

  getGameMode() {
    return this.game_mode();
  }

  getGameDifficulty() {
    return this.game_difficulty();
  }

  getGameConfig(gamemode_slug: string, difficulty_name: string)
  : { gamemode: IGameMode, difficulty: IGameDifficulty } | false {
    const gamemode_data = GAME_MODES.filter((gamemode) => gamemode.slug === gamemode_slug);    
    const difficulty_data = GAME_DIFFICULTIES.filter((difficulty) => difficulty.key === difficulty_name); 

    if(!gamemode_data[0] || !difficulty_data[0]) {
      return false;
    }

    return {
      gamemode: gamemode_data[0],
      difficulty: difficulty_data[0]
    };
  }
}
