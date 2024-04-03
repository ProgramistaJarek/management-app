import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Category } from '../../model';

export const selectCategories = createFeatureSelector<Category[]>('categories');

export const selectDefaultCategory = (categoryId?: string) =>
  createSelector(selectCategories, (categories: Category[]) => {
    const defaultCategory = categoryId
      ? categories.find((category) => category.id === categoryId)
      : categories[0];

    return defaultCategory || ({} as Category);
  });

export const selectedCategories = createSelector(
  selectCategories,
  (categories: Category[]) => categories,
);

export const selectCategoryByName = (categoryName: string) =>
  createSelector(selectCategories, (categories: Category[]) => {
    const lowerCaseName = categoryName.toLowerCase();
    return categories.find(
      (category) => category.name.toLowerCase() === lowerCaseName,
    );
  });
