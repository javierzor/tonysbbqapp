import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosdearchivoPage } from './usuariosdearchivo.page';

const routes: Routes = [
  {
    path: '',
    component: UsuariosdearchivoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosdearchivoPageRoutingModule {}
