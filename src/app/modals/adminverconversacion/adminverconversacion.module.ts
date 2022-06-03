import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminverconversacionPageRoutingModule } from './adminverconversacion-routing.module';

import { AdminverconversacionPage } from './adminverconversacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminverconversacionPageRoutingModule
  ],
  declarations: [AdminverconversacionPage]
})
export class AdminverconversacionPageModule {}
