import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';

@Injectable()
export class LaravelInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let duplicate = req;
    let body = req.body;

    if (!body) {
      body = {};
    }

    switch (req.method) {
      case 'PUT':
        body['_method'] = 'PUT';
        duplicate = req.clone({
          method: 'POST',
          body: body
        });
        break;
      case 'DELETE':
        body['_method'] = 'DELETE';
        duplicate = req.clone({
          method: 'POST',
          body: body
        });
        break;
    }
    // console.log('req mthod', req.method);

    return next.handle(duplicate);
  }
}
