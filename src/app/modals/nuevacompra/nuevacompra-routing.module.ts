import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevacompraPage } from './nuevacompra.page';

const routes: Routes = [
  {
    path: '',
    component: NuevacompraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevacompraPageRoutingModule {}
