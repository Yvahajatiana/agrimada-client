import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { RestService } from 'src/app/shared/services/rest.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpClient: RestService) {}

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('/api/bo/products');
  }

  deleteProduct(id: number): Observable<any> {
    return this.httpClient.delete(`/api/bo/products/${id}`);
  }

  createProduct(product: Product): Observable<any> {
    const data = this.toFormData(product, null);
    return this.httpClient.post('/api/bo/products', data);
  }

  updateProduct(product: Product, id: number): Observable<any> {
    const data = this.toFormData(product, id);
    data.append('_method', 'put');
    return this.httpClient.post(`/api/bo/products/${id}`, data);
  }

  private toFormData(product: Product, id: number): FormData {
    const data = new FormData();
    data.append('ProductName', product.ProductName);
    data.append('ProductDescriptions', product.ProductDescriptions);
    data.append('Quantity', String(product.Quantity));
    data.append('CategoryID', product.CategoryID);
    data.append('Harvest_Month', product.Harvest_Month);
    if (id !== undefined && id !== null) {
      data.append('ProductID', String(id));
    }

    return data;
  }
}
