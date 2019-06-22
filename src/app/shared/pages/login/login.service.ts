import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseAddress: string = 'http://agrimada-laravel.test';
  constructor(private httpClient: HttpClient) {}

  login(credential: Credential): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    credential.client_id = '2';
    credential.client_secret = 'SuKEZ0xFU3BX3JWdm2O2KeitqeM7t0iHMOIjgnif';
    credential.grant_type = 'password';
    this.httpClient
      .post<PassportCredential>(
        `${this.baseAddress}/api/oaut/token`,
        credential,
        httpOptions
      )
      .subscribe(response => {
        if (response === undefined) {
          return;
        }
        console.log(response);
      });
  }
}

export interface Credential {
  username: string;
  password: string;
  client_secret: string;
  client_id: string;
  grant_type: string;
}

export interface PassportCredential {
  token_type: string;
  expires_in: string;
  refresh_token: string;
}
