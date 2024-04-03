import {AsyncPipe} from '@angular/common';
import {Component, inject, OnInit, Signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {Store} from '@ngrx/store';
import {Category, Note, User} from '../../model';
import {AutocompleteTagsComponent} from '../../shared/components/autocomplete-tags/autocomplete-tags.component';
import {selectedCategories} from '../../state/categories/categories.selectors';
import {selectUser} from '../../state/user/user.selectors';
import {ColorPickerComponent} from "../../shared/components/color-picker/color-picker.component";

@Component({
  selector: 'app-add-note-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    AsyncPipe,
    AutocompleteTagsComponent,
    ColorPickerComponent
  ],
  templateUrl: './add-note-dialog.component.html',
})
export class AddNoteDialogComponent implements OnInit {
  private store = inject(Store);

  form = new FormGroup({
    topic: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    color: new FormControl(''),
    tags: new FormControl<string[]>([]),
  });

  user!: Signal<User>;

  get color() {
    return this.form.value.color;
  }

  ngOnInit(): void {
    this.user = this.store.selectSignal(selectUser);
  }

  updateColor(color: string) {
    this.form.controls['color'].setValue(color);
    this.form.controls['color'].markAsDirty();
  }

  onAddNote(): Note {
    return {
      id: crypto.randomUUID(),
      topic: this.form.value.topic!,
      description: this.form.value.description!,
      color: this.form.value.color!,
      userId: this.user().id,
      trash: false,
      createdAt: new Date(),
      tags: this.form.value.tags!,
    };
  }
}
