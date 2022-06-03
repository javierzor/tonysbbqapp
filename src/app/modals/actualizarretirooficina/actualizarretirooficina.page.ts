import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { VariosService } from 'src/app/service/varios.service';

@Component({
  selector: 'app-actualizarretirooficina',
  templateUrl: './actualizarretirooficina.page.html',
  styleUrls: ['./actualizarretirooficina.page.scss'],
})
export class ActualizarretirooficinaPage implements OnInit {
  direccionderetiro;
  cambiosenlalista: boolean = false;

  constructor(
    private navParams: NavParams,

    private modalController: ModalController,
    private variosservicios: VariosService,

  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.obtenerdirecciones();
  }

  dismissyactualiza() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': false
    });
  }
  
  ONCHANGElista(){
    console.log('atualizado');
    this.cambiosenlalista=true;
  }
  

  obtenerdirecciones(){
    var datatonysobtenerdireccionderetiro = {
      nombre_solicitud: 'tonysobtenerdireccionderetiro',
    }
     this.variosservicios.variasfunciones(datatonysobtenerdireccionderetiro).subscribe(async( res: any ) =>{
       console.log('respuesta de tonysobtenerdireccionderetiro', res);
       this.direccionderetiro=res[0];
     });
  }

  actualizardireccion(){
    var datatonysobtenerdireccionderetiro = {
      nombre_solicitud: 'tonysactualizardireccionderetiro',
      oficina: this.direccionderetiro.oficina,
      direccion: this.direccionderetiro.direccion,
      telefono: this.direccionderetiro.telefono,
      dias: this.direccionderetiro.dias,
     horarios: this.direccionderetiro.horarios,
}
 this.variosservicios.variasfunciones(datatonysobtenerdireccionderetiro).subscribe(async( res: any ) =>{
   console.log('respuesta de tonysobtenerdireccionderetiro', res);
   if(res>0){
    this.dismissyactualiza();
   }
 });
}


}
