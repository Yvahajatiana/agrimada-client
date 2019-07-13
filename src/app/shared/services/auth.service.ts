import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  isLogged(): boolean {
    if (this.getToken() === undefined || this.getToken() === null) {
      console.log('false');
      return false;
    }
    console.log('true');
    return true;
  }

  private getToken() {
    return localStorage.getItem('access_token');
  }
}
