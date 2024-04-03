import { Component, Inject, OnInit, Signal, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { Store } from '@ngrx/store';
import { Comment, Todo } from '../../model';
import { CommentsActions } from '../../state/comments/comments.actions';
import { selectCommentsByTodoId } from '../../state/comments/comments.selectors';
import { CommentInputComponent } from '../comment-input/comment-input.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-comments-list-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    CommentInputComponent,
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './comments-list-dialog.component.html',
})
export class CommentsListDialogComponent implements OnInit {
  private store = inject(Store);

  commentText = '';
  commentsList!: Signal<Comment[]>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Todo) {}

  ngOnInit(): void {
    this.commentsList = this.store.selectSignal(
      selectCommentsByTodoId(this.data.id)
    );
  }

  onAddNewComment(comment: Comment) {
    this.store.dispatch(
      CommentsActions.addComment({
        comment: {
          ...comment,
          todoId: this.data.id,
        },
      })
    );
  }

  onDeleteComment(commentId: string) {
    this.store.dispatch(CommentsActions.deleteComment({ commentId }));
  }
}
