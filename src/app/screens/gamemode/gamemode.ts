import { Component, inject, signal } from '@angular/core';
import { AuthService } from "../../services/auth";
import { GAME_DIFFICULTIES, GAME_MODES, IGameDifficulty } from "../../constants/game";
import { Router, RouterLink } from "@angular/router";
import { TimeFormatPipe } from "../../pipes/time-format-pipe";

@Component({
  selector: 'app-gamemode',
  imports: [RouterLink, TimeFormatPipe],
  templateUrl: './gamemode.html',
  styleUrl: './gamemode.css',
})
export class Gamemode {
  protected auth = inject(AuthService);
  protected router = inject(Router);

  private gameDifficulty = signal<"easy" | "medium" |"hard">("easy");
  
  difficulties = GAME_DIFFICULTIES;
  game_modes = GAME_MODES

  getDifficulty() {
    return this.gameDifficulty();
  }

  getDifficultyData(): IGameDifficulty {
    return this.difficulties.filter(difficulty => difficulty.key === this.gameDifficulty())[0];
  }

  setDifficulty(value: "easy" | "medium" | "hard") {
    this.gameDifficulty.set(value);
  }

  startGame(gamemode_slug: string) {
    this.router.navigate([`/jogar/${gamemode_slug}`], {
      queryParams: { difficulty: this.getDifficulty()}
    });
  }
}
