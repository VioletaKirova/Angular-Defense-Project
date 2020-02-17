import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { Category } from 'src/app/core/models/category.interface';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { CourseService } from 'src/app/core/services/course/course.service';

@Component({
  selector: 'app-admin-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  form: FormGroup;
  categories$: Observable<Category[]>;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private courseService: CourseService) {
      this.categories$ = this.categoryService.getAll();
     }

  ngOnInit() {
    this.form = this.fb.group({
      title: [null, [Validators.required, Validators.minLength(6)]],
      description: [null, [Validators.required, Validators.minLength(10)]],
      imageUrl: [null, [Validators.required]],
      price: [null, [Validators.required, Validators.min(10)]],
      category: [null, [Validators.required]],
    });
  }

  addCourse() {
    const { title, description, imageUrl, price, category } = this.form.value;

    this.courseService
      .create(title, description, imageUrl, price, category);
  }
}
