import { createReducer, on } from '@ngrx/store';
import { Tag } from '../../model';
import { TagsActions } from './tags.actions';

const initialState: Tag[] = [
  {
    id: '47cc1822-1e52-4576-b001-9f1f3eef0d81',
    name: 'web',
  },
  {
    id: '4aa1b777-0085-401f-ae0f-c1a1f95a9581',
    name: 'front end',
  },
  {
    id: 'd458dddb-2fb2-4b7f-87f6-64bc22384f1d',
    name: 'back end',
  },
];

export const tagsReducer = createReducer(
  initialState,
  on(TagsActions.addTagSuccess, (_state, { newTag }) => [..._state, newTag]),
  on(TagsActions.deleteTagSuccess, (_state, { tagId }) =>
    _state.filter((tag) => tag.id !== tagId),
  ),
);
