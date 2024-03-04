import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FamiliaresPerfilPage } from './familiares-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: FamiliaresPerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FamiliaresPerfilPageRoutingModule {}
