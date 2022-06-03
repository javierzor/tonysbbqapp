import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VariosService } from 'src/app/service/varios.service';

@Component({
  selector: 'app-nuevafase',
  templateUrl: './nuevafase.page.html',
  styleUrls: ['./nuevafase.page.scss'],
})
export class NuevafasePage implements OnInit {
  limitefaseusd:any;
  precio_wera_usd:any;
  porcentaje:any;
  asignaciondetokens:any;
  titulo:any;
  mensaje:any;
  prioridad:any = 'normal';


  constructor(
    public varios: VariosService,
    private modalController: ModalController,
    private variosservicios: VariosService,

  ) { }

  ngOnInit() {
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': false
    });
  }
  
  dismissyactualiza() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
    this.varios.loading2segundos('Agregando, Porfavor espere...');
  }

  agregaranuncio(){
    var datatonysagregaranuncio = {
      nombre_solicitud:'tonysagregaranuncio',
      titulo: this.titulo,
      mensaje: this.mensaje,
      prioridad: this.prioridad
    }

    this.variosservicios.variasfunciones(datatonysagregaranuncio).subscribe(async( res: any ) =>{
      console.log('respuesta de tonysagregaranuncio', res);
      if(res.id>0){
       this.variosservicios.presentToast("Nuevo anuncio Agregado");
       this.dismissyactualiza();
     }
      else {
       this.variosservicios.presentToast("..::Error temporal, reintente::..");

     }
     });

  }

}
