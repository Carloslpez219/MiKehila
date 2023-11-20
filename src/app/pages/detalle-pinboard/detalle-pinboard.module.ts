import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallePinboardPageRoutingModule } from './detalle-pinboard-routing.module';

import { DetallePinboardPage } from './detalle-pinboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallePinboardPageRoutingModule
  ],
  declarations: [DetallePinboardPage]
})
export class DetallePinboardPageModule {}
