import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SoportePageRoutingModule } from './soporte-routing.module';

import { SoportePage } from './soporte.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SoportePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SoportePage]
})
export class SoportePageModule {}
