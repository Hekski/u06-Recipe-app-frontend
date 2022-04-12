import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
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
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  };

  deafultParams = new HttpParams()
    .append('number', '10')
    .append('apiKey', 'ad0ac2008bb24abe936fe73042e3e82f');

  getAll(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>(this.apiURL + 'complexSearch', {
        params: this.deafultParams,
      })
      .pipe(catchError(this.errorHandler));
  }

  getAllFromAPI(user_list_id: number): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>(
        'http://localhost:8000/api/get-recipe/' + user_list_id,
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  addToList(recipeObject: any): Observable<Recipe> {
    return this.http
      .post<Recipe>(
        'http://localhost:8000/api/add-recipe/' + recipeObject.list_id,
        JSON.stringify(recipeObject),
        this.httpOptions
      )
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

  selectedDropdown(type: any, number: string) {
    let numberParams = this.deafultParams;

    if (number.includes('10')) {
      numberParams = numberParams.append('number', '10');
    }
    if (number.includes('20')) {
      numberParams = numberParams.append('number', '20');
    }
    if (number.includes('30')) {
      numberParams = numberParams.append('number', '30');
    }

    return this.http.get<Recipe[]>(this.apiURL + 'complexSearch', {
      params: numberParams.append('type', `${type}`),
    });
  }

  // This runs from recipe-detail.ts
  getOneRecipe(id: number | string): Observable<Recipe> {
    return this.http.get<Recipe>(this.apiURL + id + '/information', {
      params: new HttpParams().append('apiKey', this.apiKey),
    });
  }

  deleteOneRecipe(id: number) {
    return this.http
      .delete<Recipe>('http://localhost:8000/api' + '/delete-recipe/' + id, this.httpOptions)
      .pipe(catchError(this.errorHandler));
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
