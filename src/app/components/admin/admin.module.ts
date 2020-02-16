import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCoursesComponent } from './courses/admin-courses/admin-courses.component';
import { MaterialModule } from 'src/app/core/material/material.module';



@NgModule({
  declarations: [
    AdminCoursesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    AdminCoursesComponent
  ]
})
export class AdminModule { }
