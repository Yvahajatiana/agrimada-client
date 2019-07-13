import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private httpClient: HttpClient) {}

  register(user: RegisterModel): Observable<User> {
    console.log(user);
    return this.httpClient.post<User>(`/api/register`, user);
  }
}

export interface RegisterModel {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  updated_at: string;
  created_at: string;
}
