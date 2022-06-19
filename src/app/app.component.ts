import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { ToastService } from 'angular-toastify';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Recipe Test App';
  isLoggedIn!: boolean;

  constructor(
    private loginService: LoginService,
    private _toastService: ToastService
  ) {}
  ngOnInit() {
    this.isLoggedIn = this.loginService.isUserLoggedIn();
  }

  addInfoToast() {
    this._toastService.success('Logging out...');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    this.ngOnInit();
    this.addInfoToast();
  }
}
