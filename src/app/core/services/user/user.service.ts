import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) { }

  setUser(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      email: user.email
    });
  }

  getUserByUid(uid: string) {
    return this.db.object('/users/' + uid)
      .snapshotChanges()
      .pipe(map((user) => {
        return user.payload.val() as any;
      }));
  }

  getCurrentUser() {
    return this.afAuth.authState.pipe(switchMap((user) => {
      if (user) {
        return this.getUserByUid(user.uid);
      } else {
        return new Observable();
      }
    }), map((user) => {
      return user;
    }));
  }
}
