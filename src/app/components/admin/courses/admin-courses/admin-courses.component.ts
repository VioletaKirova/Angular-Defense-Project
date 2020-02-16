import { Component, OnInit } from '@angular/core';
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

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.courses$ = this.courseService.getAll();
  }

}
