import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}
  headers = {
    headers: { Authorization: 'AUTO' }
  };

  getAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>('/api/bo/categories', this.headers);
  }

  create(newCategory: Category): Observable<Category> {
    return this.httpClient.post<Category>(
      '/api/bo/categories',
      newCategory,
      this.headers
    );
  }

  delete(id: number): Observable<Category> {
    return this.httpClient.get<Category>(
      `/api/bo/categories/${id}`,
      this.headers
    );
  }
}
