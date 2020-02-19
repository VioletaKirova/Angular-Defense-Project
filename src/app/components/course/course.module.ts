import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesComponent } from './courses/courses.component';
import { MaterialModule } from 'src/app/core/material/material.module';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseRoutingModule } from './course-routing.module';



@NgModule({
  declarations: [
    CoursesComponent,
    CourseDetailsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CourseRoutingModule
  ]
})
export class CourseModule { }
