import {Component, inject, OnInit} from '@angular/core';
import {JsonPipe, NgForOf} from "@angular/common";
import {FormArray, FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ListsService} from "../../services/lists.service";

@Component({
  selector: 'app-form-list',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './form-list.component.html',
  styleUrl: './form-list.component.scss'
})
export default class FormListComponent implements OnInit{

  ngOnInit(): void {
      this.listService.list.subscribe((list: any) => {
        this.form.patchValue(list.value)
      })
  }

  private fb = inject(FormBuilder);
  private listService = inject(ListsService)

  form = this.fb.group({
    nombre: this.fb.control('',[]),
    descripcion: this.fb.control('',[]),
    canciones: this.fb.array([])
  })

  addSongs() {
    const songGroup = this.fb.group({
      titulo: '',
      artista: '',
      album: '',
      anno: '',
      genero: ''
    });
    this.songs.push(songGroup);
  }

  get songs() {
    return this.form.get('canciones') as FormArray;
  }

  crearLista() {

    if (this.form.invalid) {
      return;
    }

    this.createList(this.form.getRawValue());

  }

  private createList(data: any) {
    this.listService.createList(data).subscribe((response) => {
      this.listService.state.next(true);
      this.form.reset({});
    })
  }


}
