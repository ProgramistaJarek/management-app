import { createReducer, on } from '@ngrx/store';
import { Todo } from '../../model';
import { TodosActions } from './todo.actions';

const initialState: Todo[] = [
  {
    id: '46e86160-237b-42aa-8a4b-e440198131d7',
    topic: 'Todo App Angular',
    completed: false,
    color: '',
    tags: ['47cc1822-1e52-4576-b001-9f1f3eef0d81'],
    categoryId: 'bb4f45b9-7a79-4a4b-b4d7-2a22e59044c0',
    userId: '3dec2ed5-2b7f-4134-97ed-49678ff1e366',
    trash: false,
    createdAt: new Date(),
  },
  {
    id: 'd338d9b8-e416-40b0-80cc-503738b3cdc4',
    topic: 'Todo App Angular v2',
    completed: false,
    color: '',
    tags: ['47cc1822-1e52-4576-b001-9f1f3eef0d81'],
    categoryId: 'bb4f45b9-7a79-4a4b-b4d7-2a22e59044c0',
    userId: '3dec2ed5-2b7f-4134-97ed-49678ff1e366',
    trash: true,
    createdAt: new Date(),
  },
  {
    id: '01d6016a-7564-4085-9883-2894f72c95ec',
    topic: 'Todo App Angular v3',
    completed: false,
    color: '',
    tags: ['47cc1822-1e52-4576-b001-9f1f3eef0d81'],
    categoryId: 'bb4f45b9-7a79-4a4b-b4d7-2a22e59044c0',
    userId: '3dec2ed5-2b7f-4134-97ed-49678ff1e366',
    trash: true,
    createdAt: new Date(),
  },
];

export const todosReducer = createReducer(
  initialState,
  on(TodosActions.addTodoSuccess, (_state, { todo }) => [..._state, todo]),
  on(TodosActions.editTodoSuccess, (_state, { editTodo }) =>
    _state.map((item) =>
      item.id === editTodo.id
        ? {
            ...item,
            ...editTodo,
          }
        : item,
    ),
  ),
  on(TodosActions.moveTodoToTrash, (_state, { todoId }) =>
    _state.map((item) =>
      item.id === todoId
        ? {
            ...item,
            trash: true,
            updatedAt: new Date(),
          }
        : item,
    ),
  ),
  on(TodosActions.restoreTodo, (_state, { todoId }) =>
    _state.map((item) =>
      item.id === todoId
        ? {
            ...item,
            trash: false,
            updatedAt: new Date(),
          }
        : item,
    ),
  ),
  on(TodosActions.deleteTodoSuccess, (_state, { todoId }) =>
    _state.filter((todo) => todo.id !== todoId),
  ),
);
