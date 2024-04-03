import { NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Signal,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatChipSelectionChange,
  MatChipsModule,
} from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { returnBackground } from '../../shared/components/color-picker/color-picker';
import { Category } from '../../model';
import { CategoriesActions } from '../../state/categories/categories.actions';
import {
  selectCategories,
  selectedCategories,
} from '../../state/categories/categories.selectors';
import { selectTodosByCategoryId } from '../../state/todo/todo.selectors';
import { AddCategoryDialogComponent } from '../add-category-dialog/add-category-dialog.component';
import { EditCategoryDialogComponent } from '../edit-category-dialog/edit-category-dialog.component';

@Component({
  selector: 'app-categories-list-chip',
  standalone: true,
  imports: [MatChipsModule, MatButtonModule, MatIconModule, NgClass],
  templateUrl: './categories-list-chip.component.html',
})
export class CategoriesListChipComponent implements OnInit {
  private store = inject(Store);
  private dialog = inject(MatDialog);

  @Output() selectCategory = new EventEmitter<string>();

  categories!: Signal<Category[]>;

  returnBackground = returnBackground;

  ngOnInit(): void {
    this.categories = this.store.selectSignal(selectCategories);
  }

  onCategorySelect(categoryId: string, chip: MatChipSelectionChange) {
    if (chip.selected) {
      this.selectCategory.emit(categoryId);
    } else {
      this.selectCategory.emit('');
    }
  }

  onDeleteCategory(categoryId: string, mouseEvent: MouseEvent) {
    mouseEvent.stopPropagation();
    const todos = this.store.selectSignal(selectTodosByCategoryId(categoryId));
    const categoriesLength =
      this.store.selectSignal(selectedCategories)().length;
    if (todos().length || categoriesLength <= 1) return;

    this.store.dispatch(CategoriesActions.deleteCategory({ categoryId }));
  }

  onEditCategory(category: Category, mouseEvent: MouseEvent) {
    mouseEvent.stopPropagation();

    this.dialog
      .open(EditCategoryDialogComponent, {
        data: category,
      })
      .afterClosed()
      .subscribe((res: Category) => {
        if (!res.name) return;

        this.store.dispatch(CategoriesActions.editCategory({ category: res }));
      });
  }

  addNewCategory() {
    this.dialog
      .open(AddCategoryDialogComponent)
      .afterClosed()
      .subscribe((res: Category) => {
        if (!res.name) return;

        this.store.dispatch(CategoriesActions.addCategory({ category: res }));
      });
  }
}
