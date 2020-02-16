import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // tslint:disable-next-line: variable-name
  private _isAuth = false;
  // tslint:disable-next-line: variable-name
  private _isAdmin = false;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private snackbar: MatSnackBar,
    private userService: UserService
  ) { }

  get isAuthenticated() {
    return this._isAuth;
  }

  get isAdmin() {
    return this._isAdmin;
  }

  registerUser(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate([ '/login' ]);

        this.afAuth.authState.subscribe((user) => {
          this.userService.setUser(user);
        });
      })
      .catch((error) => {
        this.snackbar.open(error.message, 'Undo', {
          duration: 3000
        });
      });
  }

  loginUser(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((userData) => {
        this._isAuth = true;
        localStorage.setItem('email', userData.user.email);

        this.userService.getCurrentUser()
        .pipe(map((user) => {
          if (user.role && user.role === 'admin') {
            this._isAdmin = true;
          }
        }))
        .subscribe(() => {});

        this.router.navigate([ '/' ]);
      })
      .catch((error) => {
        this.snackbar.open(error.message, 'Undo', {
          duration: 3000
        });
      });
  }

  logout() {
    this.afAuth.auth.signOut();

    this._isAuth = false;
    this._isAdmin = false;

    localStorage.clear();
    this.router.navigate([ '/' ]);
  }
}
