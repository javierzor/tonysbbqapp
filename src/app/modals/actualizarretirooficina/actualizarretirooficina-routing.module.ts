import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActualizarretirooficinaPage } from './actualizarretirooficina.page';

const routes: Routes = [
  {
    path: '',
    component: ActualizarretirooficinaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActualizarretirooficinaPageRoutingModule {}
