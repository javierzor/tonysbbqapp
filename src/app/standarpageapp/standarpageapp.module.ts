import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StandarpageappPageRoutingModule } from './standarpageapp-routing.module';

import { StandarpageappPage } from './standarpageapp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StandarpageappPageRoutingModule
  ],
  declarations: [StandarpageappPage]
})
export class StandarpageappPageModule {}
