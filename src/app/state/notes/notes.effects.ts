import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { catchError, map, repeat, tap } from 'rxjs';
import { NotesActions } from './notes.actions';
import { Note } from '../../model';
import { SnackbarService } from '../../shared/snackbar/snackbar.service';

export const handleAddNote = createEffect(
  (actions$ = inject(Actions), snackbarService = inject(SnackbarService)) => {
    return actions$.pipe(
      ofType(NotesActions.addNote),
      map((value) => {
        if (value.newNote.topic.length < 30)
          return NotesActions.addNoteSuccess({ newNote: value.newNote });
        else throw new Error('Max length of topic must be less or equal 30!');
      }),
      catchError((error, caught) => {
        console.error(error.message);
        snackbarService.error(error.message);
        return caught;
      }),
    );
  },
  { functional: true },
);

export const handleEditNote = createEffect(
  (actions$ = inject(Actions), snackbarService = inject(SnackbarService)) => {
    return actions$.pipe(
      ofType(NotesActions.editNote),
      map((value) => {
        const editNote: Note = {
          ...value.editNote,
          updatedAt: new Date(),
        };

        if (editNote.topic.length >= 1 && editNote.topic.length < 30)
          return NotesActions.editNoteSuccess({ editNote });
        else if (editNote.topic.length > 30)
          throw new Error('Max length of topic must be less or equal 30!');
        else throw new Error('Note need to have title!');
      }),
      catchError((error, caught) => {
        console.error(error.message);
        snackbarService.error(error.message);
        return caught;
      }),
    );
  },
  { functional: true },
);

export const handleDeleteNote = createEffect(
  (actions$ = inject(Actions), snackbarService = inject(SnackbarService)) => {
    return actions$.pipe(
      ofType(NotesActions.deleteNote),
      tap(() => snackbarService.error('Note deleted!')),
      repeat(),
    );
  },
  { functional: true, dispatch: false },
);

export const handleMoveNoteToTrash = createEffect(
  (actions$ = inject(Actions), snackbarService = inject(SnackbarService)) => {
    return actions$.pipe(
      ofType(NotesActions.moveNoteToTrash),
      tap(() => snackbarService.info('Note moved to trash!')),
    );
  },
  { functional: true, dispatch: false },
);

export const handleRestoreNote = createEffect(
  (actions$ = inject(Actions), snackbarService = inject(SnackbarService)) => {
    return actions$.pipe(
      ofType(NotesActions.restoreNote),
      tap(() => snackbarService.info('Note restored!')),
    );
  },
  { functional: true, dispatch: false },
);
