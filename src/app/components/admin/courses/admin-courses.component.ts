import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Course } from 'src/app/core/models/course.interface';
import { CourseService } from 'src/app/core/services/course/course.service';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.css']
})
export class AdminCoursesComponent implements OnInit {

  courses$: Observable<Course[]>;
  displayedColumns: string[] = ['title', 'category', 'description', 'price', 'actions'];

  constructor(
    private courseService: CourseService,
    private router: Router) { }

  ngOnInit() {
    this.courses$ = this.courseService.getAll();
  }

  editCourse(data) {
    const id = data.key;
    this.router.navigate(['/admin/course', id, 'edit']);
  }

  deleteCourse(data) {
    if (window.confirm('Are you sure you want to delete the course?')) {
      const id = data.key;
      this.courseService.delete(id);
    }
  }
}
