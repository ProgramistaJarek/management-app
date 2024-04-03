import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { TodosActions } from './todo/todo.actions';
import { SnackbarService } from '../shared/snackbar/snackbar.service';

export const displayErrorAlert = createEffect(
  (snackbarService = inject(SnackbarService)) => {
    return inject(Actions).pipe(
      ofType(TodosActions.editTodoFailure, TodosActions.addTodoFailure),
      tap(({ errorMsg }) => snackbarService.error(errorMsg)),
    );
  },
  { functional: true, dispatch: false },
);
