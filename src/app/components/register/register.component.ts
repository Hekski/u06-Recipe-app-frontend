import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from 'src/app/services/register.service';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: any;
  errorStatus: any;
  constructor(
    private registerService: RegisterService,
    private http: HttpClient,
    private router: Router,
    private _toastService: ToastService
  ) {}
  name: string = '';
  email: string = '';
  password: string = '';
  confirm_password: string = '';
  alert: string = '';

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl([
        '',
        Validators.required,
        Validators.minLength(5),
      ]),
      confirm_password: new FormControl([
        '',
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  addInfoToast() {
    this._toastService.error(this.errorStatus + ' ' + this.errorMessage);
  }

  submitForm() {
    const formData = this.registerForm.getRawValue();
    this.registerService.register(formData).subscribe(
      (result: any) => {
        result = Object(result).data;
        localStorage.setItem('token', result.token);
        localStorage.setItem('id', result.id);
        localStorage.setItem('name', result.name);

        if (result) {
          this.errorMessage = result.message;
          this.router.navigate(['/login']).then(() => {
            window.location.reload();
          });
        }

        /* this.addInfoToast(result);
      this.router.navigate(['/login']); */
      },
      (error) => {
        this.errorStatus = error.status;
        this.errorMessage =
          (error.error.message.name ||
          error.error.message.email ||
          error.error.message.password ||
          error.error.message.confirm_password); 
        
        console.log(error);
        console.log(this.errorMessage);

        if (!error.ok) {
          this.addInfoToast();
        }
      }
    );
  }
}
