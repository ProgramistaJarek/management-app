import { createReducer, on } from '@ngrx/store';
import { Note } from '../../model';
import { NotesActions } from './notes.actions';

const initialState: Note[] = [
  {
    id: crypto.randomUUID(),
    topic: 'Todo App Angular',
    tags: ['47cc1822-1e52-4576-b001-9f1f3eef0d81'],
    userId: '3dec2ed5-2b7f-4134-97ed-49678ff1e366',
    description: 'description',
    createdAt: new Date(),
    trash: false,
    color: '',
  },
  {
    id: crypto.randomUUID(),
    topic: 'Todo App Angular v2',
    tags: [],
    userId: '3dec2ed5-2b7f-4134-97ed-49678ff1e366',
    description:
      'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi sit amet laoreet lorem.',
    createdAt: new Date(),
    trash: false,
    color: '',
  },
  {
    id: crypto.randomUUID(),
    topic: 'Todo App Angular v343',
    tags: ['47cc1822-1e52-4576-b001-9f1f3eef0d81'],
    userId: '3dec2ed5-2b7f-4134-97ed-49678ff1e366',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui ligula, dignissim at cursus porttitor, rutrum ac tellus. Donec in congue nisi, in placerat est. Vivamus quis ipsum risus.',
    createdAt: new Date(),
    trash: false,
    color: '',
  },
  {
    id: crypto.randomUUID(),
    topic: 'Todo App Angular v2',
    tags: [],
    userId: '3dec2ed5-2b7f-4134-97ed-49678ff1e366',
    description:
      'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi sit amet laoreet lorem.',
    createdAt: new Date(),
    trash: true,
    color: '',
  },
  {
    id: crypto.randomUUID(),
    topic: 'Todo App Angular v343',
    tags: ['47cc1822-1e52-4576-b001-9f1f3eef0d81'],
    userId: '3dec2ed5-2b7f-4134-97ed-49678ff1e366',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui ligula, dignissim at cursus porttitor, rutrum ac tellus. Donec in congue nisi, in placerat est. Vivamus quis ipsum risus.',
    createdAt: new Date(),
    trash: true,
    color: '',
  },
];

export const notesReducer = createReducer(
  initialState,
  on(NotesActions.addNoteSuccess, (_state, { newNote }) => [..._state, newNote]),
  on(NotesActions.editNoteSuccess, (_state, { editNote }) =>
    _state.map((note) => (note.id === editNote.id ? editNote : note)),
  ),
  on(NotesActions.moveNoteToTrash, (_state, { noteId }) =>
    _state.map((note) =>
      note.id === noteId
        ? {
            ...note,
            trash: true,
          }
        : note,
    ),
  ),
  on(NotesActions.restoreNote, (_state, { noteId }) =>
    _state.map((note) =>
      note.id === noteId
        ? {
            ...note,
            trash: false,
          }
        : note,
    ),
  ),
  on(NotesActions.deleteNote, (_state, { noteId }) =>
    _state.filter((note) => note.id !== noteId),
  ),
);
