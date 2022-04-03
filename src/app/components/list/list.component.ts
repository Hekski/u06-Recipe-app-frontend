import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/interface/list';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-index',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  lists: List[] = [];

  constructor(public listService: ListService) {}

  ngOnInit(): void {
    this.listService.getAll().subscribe((data: List[]) => {
      this.lists = Object(data);
      console.log(this.lists);
    });
  }

  deleteList(id: number) {
    this.listService.delete(id).subscribe((res) => {
      this.lists = this.lists.filter((item) => item.id !== id);
      console.log('List deleted successfully!');
    });
  }
}
