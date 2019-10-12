import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  header: any;
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {
    this.initHeaderToken();
  }

  post<T>(url: string, data: any) {
    return this.httpClient
      .post<T>(url, data, { headers: this.header })
      .pipe(catchError(err => this.handleError(err)));
  }

  get<T>(url: string) {
    console.log('service');
    return this.httpClient
      .get<T>(url, { headers: this.header })
      .pipe(catchError(err => this.handleError(err)));
  }

  delete(url: string) {
    return this.httpClient.delete(url, { headers: this.header });
  }

  private initHeaderToken() {
    this.header = {
      Authorization: `Bearer ${this.authService.getToken()}`
    };
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
      if (error.status === 401) {
        //this.authService.refreshToken();
        this.authService.logout();
      }
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
