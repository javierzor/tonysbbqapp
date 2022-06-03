import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerconversacionPageRoutingModule } from './verconversacion-routing.module';

import { VerconversacionPage } from './verconversacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerconversacionPageRoutingModule
  ],
  declarations: [VerconversacionPage]
})
export class VerconversacionPageModule {}
