import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDocViewerModule } from 'ngx-doc-viewer'

import { IonicModule } from '@ionic/angular';
// visualziador de archivos:
import { VisualizadorimagenesPageRoutingModule } from './visualizadorimagenes-routing.module';

import { VisualizadorimagenesPage } from './visualizadorimagenes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxDocViewerModule,
    VisualizadorimagenesPageRoutingModule
  ],
  declarations: [VisualizadorimagenesPage]
})
export class VisualizadorimagenesPageModule {}
