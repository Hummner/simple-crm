import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatCardModule } from '@angular/material/card';
import { Firestore } from '@angular/fire/firestore';
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { DocumentData } from "firebase/firestore";
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';





@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatTooltipModule, MatDialogModule, MatCardModule, RouterLink, MatInputModule, FormsModule, MatIconModule, MatButtonModule, MatSlideToggleModule, MatButtonToggleModule, MatSelectModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit, OnDestroy {


  firestore: Firestore;
  unsub: any;
  allUsers: DocumentData[] = [];
  filterValue: string = '';

  sortField: string = 'firstname';
  sortDirection: 'asc' | 'desc' = 'asc';
  hideSingleSelectionIndicator = signal(false);



  constructor(public dialog: MatDialog) {
    this.firestore = inject(Firestore);



    this.unsub = onSnapshot(this.usersCollectionRef(), (users) => {
      this.allUsers = [];
      users.forEach(user => {
        let newUser = user.data();
        if (newUser['customIdName'] === undefined) {
          newUser["customIdName"] = user.id;
          updateDoc(this.userRef(user.id), {
            customIdName: user.id
          })

        }



        this.allUsers.push(newUser);

      })


    });



  }

  ngOnDestroy() {
    if (this.unsub) {
      this.unsub();
      console.log("destroyed") // Listener entfernen
    }
  }



  ngOnInit(): void {



  }

  usersCollectionRef() {
    return (collection(this.firestore, "users"))
  }

  userRef(id: string) {
    return doc(this.firestore, 'users', id)
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUserComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {

      }
    });
  }

  toggleSingleSelectionIndicator() {
    this.hideSingleSelectionIndicator.update(value => !value);
  }



  toggleSortDirection() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  }


  get setFilter() {


    let filter = this.filterValue.toLowerCase();
    let filtered = this.allUsers.filter(user =>
      user['firstname']?.toLowerCase().includes(filter) ||
      user['lastname']?.toLowerCase().includes(filter) ||
      user['email']?.toLowerCase().includes(filter)
    );

    return filtered.sort((a, b) => {
      const aVal = a[this.sortField]?.toLowerCase?.() || '';
      const bVal = b[this.sortField]?.toLowerCase?.() || '';

      if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    })

  }
}
