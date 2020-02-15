import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesComponent } from './courses/courses.component';
import { MaterialModule } from 'src/app/core/material/material.module';



@NgModule({
  declarations: [CoursesComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class CourseModule { }
