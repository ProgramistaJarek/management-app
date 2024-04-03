import { Component, inject, OnInit, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Tag } from '../model';
import {
  checkIfTagCanBeDeleted,
  selectTags,
} from '../state/tags/tags.selectors';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { TagItemComponent } from './tag-item/tag-item.component';
import { TagsActions } from '../state/tags/tags.actions';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatListModule, TagItemComponent],
  templateUrl: './tags.component.html',
})
export class TagsComponent implements OnInit {
  private store = inject(Store);

  tagList!: Signal<Tag[]>;

  ngOnInit() {
    this.tagList = this.store.selectSignal(selectTags);
  }

  onDeleteTag(tagId: string) {
    this.store.dispatch(TagsActions.deleteTag({ tagId }));
  }

  checkIfTagCanBeDeleted(tagId: string) {
    return this.store.selectSignal(checkIfTagCanBeDeleted(tagId));
  }
}
