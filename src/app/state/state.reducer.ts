import {ActionReducerMap, combineReducers, createReducer, on} from '@ngrx/store';
import {AppState, Tag, User} from '../model';
import {categoriesReducer} from './categories/categories.reducer';
import {commentsReducer} from './comments/comments.reducer';
import {notesReducer} from './notes/notes.reducer';
import {tagsReducer} from './tags/tags.reducer';
import {todosReducer} from './todo/todo.reducer';
import {userReducer} from './user/user.reducer';
import {TagsActions} from "./tags/tags.actions";

export const reducers: ActionReducerMap<AppState> = {
  todos: todosReducer,
  user: userReducer,
  categories: categoriesReducer,
  comments: commentsReducer,
  tags: tagsReducer,
  notes: notesReducer,
};
