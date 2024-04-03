import { Routes } from '@angular/router';

export const webRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./web.component').then((m) => m.WebComponent),
    children: [
      {
        path: '',
        redirectTo: 'todo',
        pathMatch: 'full',
      },
      {
        path: 'todo',
        loadComponent: () =>
          import('../todo/todo.component').then((m) => m.TodoComponent),
      },
      {
        path: 'notes',
        loadComponent: () =>
          import('../notes/notes.component').then((m) => m.NotesComponent),
      },
      {
        path: 'tags',
        loadComponent: () =>
          import('../tags/tags.component').then((m) => m.TagsComponent),
      },
      {
        path: 'search',
        loadComponent: () =>
          import('../search/search.component').then((m) => m.SearchComponent),
      },
      {
        path: 'trash',
        loadComponent: () =>
          import('../trash/trash.component').then((m) => m.TrashComponent),
      },
    ],
  },
];
