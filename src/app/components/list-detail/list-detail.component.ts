import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { List } from 'src/app/interface/list';
import { Recipe } from 'src/app/interface/recipe';
import { ListService } from 'src/app/services/list.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { ToastService } from 'angular-toastify';

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
  router: any;

  constructor(
    public listService: ListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private _toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');

    this.listService.getAll().subscribe((data: List[]) => {
      this.lists = Object(data);
      this.lists = this.lists.filter((item) => item.id == this.id);
      const listName = this.lists;
    });

    this.recipeService.getAllFromAPI(this.id).subscribe((data: Recipe[]) => {
      this.recipes = Object(data);
    });
  }

  addInfoToast(result: string) {
    this._toastService.info(result);
  }

  deleteRecipe(id: number) {
    if (id > 0) {
      this.recipeService.deleteOneRecipe(id).subscribe(async (result: any) => {
        this.lists = this.lists.filter((item) => item.id !== id);
        this.addInfoToast(result.message);
        this.ngOnInit();
        this.router.navigate(['/list']);
      });
    } else {
      window.location.reload();
    }
  }
}
