import { inject, Injectable, signal } from '@angular/core';
import { GAME_DIFFICULTIES, GAME_MODES, ICard, IGameDifficulty, IGameMode, IGameStats } from "../../constants/game";
import { Router } from "@angular/router";
import { delay } from "../../utils/delay";
import { SoundService } from "./sound-service";

declare global {
  interface Window {
    dataLayer: any[];
  }
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  readonly game_state = signal<'idle' | 'playing' | 'won' | 'lose'>('idle');
  readonly cards = signal<ICard[]>([]);
  readonly game_mode = signal<IGameMode | null>(null);
  readonly game_difficulty = signal<IGameDifficulty | null>(null);
  readonly moves = signal(0);
  readonly match_pairs = signal<number[][]>([]);
  readonly remaining_time = signal(0);
  readonly penalty_label = signal("");
  readonly is_busy = signal(false);
  private readonly show_all_cards = signal(false);
  readonly current_stats_rank = signal(-1);

  private game_timer_id: any = null;

  private readonly router = inject(Router);
  public cards_flipped = signal<{card_one: number, card_two: number}>({ card_one: -1, card_two: -1 });

  constructor(private soundService: SoundService) {}

  initGame(gamemode: string, difficulty: string) {
    const game_config = this.getGameConfig(gamemode, difficulty);
    if(game_config === false) {
      this.router.navigate(['/jogar']);
    } else {
      this.game_mode.set(game_config.gamemode);
      this.game_difficulty.set(game_config.difficulty);
      this.resetGameState();
      this.unflipCards();
      this.shuffleCards();
    }
  }

  resetGameState() {
    this.game_timer_id = null;
    this.match_pairs.set([]);
    this.moves.set(0);
    this.is_busy.set(false);
  }

  setShowAllCards(value: boolean) {
    this.show_all_cards.set(value);
  }

  canShowAllCards() {
    return this.show_all_cards();
  }

  startGame() {
    this.game_state.set('playing');
    this.remaining_time.set(this.game_difficulty()?.duration || 0);

    this.startCountGameTime();
  }

  startCountGameTime() {
    if(this.game_timer_id) return;

    this.game_timer_id = setInterval(() => {
      this.remaining_time.update(prev => prev - 1);

      if(this.remaining_time() <= 0) {
        this.loseGame();
      }
    }, 1000);
  }

  loseGame() {
    this.game_state.set("lose");
    clearInterval(this.game_timer_id);
    this.game_timer_id = null;
    this.soundService.playSound('lose');
    this.generateGameStats(false);
  }

  unflipCards() {
    this.cards_flipped.set({
      card_one: -1,
      card_two: -1
    });
  }

  private getRandomCard(cards_content: string[], exclude: number[]): number {
    const random_pick = Math.floor(Math.random() * (cards_content.length - 1));

    if(exclude.includes(random_pick)) {
      return this.getRandomCard(cards_content, exclude);
    } else {
      return random_pick;
    }
  }

  private shuffleArray(arr: ICard[]) {
    for(let i = arr.length-1;i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  }

  shuffleCards() {
    const difficulty = this.game_difficulty();
    if(!difficulty) return false;
    
    const new_cards: ICard[] = [];
    const cards_taken: number[] = [];
    let taken_indexes = [];
    
    if(this.game_difficulty()) {
      for(let i = 0; i < difficulty.items_count/2; i++) {
        const random_pick = this.getRandomCard(this.game_mode()?.cards || [], cards_taken);
        taken_indexes.push(random_pick);
        cards_taken.push(random_pick);

        new_cards.push(
          {
            content: this.game_mode()?.cards[random_pick] || "",
            isFlipped: false,
            isLocked: false
          },
          {
            content: this.game_mode()?.cards[random_pick] || "",
            isFlipped: false,
            isLocked: false
          },
        );
      }
    }

    this.cards.set(this.shuffleArray(new_cards));

    return true;
  }

  private checkWin() {
    if(this.match_pairs().length >= this.cards().length/2) {
      this.game_state.set("won");
      clearInterval(this.game_timer_id);
      this.soundService.playSound('won');
      this.generateGameStats(true);
    }
  }

  async checkForMatch() {
    const card_one_content = this.cards()[this.cards_flipped().card_one].content;
    const card_two_content = this.cards()[this.cards_flipped().card_two].content
    const match = card_one_content === card_two_content;

    if(match) {
      this.soundService.playSound('match');

      const updated_cards = this.cards();
      updated_cards[this.cards_flipped().card_one].isLocked = true;
      updated_cards[this.cards_flipped().card_two].isLocked = true;
      this.cards.set(updated_cards);
      
      const new_match_pair: number[] = [this.cards_flipped().card_one, this.cards_flipped().card_two];
      this.match_pairs.update(prev => [...prev, new_match_pair]);
      this.cards_flipped.set({
        card_one: -1,
        card_two: -1
      });
      this.checkWin();

      return true;
    } else {
      this.applyPenalty();
      await delay(500);
      this.unflipCards();
      return false;
    }
  }

  applyPenalty() {
    this.remaining_time.update(prev => prev - (this.game_difficulty()?.penalty || 0));
    this.penalty_label.set(`${this.game_difficulty()?.penalty || 0} seg.`);
    setTimeout(() => {
      this.penalty_label.set("");
    }, 1000);
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

  onCardFlip(card_index: number) {
    if(this.game_state() !== "playing") return;
    this.moves.update(prev => prev+1);
    this.soundService.playSound('flip');

    if(this.is_busy()) return;
    
    this.flipCard(card_index);
  }

  async flipCard(card_index: number) {
    this.is_busy.set(true);
    
    if(this.cards_flipped().card_one !== -1 && this.cards_flipped().card_two !== -1) return;
    if(this.cards_flipped().card_one === card_index) return;

    if(this.cards_flipped().card_one !== -1) {
      this.cards_flipped.update(prev => (
        {
          card_one: prev.card_one,
          card_two: card_index
        }
      ));
      
      await this.checkForMatch();
      this.is_busy.set(false);

      return;
    } else {
      this.cards_flipped.set(
        {
          card_one: card_index,
          card_two: -1
        }
      );
      this.is_busy.set(false);
      
      return;
    }
  }

  getStoredStats() {
    let stored_stats_json = localStorage.getItem('jm_player_ranking') || '[]';
    
    let stored_stats_arr = JSON.parse(stored_stats_json) || [];

    return stored_stats_arr;
  }

  getMatchRank(stats_data: IGameStats) {
    const stats: IGameStats[] = [...this.getStoredStats(), stats_data];

    stats.sort((a, b) => {
      if(b.score !== a.score) {
        return b.score - a.score;
      }

      return a.moves - b.moves;
    });

    const rank = stats.findIndex(stats => stats === stats_data);

    return rank;
  }

  private generateGameStats(won: boolean) {
    let score = (this.remaining_time() * 20) - this.moves();

    switch(this.game_difficulty()?.key) {
      case 'easy':
        score *= 1;
        break;
      case 'medium':
        score *= 1.2;
        break;
      case 'hard':
        score *= 1.5;
        break;
    }
    
    const stats:IGameStats = {
      remaining_time: this.remaining_time(),
      difficulty_key: this.game_difficulty()?.key || "unknown",
      difficulty: this.game_difficulty()?.label || "Desconhecida",
      moves: this.moves(),
      score,
      theme: this.game_mode()?.theme  || "Desconhecido",
      date: Date.now(),
      won
    };

    const stored_stats = this.getStoredStats();

    let new_statistics = [...stored_stats, stats];

    localStorage.setItem("jm_player_ranking", JSON.stringify(new_statistics));

    this.current_stats_rank.set(this.getMatchRank(stats));

    let analytics_stats:any = {...stats};
    analytics_stats.won = stats.won ? "victory" : "defeat";

    window.dataLayer.push({
      event: 'stats_data',
      ...analytics_stats
    });
  }

  cancelMatch() {
    clearInterval(this.game_timer_id);
    this.game_state.set("idle");
    return true;
  }
}
