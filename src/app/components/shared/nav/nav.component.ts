import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from 'src/app/core/services/authentication/auth.service';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart/shopping-cart.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {

  numberOfAddedCourses = 0;
  shoppingCartCoursesSub: Subscription;

  get isAuth() {
    return this.authService.isAuthenticated;
  }

  get isAdmin() {
    return this.authService.isAdmin;
  }

  constructor(
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService,
    private router: Router,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.shoppingCartCoursesSub = this.shoppingCartService.getCourses()
      .subscribe((courses) => {
        this.numberOfAddedCourses = courses.length;
      });
  }

  ngOnDestroy() {
    this.shoppingCartCoursesSub.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }

  goToShoppingCart() {
    if (this.numberOfAddedCourses === 0) {
      this.snackbar.open('Shopping Cart is empty!', 'Close',  {
        duration: 3000
      });
    } else {
      this.router.navigate([ '/cart' ]);
    }
  }
}
