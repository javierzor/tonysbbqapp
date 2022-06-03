import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualizadorimagenesPage } from './visualizadorimagenes.page';

const routes: Routes = [
  {
    path: '',
    component: VisualizadorimagenesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisualizadorimagenesPageRoutingModule {}
