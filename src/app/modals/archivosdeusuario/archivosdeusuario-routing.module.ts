import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArchivosdeusuarioPage } from './archivosdeusuario.page';

const routes: Routes = [
  {
    path: '',
    component: ArchivosdeusuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArchivosdeusuarioPageRoutingModule {}
