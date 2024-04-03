import { Component, inject, OnInit, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectTodosAndNotesBySearch } from '../state/state.selectors';
import { FilteredItems } from '../model';
import { NoteListComponent } from '../notes/note-list/note-list.component';
import { TodoListComponent } from '../todo/todo-list/todo-list.component';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NoteListComponent, TodoListComponent, MatTabsModule],
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(Store);

  searchResults!: Signal<FilteredItems>;

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const value = params.get('value')!;

      this.searchResults = this.store.selectSignal(
        selectTodosAndNotesBySearch(value),
      );
    });
  }
}
