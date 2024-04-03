import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { catchError, EMPTY, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { CategoriesActions } from './categories.actions';
import { selectCategoryByName } from './categories.selectors';
import { SnackbarService } from '../../shared/snackbar/snackbar.service';

export const handleAddCategory = createEffect(
  (
    actions$ = inject(Actions),
    store = inject(Store),
    snackbarService = inject(SnackbarService),
  ) => {
    return actions$.pipe(
      ofType(CategoriesActions.addCategory),
      concatLatestFrom((action) =>
        store.select(selectCategoryByName(action.category.name)),
      ),
      map(([value, result]) => {
        if (value.category.name.length >= 15) {
          snackbarService.info('The category is too long!');
          throw new Error();
        }

        if (!result) {
          snackbarService.success('Category added!');
          return CategoriesActions.addCategorySuccess({
            category: value.category,
          });
        } else throw new Error('The category exist!');
      }),
      catchError((error, caught) => {
        if (error.message) {
          console.error(error.message);
          snackbarService.error(error.message);
        }
        return caught;
      }),
    );
  },
  { functional: true },
);

export const handleEditCategory = createEffect(
  (
    actions$ = inject(Actions),
    store = inject(Store),
    snackbarService = inject(SnackbarService),
  ) => {
    return actions$.pipe(
      ofType(CategoriesActions.editCategory),
      concatLatestFrom((action) =>
        store.select(selectCategoryByName(action.category.name)),
      ),
      map(([value, result]) => {
        if (value.category.name.length >= 15) {
          snackbarService.info('The category is too long!');
          throw new Error();
        }

        if (result?.id === value.category.id) {
          snackbarService.success('Category edited!');
          return CategoriesActions.editCategorySuccess({
            category: value.category,
          });
        }

        if (!result)
          return CategoriesActions.editCategorySuccess({
            category: value.category,
          });
        else throw new Error('The category exist!');
      }),
      catchError((error, caught) => {
        if (error.message) {
          console.error(error.message);
          snackbarService.error(error.message);
        }
        return caught;
      }),
    );
  },
  { functional: true },
);
