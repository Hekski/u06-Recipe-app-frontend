import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/list/list.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { NoPageFoundComponent } from './components/no-page-found/no-page-found.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { ListDetailComponent } from './components/list-detail/list-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipe', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'list', component: ListComponent },
  { path: 'list-detail/:id', component: ListDetailComponent },
  { path: 'recipe', component: RecipeComponent },
  { path: 'recipe-detail/:id', component: RecipeDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: '/recipe/create/', component: RecipeComponent }, //Create new list button
  { path: '**', component: NoPageFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
