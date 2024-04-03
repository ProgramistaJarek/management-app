import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Note} from '../../model';

export const selectNotes = createFeatureSelector<Note[]>('notes');

export const selectNotesOutTrash = () =>
  createSelector(
    selectNotes,
    (notes) => notes.filter((note) => !note.trash)
  );


export const selectNoteById = (noteId: string) =>
  createSelector(
    selectNotes,
    (notes) => notes.find((note) => note.id === noteId && !note.trash)!
  );

export const selectNotesInTrash = () =>
  createSelector(
    selectNotes,
    (notes) => notes.filter((note) => note.trash)
  );
