import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  name: string = '';
  email: string = '';
  password: string = '';
  confirm_password: string = '';
  LaravelApiUrl: string = 'http://localhost:8000/api/register';
  constructor(private http: HttpClient) {}

  register(formData: object): Observable<any> {
    return this.http.post(`${this.LaravelApiUrl}`, formData);
  }
}
