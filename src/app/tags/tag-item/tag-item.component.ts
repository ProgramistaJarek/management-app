import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tag } from '../../model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tag-item',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './tag-item.component.html',
})
export class TagItemComponent {
  @Input({ required: true }) tag!: Tag;
  @Input() disabledDelete = false;

  @Output() deleteTag = new EventEmitter<string>();

  onDeleteTag(tagId: string) {
    this.deleteTag.emit(tagId);
  }
}
