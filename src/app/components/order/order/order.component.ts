import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { Course } from 'src/app/core/models/course.interface';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart/shopping-cart.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { Order } from 'src/app/core/models/order.interface';
import { OrderService } from 'src/app/core/services/order/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {

  user: any;
  userSub: Subscription;
  shoppingCartCoursesSub: Subscription;
  order: Course[];
  displayedColumns: string[] = ['title', 'description', 'price'];

  constructor(
    private shoppingCartService: ShoppingCartService,
    private userService: UserService,
    private orderService: OrderService,
    private router: Router) { }

  get totalPrice() {
    let total = 0;

    this.order.forEach(course => {
      total += course.price;
    });

    return total;
  }

  ngOnInit() {
    this.shoppingCartCoursesSub = this.shoppingCartService.getMappedCourses()
      .subscribe(courses => {
        this.order = courses;
      });

    this.userSub = this.userService.getCurrentUser().subscribe((user) => {
        this.user = user;
      });
  }

  ngOnDestroy() {
    this.shoppingCartCoursesSub.unsubscribe();
    this.userSub.unsubscribe();
  }

  async finish() {
    const order = new Order();

    order.user = this.user.email;
    order.courses = this.order;
    order.amount = this.totalPrice;
    order.date = new Date().getTime();

    const result = await this.orderService.create(order);

    this.shoppingCartService.clear();
    this.router.navigate(['/order', result.key]);
  }
}
