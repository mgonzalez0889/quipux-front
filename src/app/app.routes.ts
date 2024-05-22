import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    redirectTo: 'lists'
  },
  {
    path: 'lists',
    loadChildren: () => import('./lists/lists.routing')
  }
];
