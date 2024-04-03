import {NgClass} from '@angular/common';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {colors, returnBackground, returnTextColor} from './color-picker';
import {CdkMenuModule} from "@angular/cdk/menu";

@Component({
  selector: 'app-color-picker',
  standalone: true,
  imports: [NgClass, MatButtonModule, MatIconModule, CdkMenuModule],
  templateUrl: './color-picker.component.html',
})
export class ColorPickerComponent {
  @Input({required: true}) chooseColor!: string;

  @Output() colorChanged = new EventEmitter<string>();

  colors = colors;
  returnTextColor = returnTextColor;
  returnBackground = returnBackground;

  onChooseColor(color: string) {
    this.colorChanged.emit(color);
  }
}
