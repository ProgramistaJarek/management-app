import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Comment } from '../../model';

export const selectComments = createFeatureSelector<Comment[]>('comments');

export const selectCommentsByTodoId = (todoId: string) =>
  createSelector(selectComments, (comments) =>
    comments.filter((comment) => comment.todoId === todoId)
  );
