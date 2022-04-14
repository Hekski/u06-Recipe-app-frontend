import { Component, Injectable, OnInit } from '@angular/core';
import { Recipe } from 'src/app/interface/recipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-index',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit {
  recipes: Recipe[] = [];
  router: any;
  category!: string;
  data: any;
  filter: string[] = [];

  constructor(public recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getAll().subscribe((data: Recipe[]) => {
      this.recipes = Object(data).results;
      console.log(this.recipes);
    });
  }

  getPreference(event: any) {
    if (this.filter.includes(event.target.name)) {
      this.filter = this.filter.filter((item) => {
        return item != event.target.name;
      });
    } else {
      this.filter.push(event.target.name);
    }
    console.log(this.filter);
  }

  getCategory(event: any) {
    this.recipeService
      .getTypes(event.target.name, this.filter)
      .subscribe((data: Recipe[]) => {
        this.recipes = Object(data).results;
        console.log(this.recipes);
      });
  }

  getSelectedDropdown(event: any) {
    this.recipeService.selectedDropdown;
  }
}
