import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  email: string = '';
  password: string = '';
  LaravelApiUrl: string = 'https://u06.herokuapp.com/api/login';
  constructor(private http: HttpClient) {}

  login(formData: object): Observable<any> {
    return this.http.post(`${this.LaravelApiUrl}`, formData)
 }

  isUserLoggedIn(): boolean {
    if (localStorage.getItem('token') != null) {
      return true;
    }
    return false;
  }
}
