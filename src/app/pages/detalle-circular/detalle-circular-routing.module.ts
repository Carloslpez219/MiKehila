import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleCircularPage } from './detalle-circular.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleCircularPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleCircularPageRoutingModule {}
