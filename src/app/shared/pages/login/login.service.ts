import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PassportCredential, LoginCredential } from '../../Models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private credential: { client_id: string; client_secret: string };
  constructor(private httpClient: HttpClient) {
    this.getCredential().subscribe(value => {
      this.credential = value;
      console.log('credential', value);
    });
  }

  login(credential: LoginCredential): Observable<PassportCredential> {
    credential = { ...credential, ...this.credential };
    credential.grant_type = 'password';
    return this.httpClient.post<PassportCredential>(
      `/api/oauth/token`,
      credential
    );
  }

  private getCredential() {
    if (this.credential) {
      return of(this.credential);
    } else if (!this.credential && !environment.production) {
      return this.httpClient.get<LoginCredential>('/config/tokens');
    } else {
      const element = document.querySelector('html');
      const credential = {
        client_id: element.attributes.getNamedItem('data-clt-id').value,
        client_secret: element.attributes.getNamedItem('data-clt-s').value
      };
      return of(credential);
    }
  }
}
