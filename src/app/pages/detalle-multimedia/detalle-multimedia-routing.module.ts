import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleMultimediaPage } from './detalle-multimedia.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleMultimediaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleMultimediaPageRoutingModule {}
