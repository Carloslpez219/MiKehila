import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallePhotoalbumPageRoutingModule } from './detalle-photoalbum-routing.module';

import { DetallePhotoalbumPage } from './detalle-photoalbum.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallePhotoalbumPageRoutingModule
  ],
  declarations: [DetallePhotoalbumPage]
})
export class DetallePhotoalbumPageModule {}
