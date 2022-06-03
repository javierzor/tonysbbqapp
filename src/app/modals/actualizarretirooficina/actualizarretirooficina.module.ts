import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActualizarretirooficinaPageRoutingModule } from './actualizarretirooficina-routing.module';

import { ActualizarretirooficinaPage } from './actualizarretirooficina.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActualizarretirooficinaPageRoutingModule
  ],
  declarations: [ActualizarretirooficinaPage]
})
export class ActualizarretirooficinaPageModule {}
