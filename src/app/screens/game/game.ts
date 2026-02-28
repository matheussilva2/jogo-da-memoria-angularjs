import { Component, inject, signal } from '@angular/core';
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { map } from "rxjs";
import { GAME_MODES, IGameMode } from "../../constants/game";

@Component({
  selector: 'app-game',
  imports: [RouterLink],
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

  readonly gameConfig = signal<IGameMode | null>(null);

  constructor() {
    this.loadGameConfig();
  }

  loadGameConfig() {
    const gamemode = GAME_MODES.filter((gamemode) => gamemode.slug === this.slug());
    if(!gamemode[0]) return this.router.navigate(['/jogar']);

    this.gameConfig.set(gamemode[0]);
    console.log(this.gameConfig());
    return;
  }
}
