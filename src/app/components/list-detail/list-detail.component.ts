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
  id: number;
  recipe: Recipe;
  listName: any;

  constructor(
    public listService: ListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');

    this.listService.getAll().subscribe((data: List[]) => {
      this.lists = Object(data);
      console.log(this.lists);
      this.lists = this.lists.filter((item) => item.id == this.id);
      const listName = this.lists;
      console.log(listName);
    });

    this.recipeService.getAllFromAPI(this.id).subscribe((data: Recipe[]) => {
      this.recipes = Object(data);
    });

    
  }

  deleteRecipe(id: number) {
    this.recipeService.deleteOneRecipe(id).subscribe((res) => {
      this.lists = this.lists.filter((item) => item.id !== id);
      console.log('Recipe deleted successfully! ' + res);
      this.ngOnInit();
    });
  }
}
