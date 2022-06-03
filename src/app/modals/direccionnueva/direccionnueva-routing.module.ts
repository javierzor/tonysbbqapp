import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DireccionnuevaPage } from './direccionnueva.page';

const routes: Routes = [
  {
    path: '',
    component: DireccionnuevaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DireccionnuevaPageRoutingModule {}
