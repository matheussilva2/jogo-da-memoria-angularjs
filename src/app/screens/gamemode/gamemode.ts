import { Component, inject, signal } from '@angular/core';
import { AuthService } from "../../services/auth";
import { GAME_DIFFICULTIES, GAME_MODES } from "../../constants/game";
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-gamemode',
  imports: [RouterLink],
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

  setDifficulty(value: "easy" | "medium" | "hard") {
    this.gameDifficulty.set(value);
  }

  startGame(gamemode_slug: string) {
    this.router.navigate([`/jogar/${gamemode_slug}?difficulty=${this.getDifficulty()}`]);
  }
}
