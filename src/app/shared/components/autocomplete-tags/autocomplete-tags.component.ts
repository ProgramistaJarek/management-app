import {AfterContentInit, Component, ElementRef, forwardRef, inject, Input, Signal, ViewChild,} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR,} from '@angular/forms';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {Tag} from '../../../model';
import {AsyncPipe} from '@angular/common';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectExcludedTagsByIds, selectTags, selectTagsByIds,} from '../../../state/tags/tags.selectors';
import {TagsActions} from "../../../state/tags/tags.actions";

@Component({
  selector: 'app-autocomplete-tags',
  standalone: true,
  imports: [
    MatAutocompleteModule,
    MatIconModule,
    MatFormFieldModule,
    MatChipsModule,
    FormsModule,
    AsyncPipe,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteTagsComponent),
      multi: true,
    },
  ],
  templateUrl: './autocomplete-tags.component.html',
})
export class AutocompleteTagsComponent implements ControlValueAccessor, AfterContentInit {
  private store = inject(Store);

  @ViewChild('tagInput', {static: true}) tagInput!: ElementRef<HTMLInputElement>;

  @Input() canAddTag = true;

  disabled!: boolean;

  tagCtrl!: string;
  selectedTagsId!: string[];

  tags$!: Observable<Tag[]>;

  allTags!: Signal<Tag[]>;
  selectedTags!: Signal<Tag[]>;

  constructor() {
  }

  ngAfterContentInit(): void {
    this.prepareData();
  }

  onChange: any = (value: any) => {
  };
  onTouch: any = () => {
  };

  writeValue(obj: any): void {
    if (obj !== undefined) {
      this.tagCtrl = '';
      this.selectedTagsId = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  add(event: any) {
    if (!event.value) return;

    const newTag: Tag = {
      id: crypto.randomUUID(),
      name: event.value,
    };
    this.store.dispatch(TagsActions.addTag({newTag}));

    this.selectedTagsId.push(newTag.id);
    event.chipInput.clear();
    this.tagCtrl = '';
    this.prepareData();
  }

  selected(event: MatAutocompleteSelectedEvent) {
    this.selectedTagsId.push(event.option.id)
    this.tagInput.nativeElement.value = '';
    this.tagCtrl = '';
    this.updateRegister();
    this.prepareData();
  }

  remove(tagId: string) {
    const index = this.selectedTagsId.indexOf(tagId);

    if (index >= 0) {
      this.selectedTagsId.splice(index, 1);
      this.updateRegister();
      this.prepareData();
    }
  }

  filterTags() {
    this.tags$ = this.tagCtrl ? of(this._filter(this.tagCtrl)) : of(this.allTags().slice());
  }

  private _filter(value: string): Tag[] {
    const filterValue = value.toLowerCase();

    return this.allTags().filter((tag) =>
      tag.name.toLowerCase().includes(filterValue)
    );
  }

  private prepareData() {
    this.allTags = this.selectedTagsId.length
      ? this.store.selectSignal(selectExcludedTagsByIds(this.selectedTagsId))
      : this.store.selectSignal(selectTags);
    this.selectedTags = this.store.selectSignal(selectTagsByIds(this.selectedTagsId));
    this.filterTags();
  }

  private updateRegister() {
    this.onChange(this.selectedTagsId);
    this.onTouch();
  }
}
