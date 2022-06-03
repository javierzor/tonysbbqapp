import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { NuevacompraPageRoutingModule } from './nuevacompra-routing.module';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NuevacompraPage } from './nuevacompra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    NuevacompraPageRoutingModule
  ],
  declarations: [NuevacompraPage]
})
export class NuevacompraPageModule {}
