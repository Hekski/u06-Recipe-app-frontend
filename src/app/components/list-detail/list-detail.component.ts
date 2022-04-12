import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { List } from 'src/app/interface/list';
import { Recipe } from 'src/app/interface/recipe';
import { ListService } from 'src/app/services/list.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css'],
})
export class ListDetailComponent implements OnInit {
  lists: List[] = [];
  recipes: Recipe[] = [];
  public id: number;
  recipesSpoon: any;

  constructor(
    public listService: ListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');

    /* this.listService.subscribe((data:List[]) => {
      this.lists = Object(data);
    }) */

    this.recipeService.getAllFromAPI(this.id).subscribe((data: Recipe[]) => {
      this.recipes = Object(data);
    });
    console.log("HEJ" + this.recipes);
  }

  deleteRecipe(id: number) {
    this.recipeService.deleteOneRecipe(id).subscribe((res) => {
      this.lists = this.lists.filter((item) => item.id !== id);
      console.log('Recipe deleted successfully! ' + res);
      this.ngOnInit();      
    });
  }
}
