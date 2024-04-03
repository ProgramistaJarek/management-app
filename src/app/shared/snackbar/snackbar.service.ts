import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackBar = inject(MatSnackBar);

  private DURATION_SNACKBAR = 3500;

  success(msg: string) {
    this.openSnackBar(msg, ['success-snackbar']);
  }

  error(msg: string) {
    this.openSnackBar(msg, ['error-snackbar']);
  }

  info(msg: string) {
    this.openSnackBar(msg, ['info-snackbar']);
  }

  private openSnackBar(msg: string, className?: string[]) {
    this.snackBar.open(msg, 'Close', {
      duration: this.DURATION_SNACKBAR,
      panelClass: className,
      horizontalPosition: 'end',
    });
  }
}
