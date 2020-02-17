import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminCoursesComponent } from './courses/admin-courses.component';
import { MaterialModule } from 'src/app/core/material/material.module';
import { CreateCourseComponent } from './create-course/create-course.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { EditCourseComponent } from './edit-course/edit-course.component';



@NgModule({
  declarations: [
    AdminCoursesComponent,
    CreateCourseComponent,
    EditCourseComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    AdminCoursesComponent
  ]
})
export class AdminModule { }
