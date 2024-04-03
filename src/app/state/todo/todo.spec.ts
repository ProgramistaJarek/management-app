import { Todo } from '../../model';
import {
  selectCompletedTodos,
  selectTodos,
  selectTodosByCategoryId,
  selectTodosById,
  selectTodosOutTrash,
  selectTrashTodos,
  selectUncompletedTodos,
} from './todo.selectors';
import { TodosActions } from './todo.actions';
import { todosReducer } from './todo.reducer';

const initialState: Todo[] = [
  {
    id: '1',
    topic: 'Todo App Angular',
    completed: false,
    color: '',
    tags: ['47cc1822-1e52-4576-b001-9f1f3eef0d81'],
    categoryId: 'category1',
    userId: '3dec2ed5-2b7f-4134-97ed-49678ff1e366',
    trash: false,
    createdAt: new Date(),
  },
  {
    id: '2',
    topic: 'Todo App Angular',
    completed: true,
    color: '',
    tags: ['47cc1822-1e52-4576-b001-9f1f3eef0d81'],
    categoryId: 'category2',
    userId: '3dec2ed5-2b7f-4134-97ed-49678ff1e366',
    trash: false,
    createdAt: new Date(),
  },
  {
    id: '3',
    topic: 'Todo App Angular',
    completed: false,
    color: '',
    tags: ['47cc1822-1e52-4576-b001-9f1f3eef0d81'],
    categoryId: 'category1',
    userId: '3dec2ed5-2b7f-4134-97ed-49678ff1e366',
    trash: true,
    createdAt: new Date(),
  },
  {
    id: '4',
    topic: 'Todo App Angular',
    completed: true,
    color: '',
    tags: ['47cc1822-1e52-4576-b001-9f1f3eef0d81'],
    categoryId: 'category2',
    userId: '3dec2ed5-2b7f-4134-97ed-49678ff1e366',
    trash: true,
    createdAt: new Date(),
  },
  {
    id: '5',
    topic: 'Todo App Angular',
    completed: true,
    color: '',
    tags: ['47cc1822-1e52-4576-b001-9f1f3eef0d81'],
    categoryId: 'category1',
    userId: '3dec2ed5-2b7f-4134-97ed-49678ff1e366',
    trash: false,
    createdAt: new Date(),
  },
];

describe('Todo test', () => {
  describe('Todo selectors', () => {
    it('should select the todo list', () => {
      const result = selectTodos.projector(initialState);
      expect(result.length).toEqual(5);
    });

    it('should select the completed todo list', () => {
      const result = selectCompletedTodos().projector(initialState);
      expect(result.length).toEqual(2);
    });

    it('should select the completed todo list with category', () => {
      const result = selectCompletedTodos('category2').projector(initialState);
      expect(result.length).toEqual(1);
    });

    it('should select the un completed todo list', () => {
      const result = selectUncompletedTodos().projector(initialState);
      expect(result.length).toEqual(1);
    });

    it('should select the un completed todo list with category', () => {
      const result =
        selectUncompletedTodos('category1').projector(initialState);
      expect(result.length).toEqual(1);
    });

    it('should select the todo list by category', () => {
      const result =
        selectTodosByCategoryId('category1').projector(initialState);
      expect(result.length).toEqual(2);
    });

    it('should select only one todo', () => {
      const result = selectTodosById('1').projector(initialState);
      expect(result).toBeTruthy();
    });

    it('should select all todo in trash', () => {
      const result = selectTrashTodos().projector(initialState);
      expect(result.length).toEqual(2);
    });

    it('should select all todo out of trash', () => {
      const result = selectTodosOutTrash().projector(initialState);
      expect(result.length).toEqual(3);
    });
  });

  describe('Todo reducer', () => {
    it('should return the default state', () => {
      // given
      const action = {
        type: 'Unknown',
      };

      // when
      const state = todosReducer(initialState, action);

      // then
      expect(state).toBe(initialState);
    });

    it('should add todo by action', () => {
      // given
      const newState: Todo = {
        id: 'firstId',
        topic: 'topic',
        tags: [],
        userId: '',
        trash: false,
        createdAt: new Date(),
        color: '',
        categoryId: '',
        completed: false,
      };

      // when
      const action = TodosActions.addTodoSuccess({ todo: newState });
      const state = todosReducer(initialState, action);

      // then
      expect(state[state.length - 1]).toEqual(newState);
      expect(state).not.toBe(initialState);
    });

    it('should edit todo by action', () => {
      // given
      const edit = {
        id: '2',
        topic: 'Reducer test',
        tags: ['47cc1822-1e52-4576-b001-9f1f3eef0d81', 'tag2'],
        categoryId: 'category3',
        trash: false,
      } as Todo;

      // when
      const action = TodosActions.editTodoSuccess({ editTodo: edit });
      const state = todosReducer(initialState, action);

      // then
      const todoToTest = state.find((todo) => todo.id === edit.id)!;
      expect(todoToTest.topic).toEqual(edit.topic);
      expect(todoToTest.categoryId).toEqual(edit.categoryId);
      expect(todoToTest.tags.length).toBe(edit.tags.length);
      expect(state.length).toBe(initialState.length);
    });

    it('should delete todo by action', () => {
      // given
      const todoId = '5';

      // when
      const action = TodosActions.deleteTodoSuccess({ todoId });
      const state = todosReducer(initialState, action);

      // then
      const findDeleteTodo = state.find((todo) => todo.id === todoId);
      expect(findDeleteTodo).toBeUndefined();
      expect(state.length).toBe(initialState.length - 1);
    });

    it('should move todo to trash by action', () => {
      // given
      const todoId = '5';

      // when
      const action = TodosActions.moveTodoToTrash({ todoId });
      const state = todosReducer(initialState, action);

      // then
      const findTodo = state.find((todo) => todo.id === todoId)!;
      expect(findTodo).toBeDefined();
      expect(findTodo.trash).toBeTruthy();
    });

    it('should restore todo to trash by action', () => {
      // given
      const todoId = '3';

      // when
      const action = TodosActions.restoreTodo({ todoId });
      const state = todosReducer(initialState, action);

      // then
      const findTodo = state.find((todo) => todo.id === todoId)!;
      expect(findTodo).toBeDefined();
      expect(findTodo.trash).toBeFalsy();
    });
  });
});
