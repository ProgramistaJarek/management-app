import { Component, inject, OnInit, Signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CategoriesListChipComponent } from '../categories/categories-list-chip/categories-list-chip.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { Store } from '@ngrx/store';
import { Todo } from '../model';
import {
  selectCompletedTodos,
  selectUncompletedTodos,
} from '../state/todo/todo.selectors';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    AddTodoComponent,
    TodoListComponent,
    CategoriesListChipComponent,
  ],
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit {
  private store = inject(Store);

  completedTodos!: Signal<Todo[]>;
  uncompletedTodos!: Signal<Todo[]>;

  selectCategory!: string;

  ngOnInit() {
    this.getTodos();
  }

  onSelectCategory(categoryName: string) {
    this.selectCategory = categoryName;
    this.getTodos();
  }

  private getTodos() {
    this.completedTodos = this.store.selectSignal(
      selectCompletedTodos(this.selectCategory),
    );
    this.uncompletedTodos = this.store.selectSignal(
      selectUncompletedTodos(this.selectCategory),
    );
  }
}
