import { createReducer, on } from '@ngrx/store';
import { Comment } from '../../model';
import { CommentsActions } from './comments.actions';

const initialState: Comment[] = [];

export const commentsReducer = createReducer(
  initialState,
  on(CommentsActions.addComment, (_state, { comment }) => [..._state, comment]),
  on(CommentsActions.deleteComment, (_state, { commentId }) =>
    _state.filter((comment) => comment.id !== commentId)
  ),
  on(CommentsActions.deleteEveryCommentsByTodoId, (_state, { todoId }) =>
    _state.filter((comment) => comment.todoId !== todoId)
  )
);
