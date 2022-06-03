import { Component, OnInit } from '@angular/core';
import { NavParams,ModalController  } from '@ionic/angular';

@Component({
  selector: 'app-visualizadorimagenes',
  templateUrl: './visualizadorimagenes.page.html',
  styleUrls: ['./visualizadorimagenes.page.scss'],
})
export class VisualizadorimagenesPage implements OnInit {
  traidopormodalparams: any;
  dataparaelmodal;
  constructor(
    navParams: NavParams,
    public modalController: ModalController,

  ) 
  {
    this.traidopormodalparamsFuction();
   }

  ngOnInit() {
    this.traidopormodalparamsFuction();

  }

  traidopormodalparamsFuction(){
    // this.traidopormodalparams=navParams.get('dataparaelmodal');
    console.log('recibido por modalparams', this.dataparaelmodal);
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': false
    });
  }


}
