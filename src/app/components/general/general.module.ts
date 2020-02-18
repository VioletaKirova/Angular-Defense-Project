import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { MaterialModule } from 'src/app/core/material/material.module';



@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    ShoppingCartComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    HomeComponent,
    AboutComponent,
    ShoppingCartComponent
  ]
})
export class GeneralModule { }
