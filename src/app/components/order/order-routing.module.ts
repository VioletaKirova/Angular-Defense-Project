import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderComponent } from './order/order.component';
import { OrderSuccessComponent } from './order-success/order-success.component';


const routes: Routes = [
  { path: '', component: OrderComponent },
  { path: ':id', component: OrderSuccessComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
