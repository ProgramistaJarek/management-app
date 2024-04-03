import { Component, inject, OnInit, Signal } from '@angular/core';
import { NoteListComponent } from './note-list/note-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { AddNoteDialogComponent } from './add-note-dialog/add-note-dialog.component';
import { Note } from '../model';
import { NotesActions } from '../state/notes/notes.actions';
import { selectNotesOutTrash } from '../state/notes/notes.selectors';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [NoteListComponent, MatButtonModule, MatIconModule],
  templateUrl: './notes.component.html',
})
export class NotesComponent implements OnInit {
  private store = inject(Store);
  private dialog = inject(MatDialog);

  selectedNotes!: Signal<Note[]>;

  ngOnInit(): void {
    this.selectedNotes = this.store.selectSignal(selectNotesOutTrash());
  }

  onAddNote() {
    this.dialog
      .open(AddNoteDialogComponent)
      .afterClosed()
      .subscribe((res: Note) => {
        if (!res) return;

        this.store.dispatch(NotesActions.addNote({ newNote: res }));
      });
  }
}
