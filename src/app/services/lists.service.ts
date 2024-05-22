import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class ListsService {
  //private http = inject(HttpClient);

  constructor(
    private http: HttpClient
  ) { }

  createList(data: any) {
    return this.http.post(environment.URL + '/lists', data);
  }

  listAll() {
    return this.http.get(environment.URL + '/lists');
  }

  searchList(params: string) {
    return this.http.get(environment.URL + '/lists/' + params );
  }

  deleteList(params: string) {
    return this.http.delete(environment.URL + '/lists/' + params);
  }
}
