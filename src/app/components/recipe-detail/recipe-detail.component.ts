import { Component, OnInit } from '@angular/core';
import { AnalyzedInstruction, ExtendedIngredient, Recipe, } from 'src/app/interface/recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  extendedIngredients: ExtendedIngredient[] = [];
  analyzedInstructions: AnalyzedInstruction[] = [];
  numbers: Number[] = [];
  id!: any;
  recipe!: Recipe;
  steps!: any;

  constructor(
    public recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log('lala' + this.id);

    this.recipeService.getOneRecipe(this.id).subscribe((data: Recipe) => {
      this.recipe = data;
      console.log(data);
      this.extendedIngredients = this.recipe.extendedIngredients;
      this.analyzedInstructions = this.recipe.analyzedInstructions;
      this.steps = this.analyzedInstructions[0].steps;
      console.log(this.extendedIngredients);
      console.log(this.analyzedInstructions);
      console.log(this.steps);
    });
  }
}
function data(data: any): any {
  throw new Error('Function not implemented.');
}

