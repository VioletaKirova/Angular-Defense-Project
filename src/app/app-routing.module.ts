import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/general/home/home.component';
import { CoursesComponent } from './components/course/courses/courses.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { AboutComponent } from './components/general/about/about.component';
import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { OrderComponent } from './components/order/order/order.component';
import { AdminCoursesComponent } from './components/admin/courses/admin-courses.component';
import { AdminGuard } from './core/guards/admin.guard';
import { CreateCourseComponent } from './components/admin/create-course/create-course.component';
import { EditCourseComponent } from './components/admin/edit-course/edit-course.component';
import { ShoppingCartComponent } from './components/general/shopping-cart/shopping-cart.component';
import { OrderSuccessComponent } from './components/order/order-success/order-success.component';
import { CourseDetailsComponent } from './components/course/course-details/course-details.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'courses/:id', component: CourseDetailsComponent, canActivate: [AuthGuard] },
  { path: 'courses', component: CoursesComponent },
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'admin/courses', component: AdminCoursesComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/course/create', component: CreateCourseComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/course/:id/edit', component: EditCourseComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'cart', component: ShoppingCartComponent, canActivate: [AuthGuard] },
  { path: 'order/:id', component: OrderSuccessComponent, canActivate: [AuthGuard] },
  { path: 'order', component: OrderComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
