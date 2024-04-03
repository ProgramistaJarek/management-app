import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Comment } from '../../model';

@Component({
  selector: 'app-comment-input',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './comment-input.component.html',
})
export class CommentInputComponent {
  comment = {} as Comment;

  @Output() saveComment = new EventEmitter<Comment>();

  onSaveComment() {
    this.saveComment.emit({
      ...this.comment,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    });

    this.comment = {} as Comment;
  }
}
