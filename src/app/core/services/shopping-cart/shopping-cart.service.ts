import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { AuthService } from '../authentication/auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
    private router: Router) { }

  async add(course) {
    if (!this.authService.isAuthenticated) {
      this.router.navigate([ '/login' ]);
    }

    let cartId = localStorage.getItem('cartId');

    if (!cartId) {
      const cart = await this.db.list('/shopping-cart/').push({
        createdOn: new Date().getTime()
      });

      cartId = cart.key;
      localStorage.setItem('cartId', cartId);
    }

    this.checkForAndAddCourse(cartId, course);
  }

  checkForAndAddCourse(cartId, course) {
    this.db.object('/shopping-cart/' + cartId + '/courses/' + course.key)
      .snapshotChanges()
      .pipe(
        take(1)
      ).subscribe((cart) => {
        if (!cart.key) {
          this.db.list('/shopping-cart/' + cartId + '/courses/').set(course.key, {course});
        }
      });
  }
}
