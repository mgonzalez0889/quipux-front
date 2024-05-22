import {Component, inject, OnInit} from '@angular/core';
import FormListComponent from "../form-list/form-list.component";
import {ListsService} from "../../services/lists.service";
import {Observable} from "rxjs";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [
    FormListComponent,
    NgForOf,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.scss'
})
export default class ListsComponent implements OnInit{

  private listService = inject(ListsService);
  listObservable!: Observable<any>;
  result!: string;
  query: any;
  view!: boolean;
  deleteList!: boolean;


  getAll() {
    this.listObservable = this.listService.listAll();

  }

  ngOnInit(): void {
    this.getAll();
    this.listService.state.subscribe((state) => {
      if (state) {
        this.getAll();
      }
    })
  }

  verLista(item: any) {
    this.listService.list.next({value: item});
    const {nombre} = item
    this.query = nombre;
    this.view = true
    this.deleteList = false;
  }

  dropList(item: any) {
    this.listService.list.next({value: item});
    const {nombre} = item
    this.query = nombre;
    this.view = false
    this.deleteList = true;
  }

  searchData(event: Event) {
    const filter = event.target as HTMLInputElement;
    const value = filter.value;
    this.view = true;
    this.deleteList = false;

    this.listService.searchList(value).subscribe((response) => {
      if (response) {
        this.result = 'Encontrado';
      } else {
        this.result = 'No encontrado!'
      }
    })
  }

  deleteData(event: Event) {
    const filter = event.target as HTMLInputElement;
    const value = filter.value;
    this.view = false;
    this.deleteList = true;

    this.listService.deleteList(value).subscribe((response) => {
      this.listService.state.next(true);
    })
  }



}
