import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {Router} from '@angular/router';
import { MenuController,LoadingController } from '@ionic/angular';
import { VariosService } from '../service/varios.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  secretKey = "123456&Descryption";
  menuderechosuperior:boolean=false;
  informacion_perfil: any;
  time_actual: Date= new Date;
  respuestatonysanuncios: any;
  variabledelsegmentmodel:any='0';
  respuestadetonysdetallesdelhome: any;
  constructor(
    private loadingController: LoadingController,
    private variosservicios: VariosService,
    public varios: VariosService,
    private router: Router,
    private menu: MenuController,
  ) 
  {
    this.ObtenerProfileInfo();
    this.obtenerAnuncios();

  }

  ionViewWillEnter(){
    this.menu.enable(true);
    this.ObtenerProfileInfo();
    this.obtenerAnuncios();
    this.ObtenerResumenCuentaHome();
  }

  async ngOnInit() {
    this.ObtenerProfileInfo();
    this.obtenerAnuncios();
    this.ObtenerResumenCuentaHome();
 }

 //EMPIEZA los menu superior y sus ONCHANGE
  async ObtenerProfileInfo(){
  if(this.varios.informacion_perfil){
    this.informacion_perfil=this.varios.informacion_perfil;
    console.log('informacion de perfil en Perfil', this.informacion_perfil);
  }
}

  async ObtenerResumenCuentaHome(){
    this.informacion_perfil=localStorage.getItem('profileInfo');
    this.informacion_perfil=this.decrypt(this.informacion_perfil);
    this.informacion_perfil=JSON.parse(this.informacion_perfil);
    var datatonysdetallesdelhome = {
      nombre_solicitud: 'tonysdetallesdelhome',
      id: this.informacion_perfil.id
    }
     this.variosservicios.variasfunciones(datatonysdetallesdelhome).subscribe(async( res: any ) =>{
       console.log('respuesta de tonysdetallesdelhome', res);
       this.respuestadetonysdetallesdelhome=res;
     });

}


  ONCHANGEmenuderechosuperior(){
    if(this.menuderechosuperior==false){
      this.menuderechosuperior=true;
    }
    else{
      this.menuderechosuperior=false;
    }
  }

  ONCHANGEclickenelcontent(){
    this.menuderechosuperior=false;

  }

  iramiperfilDelMenuDerechoSuperior(){
    this.router.navigate(['perfil']);
    this.menuderechosuperior=false;
  }

  decrypt(textToDecrypt : string){
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
    window.location.reload();
  }
//Termina menu superior y sus ONCHANGE



retirar(monto){
  console.log('el usuario desea retirar=',monto)
}


obtenerAnuncios(){
  var datatonysanuncios = {
    nombre_solicitud: 'tonysanuncios',
  }
   this.variosservicios.variasfunciones(datatonysanuncios).subscribe(async( res: any ) =>{
     console.log('respuesta de tonysanuncios', res);
     this.respuestatonysanuncios=res;
   });
}



ocultaranuncio(cadaanuncio, i){
  this.respuestatonysanuncios[i].hidden=true;
}



async segmentChanged(event){

  const actualizando = await this.loadingController.create({
  message: 'Actualizando...',spinner: 'bubbles',duration: 15000,
  });
  console.log(this.variabledelsegmentmodel);
  actualizando.dismiss();
  if(this.variabledelsegmentmodel==undefined||this.variabledelsegmentmodel==null){
    this.variabledelsegmentmodel='0';
  }

}


}
