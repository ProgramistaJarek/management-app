import { createReducer, on } from '@ngrx/store';
import { User } from '../../model';
import { UserActions } from './user.actions';

const initialState: User = {
  id: '3dec2ed5-2b7f-4134-97ed-49678ff1e366',
  firstName: 'Jarosław',
  lastName: 'Lepich',
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.getUser, (_state, { user }) => user)
);
