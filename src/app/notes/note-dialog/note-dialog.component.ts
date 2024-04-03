import {Component, Inject, inject, OnInit, Signal} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {Store} from "@ngrx/store";
import {Note} from "../../model";
import {selectNoteById} from "../../state/notes/notes.selectors";
import {AutocompleteTagsComponent} from "../../shared/components/autocomplete-tags/autocomplete-tags.component";
import {MatIconModule} from "@angular/material/icon";
import {ColorPickerComponent} from "../../shared/components/color-picker/color-picker.component";
import {NotesActions} from "../../state/notes/notes.actions";

@Component({
  selector: 'app-note-dialog',
  standalone: true,
  imports: [MatDialogModule, MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule, AutocompleteTagsComponent, MatIconModule, ColorPickerComponent, AutocompleteTagsComponent],
  templateUrl: './note-dialog.component.html'
})
export class NoteDialogComponent implements OnInit {
  private store = inject(Store);

  form = new FormGroup({
    topic: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    color: new FormControl(''),
    categoryId: new FormControl(''),
    tags: new FormControl<string[]>([]),
  });

  note!: Signal<Note>;
  editMode = true;

  constructor(@Inject(MAT_DIALOG_DATA) public noteId: string) {
  }

  get color() {
    return this.form.value.color;
  }

  ngOnInit() {
    this.prepareData();
  }

  onEdit() {
    !this.editMode && this.onSave();
    this.editMode = !this.editMode;
    this.editMode ? this.form.disable() : this.form.enable();
  }

  onSave() {
    if (!this.form.dirty) return;
    const editNote = {...this.note(), ...this.form.getRawValue(), updatedAt: new Date()} as Note;
    this.store.dispatch(NotesActions.editNote({editNote}));
    this.form.reset();
    this.prepareData();
  }

  updateColor(color: string) {
    this.form.controls['color'].setValue(color);
    this.form.controls['color'].markAsDirty();
  }

  private prepareData() {
    this.note = this.store.selectSignal(selectNoteById(this.noteId));
    this.form.patchValue(structuredClone(this.note()));
    this.form.disable();
  }
}
