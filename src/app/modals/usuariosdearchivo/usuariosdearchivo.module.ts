import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuariosdearchivoPageRoutingModule } from './usuariosdearchivo-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { UsuariosdearchivoPage } from './usuariosdearchivo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2SearchPipeModule,
    IonicModule,
    UsuariosdearchivoPageRoutingModule
  ],
  declarations: [UsuariosdearchivoPage]
})
export class UsuariosdearchivoPageModule {}
