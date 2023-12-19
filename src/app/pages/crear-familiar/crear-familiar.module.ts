import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearFamiliarPageRoutingModule } from './crear-familiar-routing.module';

import { CrearFamiliarPage } from './crear-familiar.page';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearFamiliarPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CrearFamiliarPage]
})
export class CrearFamiliarPageModule {}
