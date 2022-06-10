import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VariosService } from 'src/app/service/varios.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-direccionnueva',
  templateUrl: './direccionnueva.page.html',
  styleUrls: ['./direccionnueva.page.scss'],
})
export class DireccionnuevaPage implements OnInit {
  tipo_direccion: any;
  direccion: any;
  secretKey = "123456&Descryption";
  informacion_perfil: any;
  direccionesderetiro: any;
  cadaformulario;
  step: any = '1';
  constructor(
    private varios: VariosService,
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


  agregardireccion(){



  }

  decrypt(textToDecrypt : string){
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }

  step1(){
    this.step='1';
  }

  step2(){
    this.step='2';
  }

  agregarpregunta(){

  }

  

}
