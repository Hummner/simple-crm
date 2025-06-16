import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from '../models/user.class';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { addDoc, collection } from '@angular/fire/firestore';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule,
      FormsModule,
      MatProgressBarModule,
      CommonModule,
      MatInputModule,
      MatButtonModule,
      MatDialogActions,
      MatDialogTitle,
      MatDialogContent,
    MatDatepickerModule],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent {

    constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>) {

  }

  user!: User;
  loading = false;
  birthDate!: Date;


  saveUser() {


  }

}
