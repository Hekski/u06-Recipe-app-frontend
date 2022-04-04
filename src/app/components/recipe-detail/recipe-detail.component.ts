import { Component, OnInit } from '@angular/core';
import { Params, Route } from '@angular/router';
import { Recipe } from 'src/app/interface/recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipes: Recipe[] = [];
  fetchDataService: any;
  id!: any;
  recipe!: Recipe;

  constructor(
    public recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log('lala' + this.id);
    
    this.recipeService.find(this.id).subscribe((data: Recipe) => {
      this.recipe = data;
      console.log(data);
      // this.recipe.summary = recipe.summary.replace(/\n/g, '<br>');
    });
  }
}
function data(data: any): any {
  throw new Error('Function not implemented.');
}

