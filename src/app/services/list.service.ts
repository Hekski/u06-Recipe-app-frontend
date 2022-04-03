import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { List } from '../interface/list';


@Injectable({
  providedIn: 'root',
})
export class ListService {
  private apiURL = 'http://localhost:8000/api';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<List[]> {
    return this.httpClient
      .get<List[]>(this.apiURL + '/recipe/')
      .pipe(catchError(this.errorHandler));
  }

  create(recipe: string | number): Observable<List> {
    return this.httpClient
      .post<List>(
        this.apiURL + '/recipe/',
        JSON.stringify(recipe),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  find(id: string | number): Observable<List> {
    return this.httpClient
      .get<List>(this.apiURL + '/recipe/' + id)
      .pipe(catchError(this.errorHandler));
  }

  update(id: string | number, recipe: any): Observable<List> {
    return this.httpClient
      .put<List>(
        this.apiURL + '/recipe/' + id,
        JSON.stringify(recipe),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  delete(id: number) {
    return this.httpClient
      .delete<List>(this.apiURL + '/recipe/' + id, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    let errorMessage = 'JÄTTEFEL';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
