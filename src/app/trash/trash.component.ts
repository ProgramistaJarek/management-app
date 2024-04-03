import { Component, inject, OnInit, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Note, Todo } from '../model';
import { selectNotesInTrash } from '../state/notes/notes.selectors';
import { NoteItemComponent } from '../notes/note-item/note-item.component';
import { NotesActions } from '../state/notes/notes.actions';
import { selectTrashTodos } from '../state/todo/todo.selectors';
import { TodoItemComponent } from '../todo/todo-item/todo-item.component';
import { MatTabsModule } from '@angular/material/tabs';
import { TodosActions } from '../state/todo/todo.actions';

@Component({
  selector: 'app-trash',
  standalone: true,
  imports: [NoteItemComponent, TodoItemComponent, MatTabsModule],
  templateUrl: './trash.component.html',
})
export class TrashComponent implements OnInit {
  private store = inject(Store);

  trashTodos!: Signal<Todo[]>;
  trashNotes!: Signal<Note[]>;

  ngOnInit(): void {
    this.trashNotes = this.store.selectSignal(selectNotesInTrash());
    this.trashTodos = this.store.selectSignal(selectTrashTodos());
  }

  onDeleteNote(noteId: string) {
    this.store.dispatch(NotesActions.deleteNote({ noteId }));
  }

  onRestoreNote(noteId: string) {
    this.store.dispatch(NotesActions.restoreNote({ noteId }));
  }

  onDeleteTodo(todoId: string) {
    this.store.dispatch(TodosActions.deleteTodo({ todoId }));
  }

  onRestoreTodo(todoId: string) {
    this.store.dispatch(TodosActions.restoreTodo({ todoId }));
  }
}
