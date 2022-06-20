import { Component, OnInit } from '@angular/core';
import {
  AnalyzedInstruction,
  ExtendedIngredient,
  Recipe,
} from 'src/app/interface/recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { ListService } from 'src/app/services/list.service';
import { ActivatedRoute } from '@angular/router';
import { List } from 'src/app/interface/list';
import { LoginService } from 'src/app/services/login.service';
import { ToastService } from 'angular-toastify';

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
  user_list_id: any;
  list_id: number;
  recipe_id: any;
  message: string;
  isLoggedIn!: boolean;
  item: any;

  constructor(
    private recipeService: RecipeService,
    private listService: ListService,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private _toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.isLoggedIn = this.loginService.isUserLoggedIn();

    this.listService.getAll().subscribe((data: List[]) => {
      this.lists = Object(data);
    });

    this.recipeService.getOneRecipe(this.id).subscribe((data: Recipe) => {
      this.recipe = data;
      this.extendedIngredients = this.recipe.extendedIngredients;
      this.analyzedInstructions = this.recipe.analyzedInstructions;
      this.steps = this.analyzedInstructions[0].steps;
      return this.recipe;
    });
  }

  addInfoToast(_item) {
    this._toastService.info(this.item.message);
    // this._toastService.info("Recipe added to '" + Object(this.lists[this.list_id]) + "'");
  }

  addRecipeToList(
    title: string,
    image: string,
    recipe_id: number,
    list_id: number
  ): void {
    const recipeObject = {
      recipe: title,
      image: image,
      recipe_id: recipe_id,
      list_id: list_id,
    };
    this.recipeService.addToList(recipeObject).subscribe((data: Recipe) => {
      this.item = Object(data);
      this.addInfoToast(this.item);
      this.ngOnInit();
      return data;
    });
  }
}
