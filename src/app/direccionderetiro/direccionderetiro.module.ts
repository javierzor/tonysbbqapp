import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DireccionderetiroPageRoutingModule } from './direccionderetiro-routing.module';

import { DireccionderetiroPage } from './direccionderetiro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DireccionderetiroPageRoutingModule
  ],
  declarations: [DireccionderetiroPage]
})
export class DireccionderetiroPageModule {}
