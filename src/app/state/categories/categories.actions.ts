import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Category } from '../../model';

export const CategoriesActions = createActionGroup({
  source: 'Categories',
  events: {
    'Add Category': props<{ category: Category }>(),
    'Add Category Success': props<{ category: Category }>(),
    'Edit Category': props<{ category: Category }>(),
    'Edit Category Success': props<{ category: Category }>(),
    'Delete Category': props<{ categoryId: string }>(),
  },
});
