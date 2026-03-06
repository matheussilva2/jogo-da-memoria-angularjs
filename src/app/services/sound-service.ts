import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  private sounds: { [key: string]: HTMLAudioElement } = {};

  constructor() {
    this.sounds['flip'] = new Audio('/assets/sounds/flip.wav');
    this.sounds['match'] = new Audio('/assets/sounds/match.wav');
    this.sounds['won'] = new Audio('/assets/sounds/won.wav');
    this.sounds['lose'] = new Audio('/assets/sounds/lose.wav');
  }

  playSound(name: 'flip' | 'match' | 'won' | 'lose') {
    const sound = this.sounds[name];

    if(sound) {
      sound.currentTime = 0;
      sound.play().catch(err => console.log("Erro ao tocar o som: ", err));
    }
  }
}
