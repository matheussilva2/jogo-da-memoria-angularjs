import { Component, effect, inject, signal } from '@angular/core';
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { map } from "rxjs";
import { GAME_DIFFICULTIES, GAME_MODES, IGameDifficulty, IGameMode } from "../../constants/game";
import { GameBoard } from "../../components/game-board/game-board";
import { TimeFormatPipe } from "../../pipes/time-format-pipe";
import { GameService } from "../../services/game-service";
import { delay } from "../../utils/delay";

@Component({
  selector: 'app-game',
  imports: [RouterLink, GameBoard, TimeFormatPipe, RouterLink],
  templateUrl: './game.html',
  styleUrl: './game.css',
})
export class Game {
  private route = inject(ActivatedRoute);
  readonly game_service = inject(GameService);

  readonly slug = toSignal(
    this.route.params.pipe(
      map(params => params['slug']),
    ),
    { initialValue: '' }
  );

  readonly difficulty = toSignal(
    this.route.queryParams.pipe(map(queries => queries['difficulty'])),
    {
      initialValue: ''
    }
  );

  readonly gameConfig = signal<{gamemode: IGameMode, difficulty: IGameDifficulty } | null>(null);
  protected readonly start_game_count = signal(-1);
  protected is_game_starting = signal(false);
  protected won_modal_open = signal(false);
  protected lose_modal_open = signal(false);

  constructor() {
    this.initializeGame();

    effect(() => {
      if(this.game_service.game_state() === "won") {
        this.won_modal_open.set(true);
      } else if(this.game_service.game_state() === "lose") {
        this.lose_modal_open.set(true);
      }
    });
  }

  initializeGame() {
    this.game_service.initGame(this.slug(), this.difficulty());
    const game_mode_data = this.game_service.getGameMode();
    const game_difficulty_data = this.game_service.getGameDifficulty();

    if(game_mode_data && game_difficulty_data) {
      this.gameConfig.set({
        gamemode: game_mode_data,
        difficulty: game_difficulty_data
      });

      this.startGame();
    }
  }

  startGame() {
    this.gameInitCount();
  }

  async gameInitCount() {
    this.is_game_starting.set(true);
    for(let i=3;i > 0; i--) {
      this.start_game_count.set(i);
      await delay(1000);
    }

    this.is_game_starting.set(false);
  }
}
