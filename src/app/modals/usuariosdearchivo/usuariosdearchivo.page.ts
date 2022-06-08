import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { VariosService } from 'src/app/service/varios.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-usuariosdearchivo',
  templateUrl: './usuariosdearchivo.page.html',
  styleUrls: ['./usuariosdearchivo.page.scss'],
})
export class UsuariosdearchivoPage implements OnInit {
  id;
  nombre;
  step: string = '1';
  respuestadetonysverusuariosdearchivo: any;

  constructor(
    private loadingController: LoadingController,
    private varios: VariosService,
    private modalController: ModalController,
    private variosservicios: VariosService,
  ) 
  
  {
    this.VerUsuariosDeArchivoFuction();
    this.traidopormodalparamsFuction();
  }

  ngOnInit() {
  }

  dismissyactualiza() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
    this.varios.loading2segundos('Agregando, Porfavor espere...');
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': false
    });
  }

  traidopormodalparamsFuction(){
    // this.traidopormodalparams=navParams.get('dataparaelmodal');
    console.log('recibido por modalparams 1', this.id);
    console.log('recibido por modalparams 2', this.nombre);

    // ya no es necesario sanatizar porque se a instalado el plugin BUENO npms de visualizador
    // this.doc = this.sanitizer.bypassSecurityTrustResourceUrl('https://docs.google.com/gview?url='+this.dataparaelmodal+'&embedded=true');        
    
  }

  async VerUsuariosDeArchivoFuction(){
    const actualizando = await this.loadingController.create({
      message: 'Consultando usuarios...',spinner: 'bubbles',duration: 15000,
      });
      actualizando.present();
    var datatonysverusuariosdearchivo = {
      nombre_solicitud: 'tonysverusuariosdearchivo',
      id: this.id
    }
     this.variosservicios.variasfunciones(datatonysverusuariosdearchivo).subscribe(async( res: any ) =>{
       console.log('respuesta de tonysverusuariosdearchivo', res);
       this.respuestadetonysverusuariosdearchivo=res;
       actualizando.dismiss();
     });
  }
  
  step1(){
    this.step='1';
        console.log('this.step', this.step);
  }

  step2(){
    this.step='2';
        console.log('this.step', this.step);
  }

}
