import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearFamiliarPage } from './crear-familiar.page';

const routes: Routes = [
  {
    path: '',
    component: CrearFamiliarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearFamiliarPageRoutingModule {}
