import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { CourseService } from 'src/app/core/services/course/course.service';
import { Course } from 'src/app/core/models/course.interface';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  course$: Observable<Course>;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService) { }

  ngOnInit() {
    // tslint:disable-next-line: no-string-literal
    const courseId = this.route.snapshot.params['id'];
    this.course$ = this.courseService.getById(courseId);
  }

}
