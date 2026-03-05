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

  loadStats() {
    const stored_stats_json = localStorage.getItem('jm_player_ranking') || '[]';
    
    let stored_stats_arr: IGameStats[] = JSON.parse(stored_stats_json) || [];

    stored_stats_arr.sort((a, b) => {
      if(b.score !== a.score) {
        return b.score - a.score;
      }

      return a.moves - b.moves;
    });

    this.match_history.set(stored_stats_arr);
  }
}
