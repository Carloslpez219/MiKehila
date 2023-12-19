import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleFamiliarPage } from './detalle-familiar.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleFamiliarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleFamiliarPageRoutingModule {}
