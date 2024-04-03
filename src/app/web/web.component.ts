import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  ActivatedRoute,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, tap } from 'rxjs';
import { TagsComponent } from '../tags/tags.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-web',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './web.component.html',
})
export class WebComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);

  searchControl = new FormControl('');

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        tap((value) =>
          this.router.navigate(['search'], {
            relativeTo: this.route,
            queryParams: { value },
          }),
        ),
      )
      .subscribe();
  }

  onOpenTagsDialog() {
    this.dialog.open(TagsComponent, {
      panelClass: ['w-full', 'lg:w-1/4'],
    });
  }
}
