import { Component, effect, inject, input, signal } from '@angular/core';
import { GameService } from "../../core/services/game-service";
import { ICard } from "../../constants/game";

@Component({
  selector: 'app-game-card',
  imports: [],
  templateUrl: './game-card.html',
  styleUrl: './game-card.css',
})
export class GameCard {
  protected readonly game_service = inject(GameService);

  protected isFlipped = signal(false);
  protected backCardIcon = "/assets/icons/card-icon.svg";
  protected readonly card = signal<ICard | undefined>(undefined);
  readonly cardIndex = input.required<number>();

  constructor() {
    effect(() => {
      this.card.set(this.game_service.cards()[this.cardIndex()]);

      if(this.isCardFlipped()) {
        this.isFlipped.set(true);
      } else {
        this.isFlipped.set(false);
      }
    });
  }

  isCardFlipped() {
    return (
      this.game_service.cards_flipped().card_one === this.cardIndex() ||
      this.game_service.cards_flipped().card_two === this.cardIndex()
    );
  }

  isLocked() {
    return this.card()?.isLocked;
  }

  flipCard() {
    if(this.card()?.isLocked) return;
    
    this.game_service.onCardFlip(this.cardIndex());
  }
}
