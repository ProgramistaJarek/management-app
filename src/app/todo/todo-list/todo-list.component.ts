import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { Store } from '@ngrx/store';
import { CommentsListDialogComponent } from '../../comments/comments-list-dialog/comments-list-dialog.component';
import { Todo } from '../../model';
import { TodosActions } from '../../state/todo/todo.actions';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [MatListModule, TodoItemComponent],
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
  private store = inject(Store);
  private dialog = inject(MatDialog);

  @Input({ required: true }) completedTodos!: Todo[];
  @Input({ required: true }) uncompletedTodos!: Todo[];

  updateTodoStatus(editTodo: Todo) {
    this.store.dispatch(TodosActions.editTodo({ editTodo }));
  }

  onMoveTodoToTrash(todoId: string) {
    this.store.dispatch(TodosActions.moveTodoToTrash({ todoId }));
  }

  onEditTodo(todo: Todo) {
    this.dialog
      .open(EditTodoDialogComponent, {
        data: todo.id,
      })
      .afterClosed()
      .subscribe((editTodo: Todo) => {
        if (!editTodo) return;

        this.store.dispatch(TodosActions.editTodo({ editTodo }));
      });
  }

  onOpenCommentsList(todo: Todo) {
    this.dialog.open(CommentsListDialogComponent, {
      data: todo,
    });
  }
}
