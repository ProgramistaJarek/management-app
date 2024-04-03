import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'web',
    pathMatch: 'full',
  },
  {
    path: 'web',
    loadChildren: () => import('./web/web.routes').then((m) => m.webRoutes),
  },
  { path: '**', redirectTo: '/' },
];
