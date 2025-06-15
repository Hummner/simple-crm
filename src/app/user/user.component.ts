import { Component, inject, OnInit } from '@angular/core';
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
import { collection, doc, onSnapshot } from "firebase/firestore";
import { DocumentData } from "firebase/firestore";
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatTooltipModule, MatDialogModule, MatCardModule, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {


  firestore: Firestore;
  unsub: any;
  allUsers: DocumentData[] = [];
  


  constructor(public dialog: MatDialog) {
    this.firestore = inject(Firestore);
 

    this.unsub = onSnapshot(this.usersCollectionRef(), (users) => {
      this.allUsers = [];
      users.forEach(user => {
        console.log(user.id);
        let newUser = user.data();
        newUser["customIdName"] = user.id

        
        this.allUsers.push(newUser);
        
      })

      console.log("Current data: ", this.allUsers);

  
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


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUserComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {

      }
    });
  }

}
