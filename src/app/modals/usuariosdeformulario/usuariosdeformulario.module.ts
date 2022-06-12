import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuariosdeformularioPageRoutingModule } from './usuariosdeformulario-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { UsuariosdeformularioPage } from './usuariosdeformulario.page';

@NgModule({
  imports: [
    CommonModule,
    Ng2SearchPipeModule,
    FormsModule,
    IonicModule,
    UsuariosdeformularioPageRoutingModule
  ],
  declarations: [UsuariosdeformularioPage]
})
export class UsuariosdeformularioPageModule {}
