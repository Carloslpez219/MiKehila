import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallePhotoalbumPage } from './detalle-photoalbum.page';

const routes: Routes = [
  {
    path: '',
    component: DetallePhotoalbumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallePhotoalbumPageRoutingModule {}
