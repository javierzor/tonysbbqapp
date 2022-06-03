import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevafasePage } from './nuevafase.page';

const routes: Routes = [
  {
    path: '',
    component: NuevafasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevafasePageRoutingModule {}
