import { Component, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Note } from '../../model';
import { NoteItemComponent } from '../note-item/note-item.component';
import { MatDialog } from '@angular/material/dialog';
import { NoteDialogComponent } from '../note-dialog/note-dialog.component';
import { NotesActions } from '../../state/notes/notes.actions';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [NoteItemComponent],
  templateUrl: './note-list.component.html',
})
export class NoteListComponent {
  private store = inject(Store);
  private dialog = inject(MatDialog);

  @Input({ required: true }) selectedNotes!: Note[];

  onEditNote(noteId: string) {
    this.dialog
      .open(NoteDialogComponent, {
        data: noteId,
      })
      .afterClosed()
      .subscribe((noteId) => {
        if (!noteId) return;

        this.store.dispatch(NotesActions.moveNoteToTrash({ noteId }));
      });
  }
}
