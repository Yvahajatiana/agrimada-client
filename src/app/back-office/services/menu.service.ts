import { Injectable } from '@angular/core';
import { Menu } from '../models/menu';
import { catchError } from 'rxjs/operators';
import { handleError } from 'src/app/shared/assets';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private headers = { Authorization: 'AUTO' };
  private apiPrefix = 'api/bo/menus';

  constructor(private http: HttpClient) { }

  getAll(param: any = {}) {
    return this.http.get<Menu[]>(this.apiPrefix, {
      headers: this.headers,
      params: param
    }).pipe(catchError(handleError));
  }

  add(menu: Menu) {
    return this.http.post<Menu>(this.apiPrefix, menu, {
      headers: this.headers,
    }).pipe(catchError(handleError));
  }

  update(menu: Menu) {
    return this.http.put<Menu>(this.apiPrefix + '/' + menu.MenuID, menu, {
      headers: this.headers,
    }).pipe(catchError(handleError));
  }

  delete(menuID: number) {
    return this.http.delete<Menu>(this.apiPrefix + '/' + menuID, {
      headers: this.headers,
    }).pipe(catchError(handleError));
  }
}
