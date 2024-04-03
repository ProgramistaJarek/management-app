import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ColorPickerComponent} from '../../shared/components/color-picker/color-picker.component';

@Component({
  selector: 'app-add-category-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ColorPickerComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './add-category-dialog.component.html',
})
export class AddCategoryDialogComponent {
  categoryForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    color: new FormControl(''),
  });

  get color() {
    return this.categoryForm.value.color;
  }

  get name() {
    return this.categoryForm.value.name;
  }

  updateColor(color: string) {
    this.categoryForm.controls['color'].setValue(color);
  }
}
