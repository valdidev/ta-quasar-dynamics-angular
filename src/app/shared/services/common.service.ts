import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(msg: string = 'Something went wrong') {
    this.snackBar.open(msg, '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 3000,
    });
  }
}
