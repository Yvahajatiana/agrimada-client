import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './category.model';
import { Observable } from 'rxjs';
import { RestService } from 'src/app/shared/services/rest.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private httpClient: RestService) {}
  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>('/api/bo/categories');
  }

  createCategory(category: Category): Observable<any> {
    const data = this.toFormData(category);
    return this.httpClient.post<Category>('/api/bo/categories', data);
  }

  updateCategory(category: Category, id: number): Observable<any> {
    const data = this.toFormData(category);
    data.append('CategoryID', String(id));
    data.append('_method', 'put');

    return this.httpClient.post<Category>(`/api/bo/categories/${id}`, data);
  }

  deleteCategory(id: number): Observable<any> {
    return this.httpClient.delete(`/api/bo/categories/${id}`);
  }

  private toFormData(category: Category): FormData {
    const data = new FormData();
    data.append('CategoryName', category.CategoryName);
    data.append('Descriptions', category.Descriptions);
    if (category.ParentID !== undefined && category.ParentID !== null) {
      data.append('ParentID', String(category.ParentID));
    }
    if (category.Picture instanceof File) {
      data.append('Picture', category.Picture);
    }

    return data;
  }
}
