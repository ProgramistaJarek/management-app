import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { TodosActions } from './todo.actions';
import { catchError, map, repeat, switchMap, tap } from 'rxjs';
import { Todo } from '../../model';
import { CommentsActions } from '../comments/comments.actions';
import { SnackbarService } from '../../shared/snackbar/snackbar.service';

export const handleAddTodo = createEffect(
  (actions$ = inject(Actions), snackbarService = inject(SnackbarService)) => {
    return actions$.pipe(
      ofType(TodosActions.addTodo),
      map((value) => {
        if (value.todo.topic.length < 30) {
          snackbarService.success('Todo saved!');
          return TodosActions.addTodoSuccess({ todo: value.todo });
        } else throw new Error('Max length of topic must be less or equal 30!');
      }),
      catchError((error, caught) => {
        console.error(error.message);
        snackbarService.error(error.message);
        return caught;
      }),
    );
  },
  { functional: true },
);

export const handleEditTodo = createEffect(
  (actions$ = inject(Actions), snackbarService = inject(SnackbarService)) => {
    return actions$.pipe(
      ofType(TodosActions.editTodo),
      map((value) => {
        const editTodo: Todo = {
          ...value.editTodo,
          updatedAt: new Date(),
        };

        if (editTodo.topic.length >= 1 && editTodo.topic.length < 30) {
          snackbarService.success('Todo saved!');
          return TodosActions.editTodoSuccess({ editTodo });
        } else if (editTodo.topic.length > 30)
          throw new Error('Max length of topic must be less or equal 30!');
        else throw new Error('Todo need to have title!');
      }),
      catchError((error, caught) => {
        console.error(error.message);
        snackbarService.error(error.message);
        return caught;
      }),
    );
  },
  { functional: true },
);

export const handleDeleteTodo = createEffect(
  (actions$ = inject(Actions), snackbarService = inject(SnackbarService)) => {
    return actions$.pipe(
      ofType(TodosActions.deleteTodo),
      switchMap((value) => [
        CommentsActions.deleteEveryCommentsByTodoId({ todoId: value.todoId }),
        TodosActions.deleteTodoSuccess({ todoId: value.todoId }),
      ]),
      tap(() => snackbarService.error('Todo deleted!')),
      repeat(),
    );
  },
  { functional: true },
);

export const handleMoveTodoToTrash = createEffect(
  (actions$ = inject(Actions), snackbarService = inject(SnackbarService)) => {
    return actions$.pipe(
      ofType(TodosActions.moveTodoToTrash),
      tap(() => snackbarService.info('Todo moved to trash!')),
    );
  },
  { functional: true, dispatch: false },
);

export const handleRestoreTodo = createEffect(
  (actions$ = inject(Actions), snackbarService = inject(SnackbarService)) => {
    return actions$.pipe(
      ofType(TodosActions.restoreTodo),
      tap(() => snackbarService.info('Todo restored!')),
    );
  },
  { functional: true, dispatch: false },
);
