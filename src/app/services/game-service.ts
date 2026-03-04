import { inject, Injectable, signal } from '@angular/core';
import { GAME_DIFFICULTIES, GAME_MODES, ICard, IGameDifficulty, IGameMode } from "../constants/game";
import { Router } from "@angular/router";
import { delay } from "../utils/delay";

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
  readonly match_pairs = signal<[number, number][]>([]);

  private readonly router = inject(Router);
  public cards_flipped = signal<{card_one: number, card_two: number}>({ card_one: -1, card_two: -1 });

  initGame(gamemode: string, difficulty: string) {
    const game_config = this.getGameConfig(gamemode, difficulty);
    if(game_config === false) {
      this.router.navigate(['/jogar']);
    } else {
      this.game_mode.set(game_config.gamemode);
      this.game_difficulty.set(game_config.difficulty);
      this.shuffleCards();
      this.startGame();
    }
  }

  startGame() {
    this.game_state.set('playing');
  }

  unflipCards() {
    this.cards_flipped.set({
      card_one: -1,
      card_two: -1
    });
  }

  shuffleCards() {
    const difficulty = this.game_difficulty();
    if(!difficulty) return false;
    
    const new_cards: ICard[] = [];
    
    if(this.game_difficulty()) {
      for(let i = 0; i < difficulty.items_count; i++) {
        new_cards.push({
          content: "/assets/cards/animals/cat-face.png",
          isFlipped: false,
          isLocked: false
        });
      }
    }

    this.cards.set(new_cards);

    return true;
  }

  async checkForMatch() {
    const card_one_content = this.cards()[this.cards_flipped().card_one].content;
    const card_two_content = this.cards()[this.cards_flipped().card_two].content
    const match = card_one_content === card_two_content;

    if(match) {
      const updated_cards = this.cards();
      updated_cards[this.cards_flipped().card_one].isLocked = true;
      updated_cards[this.cards_flipped().card_two].isLocked = true;
      this.cards.set(updated_cards);

      this.match_pairs.update(prev => [...prev, [this.cards_flipped().card_one, this.cards_flipped().card_two]]);

      this.cards_flipped.set({
        card_one: -1,
        card_two: -1
      });
      return true;
    } else {
      await delay(500);
      this.unflipCards();
      return false;
    }
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

  flipCard(card_index: number) {
    if(this.cards_flipped().card_one !== -1 && this.cards_flipped().card_two !== -1) return;

    if(this.cards_flipped().card_one !== -1) {
      if(this.cards_flipped().card_one === card_index) {
        return;
      } else {
        this.cards_flipped.update(prev => (
          {
            card_one: prev.card_one,
            card_two: card_index
          }
        ));
        
        this.checkForMatch();
      }
    } else {
      this.cards_flipped.set(
        {
          card_one: card_index,
          card_two: -1
        }
      );
    }
  }
}
