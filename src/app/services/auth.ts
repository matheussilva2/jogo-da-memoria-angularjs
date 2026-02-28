import { computed, Injectable, signal } from '@angular/core';
import { Player } from "../models/player.model";

const BASIC_PLAYER_MOCK: Player = {
  name: "",
  high_score: 0,
  match_history: []
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _player = signal<Player | null>(null);

  readonly player = this._player.asReadonly();
  readonly isAuthenticated = computed(() => !!this._player());

  constructor() {
    this.loadSession();
  }

  login(player_name: string) {
    this._player.update((current: Player | null) => {
      if(!current){
        const new_player = BASIC_PLAYER_MOCK;
        new_player.name = player_name;

        this.save(new_player);
        return new_player;
      }

      const updatedPlayer: Player = {
        ...current,
        name: player_name
      }

      this.save(updatedPlayer);
      return updatedPlayer;
    });
  }

  save(player_data: Player) {
    localStorage.setItem('jm_player_data', JSON.stringify(player_data));
  }

  getPlayer(): Player | null {
    return this._player();
  }

  private loadSession() {
    const data = localStorage.getItem('jm_player_data');
    if (data) this._player.set(JSON.parse(data));
  }
}
