import {NgClass} from '@angular/common';
import {Component, inject, Input, OnInit, Signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {Store} from '@ngrx/store';
import {ColorPickerComponent} from '../../shared/components/color-picker/color-picker.component';
import {Category, Todo, User} from '../../model';
import {selectDefaultCategory} from '../../state/categories/categories.selectors';
import {TodosActions} from '../../state/todo/todo.actions';
import {selectUser} from '../../state/user/user.selectors';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ColorPickerComponent,
    ReactiveFormsModule,
    MatButtonModule,
    NgClass
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-todo.component.html',
})
export class AddTodoComponent implements OnInit {
  private store = inject(Store);

  @Input() set selectCategory(value: string) {
    this.defaultCategory = this.store.selectSignal(
      selectDefaultCategory(value)
    );
  }

  todoForm = new FormGroup({
    topic: new FormControl(''),
    color: new FormControl(''),
    dueDate: new FormControl(),
  });

  user!: Signal<User>;
  defaultCategory!: Signal<Category>;

  get color() {
    return this.todoForm.value.color;
  }

  get topic() {
    return this.todoForm.value.topic?.length;
  }

  ngOnInit(): void {
    this.user = this.store.selectSignal(selectUser);
  }

  addTodo() {
    if (!this.topic) return;

    const todo: Todo = {
      id: crypto.randomUUID(),
      topic: this.todoForm.value.topic!,
      completed: false,
      color: this.todoForm.value.color
        ? this.todoForm.value.color!
        : this.defaultCategory().color!,
      dueDate: this.todoForm.value.dueDate,
      tags: [],
      userId: this.user().id,
      categoryId: this.defaultCategory().id,
      trash: false,
      createdAt: new Date()
    };
    this.store.dispatch(TodosActions.addTodo({todo}));
    this.todoForm.reset();
  }

  updateColor(color: string) {
    this.todoForm.controls['color'].setValue(color);
  }
}
