import { Component, OnInit, OnDestroy } from '@angular/core';

import {  Subscription } from 'rxjs';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart/shopping-cart.service';
import { Course } from 'src/app/core/models/course.interface';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  shoppingCartCoursesSub: Subscription;
  shoppingCartCourses: Course[];
  displayedColumns: string[] = ['title', 'description', 'price', 'actions'];

  constructor(private shoppingCartService: ShoppingCartService) { }

  get totalPrice() {
    let total = 0;

    this.shoppingCartCourses.forEach(course => {
      total += course.price;
    });

    return total;
  }

  ngOnInit() {
    this.shoppingCartCoursesSub = this.shoppingCartService.getMappedCourses()
      .subscribe(courses => {
        this.shoppingCartCourses = courses;
      });
  }

  ngOnDestroy() {
    this.shoppingCartCoursesSub.unsubscribe();
  }

  removeFromCart(course) {
    this.shoppingCartService.remove(course.key);
  }
}
