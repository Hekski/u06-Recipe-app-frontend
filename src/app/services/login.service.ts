import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../interface/user';


@Injectable({
  providedIn: 'root',
})
export class LoginService {

  email: string = '';
  password: string = '';
  spoonApiUrl: string = 'http://localhost:8000/api/login';
  constructor(private http: HttpClient) {}

  login(formData: object): Observable<any> {
    return this.http.post(`${this.spoonApiUrl}`, formData);
  }

  isUserLoggedIn(): boolean {
    if (localStorage.getItem('token') != null) {
      return true;
    }
    return false;
  }
}
