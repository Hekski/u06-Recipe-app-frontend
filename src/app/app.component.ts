import { Component } from '@angular/core';
import { LoginService } from './services/login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Recipe Test App';
  isLoggedIn!: boolean;

  constructor(private loginService: LoginService) {
  }
  ngOnInit() {
    this.isLoggedIn = this.loginService.isUserLoggedIn();
  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    alert("User logged out");
  }
}
