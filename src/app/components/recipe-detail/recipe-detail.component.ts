import { Component, OnInit } from '@angular/core';
import { AnalyzedInstruction, ExtendedIngredient, Recipe, } from 'src/app/interface/recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { ListService } from 'src/app/services/list.service';
import { ActivatedRoute } from '@angular/router';
import { List } from 'src/app/interface/list';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  extendedIngredients: ExtendedIngredient[] = [];
  analyzedInstructions: AnalyzedInstruction[] = [];
  id!: any;
  recipe: Recipe;
  steps!: any;
  lists: List[] = [];

  constructor(
    private recipeService: RecipeService,
    private listService: ListService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.listService.getAll().subscribe((data: List[]) => {
      this.lists = Object(data);
      console.log("Listor " + this.lists);
    });

    this.recipeService.getOneRecipe(this.id).subscribe((data: Recipe) => {
      this.recipe = data;
      this.extendedIngredients = this.recipe.extendedIngredients;
      this.analyzedInstructions = this.recipe.analyzedInstructions;
      this.steps = this.analyzedInstructions[0].steps;
      return this.recipe;
    });
  }


  addRecipeToList(): void {
    this.listService.addToList(
      this.recipe.id,
      this.recipe.title,
      this.recipe.image
    );
  }
}