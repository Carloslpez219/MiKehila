import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FamilairesPage } from './familaires.page';

const routes: Routes = [
  {
    path: '',
    component: FamilairesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FamilairesPageRoutingModule {}
