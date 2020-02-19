import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminCoursesComponent } from './courses/admin-courses.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';


const routes: Routes = [
  { path: '', component: AdminCoursesComponent },
  { path: 'courses', component: AdminCoursesComponent },
  { path: 'course/create', component: CreateCourseComponent },
  { path: 'course/:id/edit', component: EditCourseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
