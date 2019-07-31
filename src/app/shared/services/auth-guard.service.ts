import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate() {
    if (this.auth.isLogged() === undefined) {
      this.router.parseUrl('bo/signin');
    }

    return true;
  }
}
