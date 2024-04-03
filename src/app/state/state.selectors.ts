import { createSelector } from '@ngrx/store';
import { selectTodos } from './todo/todo.selectors';
import { selectNotes } from './notes/notes.selectors';
import { FilteredItems } from '../model';
import { selectTags } from './tags/tags.selectors';

export const selectTodosAndNotesBySearch = (searchValue: string) =>
  createSelector(selectTodos, selectNotes, selectTags, (todos, notes, tags) => {
    if (!searchValue) return { notes: [], todos: [] } as FilteredItems;

    const filteredTags = tags.filter((tag) =>
      tag.name.toLowerCase().includes(searchValue.toLowerCase()),
    );

    return {
      todos: todos.filter(
        (todo) =>
          !todo.trash &&
          todo.tags.some((tag) =>
            filteredTags.some((filteredTag) => filteredTag.id === tag),
          ),
      ),
      notes: notes.filter(
        (note) =>
          !note.trash &&
          note.tags.some((tag) =>
            filteredTags.some((filteredTag) => filteredTag.id === tag),
          ),
      ),
    } as FilteredItems;
  });
