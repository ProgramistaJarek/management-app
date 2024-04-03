import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ColorPickerComponent} from '../../shared/components/color-picker/color-picker.component';
import {Category} from '../../model';

@Component({
  selector: 'app-edit-category-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    ColorPickerComponent,
  ],
  templateUrl: './edit-category-dialog.component.html',
})
export class EditCategoryDialogComponent {
  categoryForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl(''),
    description: new FormControl(''),
    color: new FormControl(''),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: Category) {
    this.categoryForm.patchValue(data);
  }

  get color() {
    return this.categoryForm.value.color;
  }

  updateColor(color: string) {
    this.categoryForm.controls['color'].setValue(color);
  }
}
