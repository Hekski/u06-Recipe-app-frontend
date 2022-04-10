import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/interface/list';
import { ListService } from 'src/app/services/list.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-index',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  lists: List[] = [];
  createListItem!: FormGroup;

  constructor(public listService: ListService, public router: Router) {}

  ngOnInit(): void {
    this.listService.getAll().subscribe((data: List[]) => {
      this.lists = Object(data);
      console.log(this.lists);
    });
  }
  
  createList() {
    const data = {
      title: (document.getElementById('listForm') as HTMLInputElement).value,
    };
    // let title = (document.getElementById('listForm') as HTMLInputElement).value;
    this.listService.create(data)
    .subscribe((result: any) => {
      result = Object(result);
      console.log(result);
    } ) 
  }

  deleteList(id: number) {
    this.listService.delete(id).subscribe((res) => {
      this.lists = this.lists.filter((item) => item.id !== id);
      console.log('List deleted successfully!');
    });
  }
}
