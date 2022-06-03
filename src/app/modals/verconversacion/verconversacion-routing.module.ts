import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerconversacionPage } from './verconversacion.page';

const routes: Routes = [
  {
    path: '',
    component: VerconversacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerconversacionPageRoutingModule {}
