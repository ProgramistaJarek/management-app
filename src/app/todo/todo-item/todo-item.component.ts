import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Todo } from '../../model';
import { returnBackground } from '../../shared/components/color-picker/color-picker';
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [NgClass, MatCardModule, MatIconModule, MatButtonModule, MatTooltip],
  templateUrl: './todo-item.component.html',
})
export class TodoItemComponent {
  @Input({ required: true }) todo!: Todo;
  @Input() inTrash = false;

  @Output() changeTodo = new EventEmitter<Todo>();
  @Output() moveTodoToTrash = new EventEmitter<string>();
  @Output() editTodo = new EventEmitter<Todo>();
  @Output() openComments = new EventEmitter<Todo>();
  @Output() deleteTodo = new EventEmitter<string>();
  @Output() restoreTodo = new EventEmitter<string>();

  returnBackground = returnBackground;

  onChangeTodo(completed: boolean) {
    const updatedTodo: Todo = {
      ...this.todo,
      completed,
    };
    this.changeTodo.emit(updatedTodo);
  }

  onMoveTodoToTrash(todoId: string) {
    this.moveTodoToTrash.emit(todoId);
  }

  onEditTodo(todo: Todo) {
    this.editTodo.emit(todo);
  }

  onOpenComments(todo: Todo) {
    this.openComments.emit(todo);
  }

  onDeleteTodo(todoId: string) {
    this.deleteTodo.emit(todoId);
  }

  onRestoreTodo(todoId: string) {
    this.restoreTodo.emit(todoId);
  }
}
