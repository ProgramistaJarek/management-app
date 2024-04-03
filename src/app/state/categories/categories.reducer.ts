import { createReducer, on } from '@ngrx/store';
import { Category } from '../../model';
import { CategoriesActions } from './categories.actions';

const initialState: Category[] = [
  {
    id: 'bb4f45b9-7a79-4a4b-b4d7-2a22e59044c0',
    name: 'Dev',
  },
  {
    id: crypto.randomUUID(),
    name: 'Daily tasks',
    color: 'green-400',
  },
];

export const categoriesReducer = createReducer(
  initialState,
  on(CategoriesActions.addCategorySuccess, (_state, { category }) => [
    ..._state,
    { ...category, id: crypto.randomUUID() },
  ]),
  on(CategoriesActions.editCategorySuccess, (_state, { category }) =>
    _state.map((item) => (item.id === category.id ? category : item)),
  ),
  on(CategoriesActions.deleteCategory, (_state, { categoryId }) =>
    _state.filter((category) => category.id !== categoryId),
  ),
);
