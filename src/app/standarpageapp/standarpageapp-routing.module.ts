import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StandarpageappPage } from './standarpageapp.page';

const routes: Routes = [
  {
    path: '',
    component: StandarpageappPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StandarpageappPageRoutingModule {}
