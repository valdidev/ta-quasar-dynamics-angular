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

    // if user has NO token, he is redirected to the public zone
    if (token !== null) {
      return true;
    } else {
      this.router.navigate(['/', 'auth', 'login']);
      return false;
    }
  }
}
