import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DireccionderetiroPage } from './direccionderetiro.page';

const routes: Routes = [
  {
    path: '',
    component: DireccionderetiroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DireccionderetiroPageRoutingModule {}
