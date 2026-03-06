import { inject } from "@angular/core";
import { AuthService } from "../services/auth"
import { CanActivateFn, Router } from "@angular/router";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isAuthenticated() || state.url === "/") return true;

  return router.parseUrl('/');
}