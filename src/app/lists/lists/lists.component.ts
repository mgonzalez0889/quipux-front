import { Component } from '@angular/core';
import FormListComponent from "../form-list/form-list.component";

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [
    FormListComponent
  ],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.scss'
})
export default class ListsComponent {

}
