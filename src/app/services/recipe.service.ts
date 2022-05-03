import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Recipe } from '../interface/recipe';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private apiURL: string;
  private apiKey!: string;
  category!: string;
  filterValue: string;

  constructor(private http: HttpClient) {
    this.apiURL = 'https://api.spoonacular.com/recipes/';
    // this.apiKey = 'ad0ac2008bb24abe936fe73042e3e82f';
    this.apiKey = environment.API_KEY;
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  };

  deafultParams = new HttpParams().append('number', '20');

  getAll(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>(
        this.apiURL + 'complexSearch?' + 'apiKey=' + this.apiKey,
        {}
      )
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
        'http://localhost:8000/api/add-recipe/' +
          recipeObject.list_id +
          `${this.apiKey}`,
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

    return this.http.get<Recipe[]>(
      this.apiURL + 'complexSearch?' + 'apiKey=' + this.apiKey,
      {
        params: filterParams.append('type', `${type}`),
      }
    );
  }

  selectedDropdown(number: any) {
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

    return this.http.get<Recipe[]>(
      this.apiURL + 'complexSearch', {
      params: numberParams.append('number', `${number}`),
    });
  }

  getOneRecipe(id: number | string): Observable<Recipe> {
    return this.http.get<Recipe>(
      this.apiURL + id + '/information?' + 'apiKey=' + this.apiKey,
      {}
    );
  }

  deleteOneRecipe(id: number) {
    return this.http
      .delete<Recipe>(
        'http://localhost:8000/api' +
          '/delete-recipe/' +
          id +
          'apiKey=' +
          this.apiKey,
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
