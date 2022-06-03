import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActualizardireccionPageRoutingModule } from './actualizardireccion-routing.module';

import { ActualizardireccionPage } from './actualizardireccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActualizardireccionPageRoutingModule
  ],
  declarations: [ActualizardireccionPage]
})
export class ActualizardireccionPageModule {}
