import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FamiliaresPerfilPageRoutingModule } from './familiares-perfil-routing.module';

import { FamiliaresPerfilPage } from './familiares-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FamiliaresPerfilPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FamiliaresPerfilPage]
})
export class FamiliaresPerfilPageModule {}
