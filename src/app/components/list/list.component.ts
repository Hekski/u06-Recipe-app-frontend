import { Component, OnInit, EventEmitter } from '@angular/core';
import { List } from 'src/app/interface/list';
import { ListService } from 'src/app/services/list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { empty } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  lists: List[] = [];
  errorStatus: any;
  errorMessage: any;

  constructor(
    public listService: ListService,
    private route: ActivatedRoute,
    public router: Router,
    private _toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.listService.getAll().subscribe((data: List[]) => {
      this.lists = Object(data);
    });
  }

  addInfoToast(result: string) {
    this._toastService.info(result);
  }

  addInfoToastError() {
    this._toastService.info(this.errorMessage);
  }

  createList() {
    const data = {
      title: (document.getElementById('listForm') as HTMLInputElement).value,
    };
    this.listService.create(data).subscribe(
      (result: any) => {
        result = Object(result);

        if (result) {
          this.addInfoToast(result.message);
          this.ngOnInit();
        }
      },
      (error) => {
        this.errorMessage = "Form is empty, name your list!";

        if (!error.ok) {
          this.addInfoToastError();
        }
      }
    );
  }

  deleteList(id: number) {
    this.listService.delete(id).subscribe((result: any) => {
      result = Object(result);
      this.lists = this.lists.filter((item) => item.id !== id);
      this.addInfoToast(result.message);
      this.router.navigate(['/list']);
    });
  }
}
