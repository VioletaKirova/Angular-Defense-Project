import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryService } from 'src/app/core/services/category/category.service';
import { Category } from 'src/app/core/models/category.interface';
import { Course } from 'src/app/core/models/course.interface';
import { CourseService } from 'src/app/core/services/course/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  categories$: Observable<Category[]>;
  courses$: Observable<Course[]>;

  constructor(
    private categoryService: CategoryService,
    private courseService: CourseService
    ) { }

  ngOnInit() {
    this.categories$ = this.categoryService.getAll();
    this.courses$ = this.courseService.getAll();
  }
}
