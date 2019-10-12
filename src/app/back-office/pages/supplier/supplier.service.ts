import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from './supplier.model';
import { RestService } from 'src/app/shared/services/rest.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  constructor(private httpClient: RestService) {}

  getSuppliers(): Observable<Supplier[]> {
    return this.httpClient.get<Supplier[]>('/api/bo/suppliers');
  }
}
