import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleMultimediaPageRoutingModule } from './detalle-multimedia-routing.module';

import { DetalleMultimediaPage } from './detalle-multimedia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleMultimediaPageRoutingModule
  ],
  declarations: [DetalleMultimediaPage]
})
export class DetalleMultimediaPageModule {}
