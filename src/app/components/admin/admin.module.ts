import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCoursesComponent } from './courses/admin-courses/admin-courses.component';



@NgModule({
  declarations: [
    AdminCoursesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AdminCoursesComponent
  ]
})
export class AdminModule { }
