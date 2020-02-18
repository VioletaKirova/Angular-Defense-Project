import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { CategoryService } from 'src/app/core/services/category/category.service';
import { Category } from 'src/app/core/models/category.interface';
import { Course } from 'src/app/core/models/course.interface';
import { CourseService } from 'src/app/core/services/course/course.service';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {

  categories$: Observable<Category[]>;
  courses$: Observable<Course[]>;
  shoppingCartCoursesSub: Subscription;
  shoppingCartCourses: any[];
  currentCourse: Course;

  constructor(
    private categoryService: CategoryService,
    private courseService: CourseService,
    private shoppingCartService: ShoppingCartService,
    ) {
      this.shoppingCartCoursesSub = this.shoppingCartService.getCourses()
        .subscribe((courses) => {
          this.shoppingCartCourses = courses;
        });
    }

  ngOnInit() {
    this.categories$ = this.categoryService.getAll();
    this.courses$ = this.courseService.getAll();
  }

  ngOnDestroy() {
    this.shoppingCartCoursesSub.unsubscribe();
  }

  addToCart(course) {
    this.shoppingCartService.add(course);
  }

  courseIsAddedToCart(shoppingCartCourses, courseId) {
    return shoppingCartCourses.find(course => course.key === courseId);
  }

  removeFromCart(courseId) {
    this.shoppingCartService.remove(courseId);
  }
}
