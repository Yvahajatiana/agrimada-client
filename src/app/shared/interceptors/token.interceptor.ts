import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (req.headers.get('Authorization') === 'AUTO') {
      const duplicate = req.clone({
        headers: req.headers.set(
          'Authorization',
          `Bearer ${localStorage.getItem('access_token')}`
        )
      });

      duplicate.headers.set('Accept', 'application/json');
      console.log(duplicate);
      return next.handle(duplicate);
    }
    console.log('nonono');
    return next.handle(req);
  }
}
