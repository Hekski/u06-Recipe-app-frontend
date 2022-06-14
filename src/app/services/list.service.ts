import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { List } from '../interface/list';


@Injectable({
  providedIn: 'root',
})
export class ListService {
  list: List[] = [];
  private apiURL = 'http://u06.herokuapp.com/api';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  };

  constructor(private http: HttpClient) {}

  getAll(): Observable<List[]> {
    return this.http
      .get<List[]>(
        this.apiURL + '/userlist/' + localStorage.getItem('id'),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  create(data: object): Observable<List> {
    return this.http
      .post<List>(
        this.apiURL + '/create-userlist/' + localStorage.getItem('id'),
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  // not used
  update(id: string | number, recipe: any): Observable<List> {
    return this.http
      .put<List>(
        this.apiURL + '/recipe/' + id,
        JSON.stringify(recipe),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  delete(id: number) {
    return this.http
      .delete<List>(this.apiURL + '/delete-userlist/' + id, this.httpOptions)
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
