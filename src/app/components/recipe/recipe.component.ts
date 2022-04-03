import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/interface/recipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-index',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(public recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getAll().subscribe((data: Recipe[]) => {
      this.recipes = Object(data).results;
      console.log(this.recipes);
    });
  }

  deletePost(id: number) {
    this.recipeService.delete(id).subscribe((res) => {
      this.recipes = this.recipes.filter((item) => item.id !== id);
      console.log('Post deleted successfully!');
    });
  }
}
