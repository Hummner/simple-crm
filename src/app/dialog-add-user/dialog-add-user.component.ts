import { Component, inject, NgModule } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ChangeDetectionStrategy } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../models/user.class';
import { FormsModule } from '@angular/forms';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatDialogActions, MatDialogContent, MatIconModule, MatButtonModule, MatDialogTitle, MatInputModule, MatDatepickerModule, MatFormFieldModule, FormsModule, MatProgressBarModule, CommonModule],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  user: User = new User();
  birthDate!: Date;
  firestore!: Firestore;
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {
    this.firestore = inject(Firestore);
    console.log(this.firestore);


  }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    this.loading = true

    addDoc(collection(this.firestore, "users"), this.user.toJson()).then(() => {
      this.loading = false;
      console.log("Current user added: ", this.user);
      
      this.dialogRef.close();
      
    })

  }

}
