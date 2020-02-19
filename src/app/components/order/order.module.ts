import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderComponent } from './order/order.component';
import { MaterialModule } from 'src/app/core/material/material.module';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { OrderRoutingModule } from './order-routing.module';



@NgModule({
  declarations: [
    OrderComponent,
    OrderSuccessComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
