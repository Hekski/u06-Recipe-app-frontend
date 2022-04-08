import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { BehaviorSubject, Observable, pipe, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Recipe } from '../interface/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private apiURL: string;
  private apiKey: string;
  category!: string;
  filterValue: string;

  constructor(private http: HttpClient) {
    this.apiURL = 'https://api.spoonacular.com/recipes/';
    this.apiKey = 'ad0ac2008bb24abe936fe73042e3e82f';
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  deafultParams = new HttpParams()
    .append('number', '10')
    .append('apiKey', 'ad0ac2008bb24abe936fe73042e3e82f');

  recipeId$ = new BehaviorSubject<number>(0);
  selectedRecipe$ = this.recipeId$.asObservable();

  getAll(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>(this.apiURL + 'complexSearch', {
        params: this.deafultParams,
      })
      .pipe(catchError(this.errorHandler));
  }

  getTypes(type: any, filter: string[]) {

    let filterParams = this.deafultParams;

    if (filter.includes('glutenFree')) {
      filterParams = filterParams.append('diet', 'gluten Free');
    }
    if (filter.includes('vegetarian')) {
      filterParams = filterParams.append('diet', 'vegetarian');
    }
    if (filter.includes('dairyFree')) {
      filterParams = filterParams.append('intolerances', 'Dairy');
    }

    // else return this.filerValue = "";
    return this.http.get<Recipe[]>(this.apiURL + 'complexSearch', {
      params: filterParams.append('type', `${type}`),
    });
  }

  // This runs from recipe-detail.ts
  getOneRecipe(id: number | string): Observable<Recipe> {
    return this.http.get<Recipe>(this.apiURL + id + '/information', {
      params: new HttpParams().append('apiKey', this.apiKey),
    });
  }

  errorHandler(error: any) {
    let errorMessage = '404 JÄTTEFEL';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
