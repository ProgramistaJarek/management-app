import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Todo } from '../../model';

export const TodosActions = createActionGroup({
  source: 'Todos',
  events: {
    'Add Todo': props<{ todo: Todo }>(),
    'Add Todo Success': props<{ todo: Todo }>(),
    'Edit Todo': props<{ editTodo: Todo }>(),
    'Edit Todo Success': props<{ editTodo: Todo }>(),
    'Move Todo To Trash': props<{ todoId: string }>(),
    'Restore Todo': props<{ todoId: string }>(),
    'Delete Todo': props<{ todoId: string }>(),
    'Delete Todo Success': props<{ todoId: string }>(),
  },
});
