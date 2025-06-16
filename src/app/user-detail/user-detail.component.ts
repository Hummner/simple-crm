import { Component, OnDestroy, OnInit } from '@angular/core';
import { doc, Firestore, onSnapshot } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.class';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';


@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatIcon, MatButtonModule, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit, OnDestroy {
  userId!: any;
  unsub: any;
  user: User = new User;

  constructor(private route: ActivatedRoute, private firestore: Firestore, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
      this.getUser();


    })
  }


  getUser() {
    this.unsub = onSnapshot(this.getUserRef('users', this.userId), (user) => {
      this.user = new User(user.data())
      console.log('get user: ', this.user);

    })
  }

  getUserRef(collection: string, id: string) {
    return doc(this.firestore, collection, id)
  }

  ngOnDestroy(): void {
    if (this.unsub) {
      this.unsub();
      console.log(this.unsub, ' desrtoyed');

    }
  }


  openAddressDialog() {

  }


  editNameMenu() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user);
  }


  editAddressMenu() {
    const dialog =  this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user);

  }





}
