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
export class AlreadyLoggedGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkToken();
  }
  private checkToken(): boolean {
    let token = localStorage.getItem('reqres_token');

    // if user has token, he is redirected to the private zone
    if (token === null) {
      return true;
    } else {
      this.router.navigate(['/', 'dashboard']);
      return false;
    }
  }
}
