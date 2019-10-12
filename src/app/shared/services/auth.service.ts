import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  PassportCredential,
  RefreshTokenCredential
} from '../Models/auth.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  constructor(private router: Router, private httpClient: HttpClient) {}

  isLogged(): boolean {
    if (this.getToken() === undefined || this.getToken() === null) {
      console.log('false');
      return false;
    }
    console.log('true');
    return true;
  }

  getToken(): string {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string {
    return localStorage.getItem('refresh_token');
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    this.router.navigate(['/bo/signin']);
  }

  refreshToken() {
    let credential: RefreshTokenCredential;
    if (!environment.production) {
      this.httpClient
        .get<RefreshTokenCredential>('/config/tokens')
        .subscribe(response => (credential = response));
    } else {
      credential = this.getCredential();
    }
    this.httpClient
      .post<PassportCredential>(`/api/oauth/token`, credential)
      .subscribe(response => {
        this.setSession(response);
      });
  }

  getCredential() {
    const element = document.querySelector('html');
    const credential = {
      client_id: element.attributes.getNamedItem('data-clt-id').value,
      client_secret: element.attributes.getNamedItem('data-clt-s').value,
      refresh_token: this.getRefreshToken(),
      grant_type: 'refresh_token',
      scope: ''
    };

    return credential;
  }

  setSession(response: PassportCredential) {
    if (
      response.access_token !== undefined &&
      response.refresh_token !== undefined
    ) {
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('refresh_token', response.access_token);
    }
  }
}
