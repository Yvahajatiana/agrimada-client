import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { catchError } from 'rxjs/operators';
import { handleError } from 'src/app/shared/assets';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private headers = { Authorization: 'AUTO' };

  constructor(private http: HttpClient) {}

  getAll(param: any = {}) {
    return this.http
      .get<Category[]>('/api/bo/categories', { headers: this.headers })
      .pipe(catchError(handleError));
  }

  add(category: Category) {
    const formData = new FormData();
    for (const key in category) {
      if (category.hasOwnProperty(key)) {
        formData.append(key, category[key]);
      }
    }
    return this.http
      .post<Category>('/api/bo/categories', formData, { headers: this.headers })
      .pipe(catchError(handleError));
  }

  destroy(categoryID: number) {
    return this.http
      .post<Category>(
        `/api/bo/categories/${categoryID}`,
        { _method: 'delete' },
        { headers: this.headers }
      )
      .pipe(catchError(handleError));
  }
}
