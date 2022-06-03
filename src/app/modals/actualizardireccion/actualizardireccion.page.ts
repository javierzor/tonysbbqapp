import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { VariosService } from 'src/app/service/varios.service';

@Component({
  selector: 'app-actualizardireccion',
  templateUrl: './actualizardireccion.page.html',
  styleUrls: ['./actualizardireccion.page.scss'],
})
export class ActualizardireccionPage implements OnInit {

cadadireccion;
  cambiosenlalista: boolean = false;
  constructor(
    private navParams: NavParams,

    private modalController: ModalController,
    private variosservicios: VariosService,

  )
   {
    this.cadadireccion= this.navParams.get('cadadireccion');    
    console.log('navparams=',this.navParams.get('cadadireccion'));
    }

  ngOnInit() {
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

  dismissyactualiza() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
    this.variosservicios.loading2segundos('Agregando, Porfavor espere...');
  }


  actualizardireccion(){
      var datatonysactualizaradmindireccion= {
      nombre_solicitud: 'tonysactualizaradmindireccion',
      id:this.cadadireccion.id,
      pais:this.cadadireccion.pais,
      nombre:this.cadadireccion.nombre,
      direccion_1:this.cadadireccion.direccion_1,
      ciudad:this.cadadireccion.ciudad,
      estado:this.cadadireccion.estado,
      codigo_postal:this.cadadireccion.codigo_postal,
      telefono:this.cadadireccion.telefono
    }
     this.variosservicios.variasfunciones(datatonysactualizaradmindireccion).subscribe(async( res: any ) =>{
       console.log('respuesta de tonysactualizaradmindireccion', res);
    if(res>0){
      this.variosservicios.presentToast("..::Actualización exitosa! ::..");
      this.dismissyactualiza();
     }
     else {
      this.variosservicios.presentToast("..::No hay cambios! ::..");

    }
    });
  }

}
