import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  baseAddress: string = 'http://agrimada-laravel.test';
  constructor(private httpClient: HttpClient) {}

  register(user: RegisterModel): void {
    this.httpClient
      .post<User>(`${this.baseAddress}/register`, user)
      .subscribe(response => {
        console.log(response);
      });
  }
}

export interface RegisterModel {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface User {
  name: string;
  email: string;
  updated_at: string;
  created_at: string;
}
