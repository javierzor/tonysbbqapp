import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisualizadorimagenesPageRoutingModule } from './visualizadorimagenes-routing.module';

import { VisualizadorimagenesPage } from './visualizadorimagenes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisualizadorimagenesPageRoutingModule
  ],
  declarations: [VisualizadorimagenesPage]
})
export class VisualizadorimagenesPageModule {}
