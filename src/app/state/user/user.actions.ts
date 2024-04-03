import { createActionGroup, props } from '@ngrx/store';
import { User } from '../../model';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Get User': props<{ user: User }>(),
  },
});
