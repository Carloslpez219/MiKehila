import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FamilairesPageRoutingModule } from './familaires-routing.module';

import { FamilairesPage } from './familaires.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FamilairesPageRoutingModule
  ],
  declarations: [FamilairesPage]
})
export class FamilairesPageModule {}
