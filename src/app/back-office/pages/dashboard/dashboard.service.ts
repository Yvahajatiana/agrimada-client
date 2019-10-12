import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardInfo } from './dashboard.model';
import { RestService } from 'src/app/shared/services/rest.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private httpClient: RestService) {}

  getDashboardInfo(): Observable<DashboardInfo> {
    return this.httpClient.get<DashboardInfo>('/api/bo/dashboard');
  }
}
