import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleCircularPageRoutingModule } from './detalle-circular-routing.module';

import { DetalleCircularPage } from './detalle-circular.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleCircularPageRoutingModule
  ],
  declarations: [DetalleCircularPage]
})
export class DetalleCircularPageModule {}
