import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ValidateSessionGuard implements CanActivate {
  // TODO: hardcoded
  private cookie: string | null = 'hardcoded';

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkCookie();
  }

  private checkCookie(): boolean {
    if (this.cookie != null) {
      return true;
    } else {
      this.router.navigate(['/', 'auth', 'login']);
      return false;
    }
  }
}
