import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallePhotoalbumPageRoutingModule } from './detalle-photoalbum-routing.module';

import { DetallePhotoalbumPage } from './detalle-photoalbum.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallePhotoalbumPageRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [DetallePhotoalbumPage]
})
export class DetallePhotoalbumPageModule {}
