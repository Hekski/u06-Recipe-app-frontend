import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from 'src/app/services/register.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(
    private registerService: RegisterService,
    private http: HttpClient,
    private router: Router
  ) {}
  email: string = '';
  password: string = '';

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl([
        '',
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }
  // Registreringen måste jämföra password med confirmed password, samt skicka tillbaka följande meddelanden:
  // - password fälten överenstämmer inte
  // - Något fält är tomt

  submitForm() {
    const formData = this.registerForm.getRawValue();
    this.registerService.register(formData).subscribe((result: any) => {
      result = Object(result).data;
      localStorage.setItem('token', result.token);
      localStorage.setItem('id', result.id);
      localStorage.setItem('name', result.name);
      this.router.navigate(['/login']);
    });
  }
}
