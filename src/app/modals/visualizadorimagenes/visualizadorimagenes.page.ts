import { Component, OnInit } from '@angular/core';
import { NavParams,ModalController  } from '@ionic/angular';
import { LoadingController } from "@ionic/angular";
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-visualizadorimagenes',
  templateUrl: './visualizadorimagenes.page.html',
  styleUrls: ['./visualizadorimagenes.page.scss'],
  
})
export class VisualizadorimagenesPage implements OnInit {
  traidopormodalparams: any;
  dataparaelmodal;
  doc: any;

  constructor(
    public sanitizer: DomSanitizer,
    private loadingController: LoadingController,
    navParams: NavParams,
    public modalController: ModalController,

  ) 


  
  {
    this.traidopormodalparamsFuction();
    this.loading();

   }

  ngOnInit() {
    this.traidopormodalparamsFuction();

  }

  async loading(){

    const actualizando = await this.loadingController.create({
      message: 'Cargando visualización de archivo, porfavor espere...',spinner: 'bubbles',duration: 3500,
      });
      actualizando.present();
    }

  async ionViewWillEnter(){

  }

  traidopormodalparamsFuction(){
    // this.traidopormodalparams=navParams.get('dataparaelmodal');
    console.log('recibido por modalparams', this.dataparaelmodal);

    // ya no es necesario sanatizar porque se a instalado el plugin BUENO npms de visualizador
    // this.doc = this.sanitizer.bypassSecurityTrustResourceUrl('https://docs.google.com/gview?url='+this.dataparaelmodal+'&embedded=true');        
    
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': false
    });
  }


}
