import { Routes } from '@angular/router';
import { Home } from "./screens/home/home";
import { Gamemode } from "./screens/gamemode/gamemode";
import { History } from "./screens/history/history";
import { Game } from "./screens/game/game";

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'jogar',
        component: Gamemode
    },
    {
        path: 'historico',
        component: History
    },
    {
        path: 'jogar/:slug',
        component: Game
    }
];
