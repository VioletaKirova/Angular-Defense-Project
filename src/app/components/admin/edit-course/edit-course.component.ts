import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription, Observable } from 'rxjs';
import { CourseService } from 'src/app/core/services/course/course.service';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { Course } from 'src/app/core/models/course.interface';
import { Category } from 'src/app/core/models/category.interface';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit, OnDestroy {

  form: FormGroup;
  courseSub: Subscription;
  courseId: string;
  course: Course;
  categories$: Observable<Category[]>;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private courseService: CourseService
  ) {
    this.categories$ = this.categoryService.getAll();
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      // tslint:disable-next-line: no-string-literal
      this.courseId = params['id'];
    });

    this.courseSub = this.courseService.getById(this.courseId).subscribe((data) => {
      this.course = data;

      this.form = this.fb.group({
        title: [this.course.title, [Validators.required, Validators.minLength(6)]],
        description: [this.course.description, [Validators.required, Validators.minLength(10)]],
        imageUrl: [this.course.imageUrl, [Validators.required]],
        price: [this.course.price, [Validators.required, Validators.min(10)]],
        category: [this.course.category, [Validators.required]],
      });
    });

  }

  ngOnDestroy() {
    this.courseSub.unsubscribe();
  }

  editCourse() {
    const { title, description, imageUrl, price, category } = this.form.value;

    this.courseService
      .update(this.courseId, title, description, imageUrl, price, category);
  }
}
