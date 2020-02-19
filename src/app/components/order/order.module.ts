import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderComponent } from './order/order.component';
import { MaterialModule } from 'src/app/core/material/material.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { OrderSuccessComponent } from './order-success/order-success.component';



@NgModule({
  declarations: [
    OrderComponent,
    OrderSuccessComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule
  ],
  exports: [
    OrderComponent
  ]
})
export class OrderModule { }
