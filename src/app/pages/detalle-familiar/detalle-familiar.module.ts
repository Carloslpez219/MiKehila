import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleFamiliarPageRoutingModule } from './detalle-familiar-routing.module';

import { DetalleFamiliarPage } from './detalle-familiar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleFamiliarPageRoutingModule
  ],
  declarations: [DetalleFamiliarPage]
})
export class DetalleFamiliarPageModule {}
