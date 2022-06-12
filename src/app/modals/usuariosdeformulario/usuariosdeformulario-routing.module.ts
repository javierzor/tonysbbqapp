import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosdeformularioPage } from './usuariosdeformulario.page';

const routes: Routes = [
  {
    path: '',
    component: UsuariosdeformularioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosdeformularioPageRoutingModule {}
