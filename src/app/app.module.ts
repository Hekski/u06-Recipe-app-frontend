import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NoPageFoundComponent } from './components/no-page-found/no-page-found.component';
import { ListComponent } from './components/list/list.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RegisterComponent } from './components/register/register.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { ListDetailComponent } from './components/list-detail/list-detail.component';
import { LoginComponent } from './components/login/login.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastService, AngularToastifyModule } from 'angular-toastify';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NoPageFoundComponent,
    ListComponent,
    RecipeComponent,
    LoginComponent,
    RegisterComponent,
    RecipeDetailComponent,
    ListDetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularToastifyModule,
  ],

  providers: [ToastService],
  bootstrap: [AppComponent],
})
export class AppModule {}
