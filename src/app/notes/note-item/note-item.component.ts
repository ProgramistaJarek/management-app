import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { Note } from '../../model';
import { DatePipe, NgClass } from '@angular/common';
import { CustomSlicePipe } from '../../shared/pieps/custom-slice.pipe';
import { returnBackground } from '../../shared/components/color-picker/color-picker';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-note-item',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatRippleModule,
    DatePipe,
    CustomSlicePipe,
    NgClass,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './note-item.component.html',
})
export class NoteItemComponent {
  @Input({ required: true }) note!: Note;
  @Input() inTrash = false;

  @Output() editNote = new EventEmitter<string>();
  @Output() deleteNote = new EventEmitter<string>();
  @Output() restoreNote = new EventEmitter<string>();

  returnBackground = returnBackground;

  onEditNote(noteId: string) {
    this.editNote.emit(noteId);
  }

  onDeleteNote(noteId: string) {
    this.deleteNote.emit(noteId);
  }

  onRestoreNote(noteId: string) {
    this.restoreNote.emit(noteId);
  }
}
