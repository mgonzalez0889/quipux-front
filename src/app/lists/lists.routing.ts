import {Routes} from "@angular/router";

export default [
  {
    path:'',
    loadComponent: () => import('./lists/lists.component')
  }
] as Routes;
