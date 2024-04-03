import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { TagsActions } from './tags.actions';
import { catchError, map, repeat, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { checkIfTagCanBeDeleted, selectTagByName } from './tags.selectors';
import { SnackbarService } from '../../shared/snackbar/snackbar.service';
import { NotesActions } from '../notes/notes.actions';

export const handleDeleteTag = createEffect(
  (
    actions$ = inject(Actions),
    store = inject(Store),
    snackbarService = inject(SnackbarService),
  ) => {
    return actions$.pipe(
      ofType(TagsActions.deleteTag),
      concatLatestFrom((action) =>
        store.select(checkIfTagCanBeDeleted(action.tagId)),
      ),
      map(([action, result]) => {
        if (result) throw new Error(`Cannot delete tag`);
        else {
          snackbarService.error('Tag deleted!');
          return TagsActions.deleteTagSuccess({ tagId: action.tagId });
        }
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

export const handleAddCategory = createEffect(
  (
    actions$ = inject(Actions),
    store = inject(Store),
    snackbarService = inject(SnackbarService),
  ) => {
    return actions$.pipe(
      ofType(TagsActions.addTag),
      concatLatestFrom((action) =>
        store.select(selectTagByName(action.newTag.name)),
      ),
      map(([value, result]) => {
        if (!result) {
          snackbarService.success('Tag added!');
          return TagsActions.addTagSuccess({
            newTag: value.newTag,
          });
        } else throw new Error('The tag exist!');
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
