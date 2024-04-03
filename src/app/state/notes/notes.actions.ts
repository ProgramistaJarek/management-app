import { createActionGroup, props } from '@ngrx/store';
import { Note } from '../../model';

export const NotesActions = createActionGroup({
  source: 'Notes',
  events: {
    'Add Note': props<{ newNote: Note }>(),
    'Add Note Success': props<{ newNote: Note }>(),
    'Edit Note': props<{ editNote: Note }>(),
    'Edit Note Success': props<{ editNote: Note }>(),
    'Move Note To Trash': props<{ noteId: string }>(),
    'Restore Note': props<{ noteId: string }>(),
    'Delete Note': props<{ noteId: string }>(),
  },
});
