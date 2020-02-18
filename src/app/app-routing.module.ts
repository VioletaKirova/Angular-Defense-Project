import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/general/home/home.component';
import { CoursesComponent } from './components/course/courses/courses.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { AboutComponent } from './components/general/about/about.component';
import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { OrdersComponent } from './components/order/orders/orders/orders.component';
import { AdminCoursesComponent } from './components/admin/courses/admin-courses.component';
import { AdminGuard } from './core/guards/admin.guard';
import { CreateCourseComponent } from './components/admin/create-course/create-course.component';
import { EditCourseComponent } from './components/admin/edit-course/edit-course.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'admin/courses', component: AdminCoursesComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/course/create', component: CreateCourseComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/course/:id/edit', component: EditCourseComponent, canActivate: [AuthGuard, AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
