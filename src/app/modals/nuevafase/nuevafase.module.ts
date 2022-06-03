import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevafasePageRoutingModule } from './nuevafase-routing.module';

import { NuevafasePage } from './nuevafase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevafasePageRoutingModule
  ],
  declarations: [NuevafasePage]
})
export class NuevafasePageModule {}
