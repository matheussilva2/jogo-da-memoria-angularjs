import { Component, inject, signal } from '@angular/core';
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { map } from "rxjs";
import { GAME_DIFFICULTIES, GAME_MODES, IGameDifficulty, IGameMode } from "../../constants/game";
import { GameBoard } from "../../components/game-board/game-board";

@Component({
  selector: 'app-game',
  imports: [RouterLink, GameBoard],
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

  constructor() {
    this.loadGameConfig();
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

    return;
  }
}
