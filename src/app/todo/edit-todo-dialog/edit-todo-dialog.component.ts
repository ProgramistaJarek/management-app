import {Component, Inject, inject, OnInit, Signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {ColorPickerComponent} from '../../shared/components/color-picker/color-picker.component';
import {Category, Tag, Todo} from '../../model';
import {selectCategories} from '../../state/categories/categories.selectors';
import {selectTodosById,} from '../../state/todo/todo.selectors';
import {AutocompleteTagsComponent} from "../../shared/components/autocomplete-tags/autocomplete-tags.component";

@Component({
  selector: 'app-edit-todo-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    ColorPickerComponent,
    MatSelectModule,
    AutocompleteTagsComponent,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './edit-todo-dialog.component.html',
})
export class EditTodoDialogComponent implements OnInit {
  private store = inject(Store);

  todoForm = new FormGroup({
    topic: new FormControl(''),
    completed: new FormControl(false),
    dueDate: new FormControl(),
    color: new FormControl(''),
    categoryId: new FormControl(''),
    tags: new FormControl<string[]>([])
  });

  todo!: Signal<Todo>;
  categories!: Signal<Category[]>;

  tags!: Observable<Tag[]>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {
  }

  ngOnInit(): void {
    this.prepareData();
    this.todoForm.patchValue(structuredClone(this.todo()));
  }

  get color() {
    return this.todoForm.value.color;
  }

  get completed() {
    return this.todoForm.value.completed;
  }

  onEditTodo() {
    return {
      ...this.todo(),
      ...this.todoForm.getRawValue(),
    } as Todo;
  }

  updateColor(color: string) {
    this.todoForm.controls['color'].setValue(color);
    this.todoForm.controls['color'].markAsDirty();
  }

  updateStatus(status: boolean) {
    this.todoForm.controls['completed'].setValue(status);
    this.todoForm.controls['completed'].markAsDirty();
  }

  private prepareData() {
    this.categories = this.store.selectSignal(selectCategories);
    this.todo = this.store.selectSignal(selectTodosById(this.data));
  }
}
