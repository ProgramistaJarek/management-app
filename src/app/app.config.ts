import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ActionReducer, MetaReducer, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { reducers } from './state/state.reducer';
import { provideEffects } from '@ngrx/effects';
import * as tagsEffects from './state/tags/tags.effects';
import * as todoEffects from './state/todo/todo.effects';
import * as notesEffects from './state/notes/notes.effects';
import * as categoriesEffects from './state/categories/categories.effects';

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    const nextState = reducer(state, action);

    // localStorage.setItem('state', JSON.stringify(nextState));
    return nextState;
  };
}

export const metaReducers: MetaReducer<any>[] = [debug];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(reducers, { metaReducers }),
    provideAnimationsAsync(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(tagsEffects, todoEffects, notesEffects, categoriesEffects),
  ],
};
