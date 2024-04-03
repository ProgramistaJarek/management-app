import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Todo } from '../../model';
import { sortDateTime } from '../../shared/helpers';

export const selectTodos = createFeatureSelector<Todo[]>('todos');

export const selectCompletedTodos = (categoryId?: string) =>
  createSelector(selectTodos, (todos) =>
    (categoryId
      ? todos.filter(
          (todo) =>
            todo.completed && todo.categoryId === categoryId && !todo.trash,
        )
      : todos.filter((todo) => todo.completed && !todo.trash)
    ).sort(sortDateTime),
  );

export const selectUncompletedTodos = (categoryId?: string) =>
  createSelector(selectTodos, (todos) =>
    (categoryId
      ? todos.filter(
          (todo) =>
            !todo.completed && todo.categoryId === categoryId && !todo.trash,
        )
      : todos.filter((todo) => !todo.completed && !todo.trash)
    ).sort(sortDateTime),
  );

export const selectTodosByCategoryId = (categoryId: string) =>
  createSelector(selectTodos, (todos) =>
    todos.filter((todo) => todo.categoryId === categoryId && !todo.trash),
  );

export const selectTodosById = (todoId: string) =>
  createSelector(
    selectTodos,
    (todos) => todos.find((todo) => todo.id === todoId && !todo.trash)!,
  );

export const selectTrashTodos = () =>
  createSelector(selectTodos, (todos) =>
    todos.filter((todo) => todo.trash).sort(sortDateTime),
  );

export const selectTodosOutTrash = () =>
  createSelector(selectTodos, (todos) => todos.filter((todo) => !todo.trash));
