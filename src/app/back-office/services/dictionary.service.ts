import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { handleError } from 'src/app/shared/assets';
import { Dictionary } from '../models/dictionary';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  private headers = { Authorization: 'AUTO' };
  private apiPrefix = 'api/bo/dictionaries';

  constructor(private http: HttpClient) { }

  getAll(param: any = {}) {
    return this.http.get<Dictionary[]>(this.apiPrefix, {
      headers: this.headers,
      params: param
    }).pipe(catchError(handleError));
  }

  add(dictionary: Dictionary) {
    return this.http.post<Dictionary>(this.apiPrefix, dictionary, {
      headers: this.headers,
    }).pipe(catchError(handleError));
  }

  update(dictionary: Dictionary) {
    return this.http.put<Dictionary>(this.apiPrefix + '/' + dictionary.DictionaryID, dictionary, {
      headers: this.headers,
    }).pipe(catchError(handleError));
  }

  delete(dictionaryID: number) {
    return this.http.delete<Dictionary>(this.apiPrefix + '/' + dictionaryID, {
      headers: this.headers,
    }).pipe(catchError(handleError));
  }

}
