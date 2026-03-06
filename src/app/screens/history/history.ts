import { DatePipe } from "@angular/common";
import { Component, signal } from '@angular/core';
import { IGameStats } from "../../constants/game";
import { TimeFormatPipe } from "../../pipes/time-format-pipe";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-history',
  imports: [DatePipe, TimeFormatPipe, RouterLink],
  templateUrl: './history.html',
  styleUrl: './history.css',
})
export class History {
  readonly match_history = signal<IGameStats[]>([]);

  constructor() {
    this.loadStats();
  }

  getMatchesCount(): number {
    return this.match_history().length;
  }

  getMatchesTimeAverage(): number {
    let total_time = 0;
    
    this.match_history().forEach(match => {
      total_time += match.remaining_time;
    });

    let average = total_time / this.match_history().length;

    if(isNaN(average)) {
      average = 0;
    }

    return Math.round(average);
  }

  loadStats() {
    const stored_stats_json = localStorage.getItem('jm_player_ranking') || '[]';
    
    let stored_stats_arr: IGameStats[] = JSON.parse(stored_stats_json) || [];

    stored_stats_arr.sort((a, b) => {
      if(a.won !== b.won) {
        return b.won ? 1 : -1;
      }

      if(b.score !== a.score) {
        return b.score - a.score;
      }

      return a.moves - b.moves;
    });

    this.match_history.set(stored_stats_arr);
  }
}
