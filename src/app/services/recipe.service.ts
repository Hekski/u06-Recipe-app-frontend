import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, pipe, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Recipe } from '../interface/recipe';


@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private apiURL: string;
  private apiKey: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {
    this.apiURL = 'https://api.spoonacular.com/recipes/';
    this.apiKey = 'ad0ac2008bb24abe936fe73042e3e82f';
  }
  deafultParams = new HttpParams()
    // .append('query', 'foodista')
    .append('number', '20')
    .append('dishtype', 'dinner')
    .append('apiKey', 'ad0ac2008bb24abe936fe73042e3e82f');

  getAll(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>(this.apiURL + 'complexSearch', {
        params: this.deafultParams,
        /*         {
          .append('type', dishType)
          .append('diet', `vegetarian,${preferences}`)
          .append('apiKey', this.spoonApiKey),
 

        /* 'apiKey=ad0ac2008bb24abe936fe73042e3e82f' +
          '&type=lunch' +
          '&title=true' +
          '&number=10' */
      })
      .pipe(catchError(this.errorHandler));
  }

  getOneRecipe(id: number | string): Observable<Recipe> {
    return this.http.get<Recipe>(this.apiURL + id + '/information', {
      params: new HttpParams().append('apiKey', this.apiKey),
    });
  }

  create(recipe: string | number): Observable<Recipe> {
    return this.http
      .post<Recipe>(
        this.apiURL + '/recipes/',
        JSON.stringify(recipe),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  update(id: string | number, recipe: any): Observable<Recipe> {
    return this.http
      .put<Recipe>(
        this.apiURL + '/recipes/' + id,
        JSON.stringify(recipe),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  delete(id: number) {
    return this.http
      .delete<Recipe>(this.apiURL + '/recipes/' + id, this.httpOptions)
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
