import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallePinboardPage } from './detalle-pinboard.page';

const routes: Routes = [
  {
    path: '',
    component: DetallePinboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallePinboardPageRoutingModule {}
