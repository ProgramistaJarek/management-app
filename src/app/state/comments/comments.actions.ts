import { createActionGroup, props } from '@ngrx/store';
import { Comment } from '../../model';

export const CommentsActions = createActionGroup({
  source: 'Comments',
  events: {
    'Add Comment': props<{ comment: Comment }>(),
    'Delete Comment': props<{ commentId: string }>(),
    'Delete Every Comments By Todo Id': props<{ todoId: string }>(),
  },
});
