import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DireccionnuevaPageRoutingModule } from './direccionnueva-routing.module';

import { DireccionnuevaPage } from './direccionnueva.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DireccionnuevaPageRoutingModule
  ],
  declarations: [DireccionnuevaPage]
})
export class DireccionnuevaPageModule {}
