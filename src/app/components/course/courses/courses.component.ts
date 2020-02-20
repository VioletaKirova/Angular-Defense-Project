import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { Category } from 'src/app/core/models/category.interface';
import { Course } from 'src/app/core/models/course.interface';
import { CourseService } from 'src/app/core/services/course/course.service';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart/shopping-cart.service';
import { OrderService } from 'src/app/core/services/order/order.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { AuthService } from 'src/app/core/services/authentication/auth.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {

  categories$: Observable<Category[]>;
  courses$: Observable<Course[]>;
  shoppingCartCoursesSub: Subscription;
  shoppingCartCourses: Course[];
  userOrdersSub: Subscription;
  userCoursesSub: Subscription;
  currentCourse: Course;
  userCourses: Course[];

  constructor(
    private categoryService: CategoryService,
    private courseService: CourseService,
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService,
    private userService: UserService,
    private router: Router
    ) {
      this.shoppingCartCoursesSub = this.shoppingCartService.getCourses()
        .subscribe((courses) => {
          this.shoppingCartCourses = courses;
        });
    }

  ngOnInit() {
    this.categories$ = this.categoryService.getAll();

    this.courses$ = this.courseService.getAll();

    this.userOrdersSub = this.userService.getCurrentUser()
    .pipe(switchMap((user) => {
      return this.orderService.getOrderIdsByUserEmail(user.email)
        .pipe(switchMap((orderIds) => {
          const userCourses = [];
          orderIds.forEach(orderId => {
            this.orderService.getCoursesByOrderId(orderId)
              .pipe(map((courses) => {
                return courses;
              })).subscribe((courses: any[]) => {
                courses.forEach(c => {
                  userCourses.push(c);
                });
              });
          });
          this.userCourses = userCourses;
          return userCourses;
        }));
    })).subscribe();
  }

  ngOnDestroy() {
    this.shoppingCartCoursesSub.unsubscribe();
    this.userOrdersSub.unsubscribe();
  }

  addToCart(course) {
    this.shoppingCartService.add(course);
  }

  courseIsAddedToCart(courseId) {
    return this.shoppingCartCourses.find(course => course.key === courseId);
  }

  removeFromCart(courseId) {
    this.shoppingCartService.remove(courseId);
  }

  courseIsAccessible(courseId) {
    return this.userCourses.find(course => course.key === courseId);
  }

  access(courseId) {
    this.router.navigate(['/courses', courseId]);
  }
}
