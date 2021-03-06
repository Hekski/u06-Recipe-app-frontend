import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { HttpClient } from '@angular/common/http';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string;
  errorStatus: any;
  constructor(
    private loginService: LoginService,
    private http: HttpClient,
    private router: Router,
    private _toastService: ToastService
  ) {}

  email: string = '';
  password: string = '';
  alert: string = '';

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl([
        '',
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }
  addInfoToast() {
    this._toastService.error(this.errorStatus + ' ' + this.errorMessage);
  }

  reDirect() {
    this.router.navigate(['/recipe']).then(() => {
      window.location.reload();
    });
  }

  async submitForm() {
    const formData = this.loginForm.getRawValue();
    this.loginService.login(formData).subscribe(
      async (result: any) => {
        result = Object(result).data;
        localStorage.setItem('token', result.token);
        localStorage.setItem('id', result.id);
        localStorage.setItem('name', result.name);

        if (result) {
          this.errorMessage = result.message;
          this.router.navigate(['/recipe']).then(() => {
            window.location.reload();
          });
        }
      },
      (error) => {
        this.errorStatus = error.status;
        this.errorMessage = error.error.message;

        if (!error.ok) {
          this.addInfoToast();
        }
      }
    );
  }
}
