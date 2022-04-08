import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private loginService: LoginService,
    private http: HttpClient,
    private router: Router
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

  submitForm() {
    const formData = this.loginForm.getRawValue();
    this.loginService.login(formData).subscribe((result: any) => {
      result = Object(result).data;
      localStorage.setItem('token', result.token);
      localStorage.setItem('id', result.id);
      localStorage.setItem('name', result.name);
      alert(result.message);
      this.router.navigate(['/list']);
    });
  }
}
