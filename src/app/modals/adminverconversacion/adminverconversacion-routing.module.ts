import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminverconversacionPage } from './adminverconversacion.page';

const routes: Routes = [
  {
    path: '',
    component: AdminverconversacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminverconversacionPageRoutingModule {}
