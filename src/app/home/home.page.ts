import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {Router} from '@angular/router';
import { MenuController,LoadingController } from '@ionic/angular';
import { VariosService } from '../service/varios.service';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  secretKey = "123456&Descryption";
  verificarloginemail: any;
  menuderechosuperior:boolean=false;
  bitcoinlogo = "/assets/criptologos/Bitcoin.svg";
  bitcoinactual: number;
  bitcoinanterior: number;
  bitcoinaumento: number = 0;
  bitcoinreduccion: number = 0;
  bitcoinporcentajedeincremento: number;
  bitcoinporcentajededisminucion: number;
  trxlogo = "/assets/criptologos/trx.svg";
  trxactual: number;
  trxanterior: number;
  trxaumento: number = 0;
  trxreduccion: number = 0;
  trxporcentajedeincremento: number;
  trxporcentajededisminucion: number;
  dotlogo = "/assets/criptologos/dot.svg";
  dotactual: number;
  dotanterior: number;
  dotaumento: number = 0;
  dotreduccion: number = 0;
  dotporcentajedeincremento: number;
  dotporcentajededisminucion: number;
  adalogo = "/assets/criptologos/ada.svg";
  adaactual: number;
  adaanterior: number;
  adaaumento: number = 0;
  adareduccion: number = 0;
  adaporcentajedeincremento: number;
  adaporcentajededisminucion: number;
  informacion_perfil: any;
  precio_wera_usd: any;
  time_actual: Date= new Date;
  respuestatonysanuncios: any;
  variabledelsegmentmodel:any='0';
  respuestatonysobteneradmindirecciones: any;
  resumen: any;
  constructor(
    private loadingController: LoadingController,
    private variosservicios: VariosService,
    private router: Router,
    private menu: MenuController,
    private clipboard: Clipboard
  ) 
  {
    this.funcionverificarlogin();
    this.ObtenerProfileInfo();
    this.obtenerAnuncios();
    this.obtenerprecio_wera_usdsegunfase();
    this.Obteneradmindirecciones();
  }

  ionViewWillEnter(){
    this.menu.enable(true);
    this.ObtenerProfileInfo();
    this.obtenerAnuncios();
    this.Obteneradmindirecciones();
    this.ObtenerresumenDeCuenta();
    this.variosservicios.activar_realtime_resumen_home=true;
    this.ConRealTime();
  }

  async ngOnInit() {
    this.funcionverificarlogin();
    this.ObtenerProfileInfo();
    this.obtenerAnuncios();
    this.obtenerprecio_wera_usdsegunfase();
    this.Obteneradmindirecciones();
 }

 //EMPIEZA los menu superior y sus ONCHANGE
  async ObtenerProfileInfo(){
  this.informacion_perfil=localStorage.getItem('profileInfo');
  this.informacion_perfil=this.decrypt(this.informacion_perfil);
  this.informacion_perfil=JSON.parse(this.informacion_perfil);
  console.log('informacion de perfil en Perfil', this.informacion_perfil);
}
  funcionverificarlogin(){
    this.verificarloginemail=localStorage.getItem('email');
    this.verificarloginemail= this.decrypt(this.verificarloginemail);
    console.log('this.verificarlogin', this.verificarloginemail);
    if(this.verificarloginemail!=null||this.verificarloginemail!='false')
     {
      console.log('Bienvenido:',this.verificarloginemail);
    }
  }

  ConRealTime(){
  
    setTimeout(() => 
    {
      if(this.variosservicios.activar_realtime_resumen_home==true){
        this.ObtenerresumenDeCuenta(); 
        this.ConRealTime();  //se repite
      } 
      },
        13000);
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
  }
//Termina menu superior y sus ONCHANGE

obtenerprecio_wera_usdsegunfase(){
  var datatonysobtenerprecio_wera_usd = {
    nombre_solicitud: 'tonysobtenerprecio_wera_usd'
  }
  this.variosservicios.variasfunciones(datatonysobtenerprecio_wera_usd).subscribe(async( res: any ) =>{
    console.log('respuesta de tonysobtenerprecio_wera_usd', res);
    this.precio_wera_usd=res;
});
}

retirar(monto){
  console.log('el usuario desea retirar=',monto)
}

async ObtenerresumenDeCuenta(){
  this.informacion_perfil=localStorage.getItem('profileInfo');
  this.informacion_perfil=this.decrypt(this.informacion_perfil);
  this.informacion_perfil=JSON.parse(this.informacion_perfil);
  var datatonysresumenmovimientos = {
    nombre_solicitud: 'tonysresumenmovimientos',
    id_user: this.informacion_perfil.id

  }
  this.variosservicios.variasfunciones(datatonysresumenmovimientos).subscribe(async( res: any ) =>{
    console.log('respuesta de tonysresumenmovimientos', res);
    this.resumen=res;
});

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

Obteneradmindirecciones(){
  var datatonysobteneradmindirecciones = {
    nombre_solicitud: 'tonysobteneradmindirecciones',
  }
   this.variosservicios.variasfunciones(datatonysobteneradmindirecciones).subscribe(async( res: any ) =>{
     console.log('respuesta de tonysobteneradmindirecciones', res);
     this.respuestatonysobteneradmindirecciones=res;
   });
}



ocultaranuncio(cadaanuncio, i){
  this.respuestatonysanuncios[i].hidden=true;
}

async copiar(texto) {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(texto);
    } catch (err) {}
  }
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

ionViewWillLeave(){
  this.variosservicios.activar_realtime_resumen_home=false;
}



}
