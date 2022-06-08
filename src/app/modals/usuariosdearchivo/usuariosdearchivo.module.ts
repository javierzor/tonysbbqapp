import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuariosdearchivoPageRoutingModule } from './usuariosdearchivo-routing.module';

import { UsuariosdearchivoPage } from './usuariosdearchivo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuariosdearchivoPageRoutingModule
  ],
  declarations: [UsuariosdearchivoPage]
})
export class UsuariosdearchivoPageModule {}
