import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Tag } from '../../model';
import { selectTodosOutTrash } from '../todo/todo.selectors';
import { selectNotesOutTrash } from '../notes/notes.selectors';

export const selectTags = createFeatureSelector<Tag[]>('tags');

export const selectTagsByIds = (tagsId: string[]) =>
  createSelector(selectTags, (tags) =>
    tagsId
      .filter((tagId) => tags.some((tag) => tag.id === tagId))
      .map((tagId) => tags.find((tag) => (tag.id === tagId ? tag : null)))
      .filter((tag): tag is Tag => tag !== null),
  );

export const selectExcludedTagsByIds = (tagsId: string[]) =>
  createSelector(selectTags, (tags) =>
    tags.filter((tag) => !tagsId.includes(tag.id)),
  );

export const checkIfTagCanBeDeleted = (tagId: string) =>
  createSelector(
    selectTodosOutTrash(),
    selectNotesOutTrash(),
    (todos, notes) => {
      const todoResult = !!todos.find((todo) => todo.tags.includes(tagId));
      const noteResult = !!notes.find((note) => note.tags.includes(tagId));
      return todoResult || noteResult;
    },
  );

export const selectTagByName = (tagName: string) =>
  createSelector(selectTags, (tags) => {
    const lowerCaseName = tagName.toLowerCase();
    return tags.find((tag) => tag.name.toLowerCase() === lowerCaseName);
  });
