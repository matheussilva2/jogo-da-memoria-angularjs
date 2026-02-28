import { Component, effect, inject, signal } from '@angular/core';
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { map } from "rxjs";
import { GAME_DIFFICULTIES, GAME_MODES, IGameDifficulty, IGameMode } from "../../constants/game";
import { GameBoard } from "../../components/game-board/game-board";
import { TimeFormatPipe } from "../../pipes/time-format-pipe";

@Component({
  selector: 'app-game',
  imports: [RouterLink, GameBoard, TimeFormatPipe],
  templateUrl: './game.html',
  styleUrl: './game.css',
})
export class Game {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

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
  readonly remaining_time = signal<number>(0);
  private timer_id: any;
  private game_started:boolean = false;

  constructor() {
    this.loadGameConfig();

    effect(() => {
      if(this.game_started && this.remaining_time() < 0) {
        this.stopGame();
      }
    });
  }

  startGame() {
    if(this.timer_id) return;

    this.timer_id = setInterval(() => {
      this.remaining_time.update((prev) => prev-1);
    }, 1000);
  }

  stopGame() {
    if(this.timer_id) {
      clearInterval(this.timer_id);
      this.timer_id = undefined;
      alert("Tempo esgotado!");
    }
  }

  loadGameConfig() {
    const gamemode = GAME_MODES.filter((gamemode) => gamemode.slug === this.slug());
    if(!gamemode[0]) return this.router.navigate(['/jogar']);
    
    const difficulty = GAME_DIFFICULTIES.filter((difficulty) => difficulty.key === this.difficulty());
    if(!difficulty[0]) return this.router.navigate(['/jogar']);

    this.gameConfig.set({
      gamemode: gamemode[0],
      difficulty: difficulty[0]
    });

    this.remaining_time.set(difficulty[0].time);

    this.startGame();

    return;
  }
}
