import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArchivosdeusuarioPageRoutingModule } from './archivosdeusuario-routing.module';

import { ArchivosdeusuarioPage } from './archivosdeusuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArchivosdeusuarioPageRoutingModule
  ],
  declarations: [ArchivosdeusuarioPage]
})
export class ArchivosdeusuarioPageModule {}
