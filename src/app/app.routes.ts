import { Routes } from '@angular/router';
import { Home } from "./screens/home/home";
import { Gamemode } from "./screens/gamemode/gamemode";
import { History } from "./screens/history/history";
import { Game } from "./screens/game/game";
import { authGuard } from "./core/guards/auth.guard";

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'jogar',
        component: Gamemode,
        canActivate: [authGuard]
    },
    {
        path: 'historico',
        component: History,
        canActivate: [authGuard]
    },
    {
        path: 'jogar/:slug',
        component: Game,
        canActivate: [authGuard]
    }
];
