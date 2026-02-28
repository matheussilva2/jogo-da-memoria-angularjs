import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-game-card',
  imports: [],
  templateUrl: './game-card.html',
  styleUrl: './game-card.css',
})
export class GameCard {
  protected isFlipped = signal(false);
  protected backCardIcon = "/assets/icons/card-icon.svg";
  readonly cardIcon = input.required<string>();

  flipCard() {
    this.isFlipped.update((prev) => !prev);
    console.log(this.isFlipped);
  }
}
