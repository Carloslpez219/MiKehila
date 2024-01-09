import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleEncuestaPageRoutingModule } from './detalle-encuesta-routing.module';

import { DetalleEncuestaPage } from './detalle-encuesta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleEncuestaPageRoutingModule
  ],
  declarations: [DetalleEncuestaPage]
})
export class DetalleEncuestaPageModule {}
