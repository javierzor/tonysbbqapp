import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {Router} from '@angular/router';
import { MenuController } from '@ionic/angular';
import { VariosService } from '../service/varios.service';
import { ImageService } from '../service/image.service';
import { Image } from './../models/image.model';
import { PaisesService } from '../service/paises.service';
import { AlertController } from '@ionic/angular';
import { IonRouterOutlet } from '@ionic/angular';
import { DireccionnuevaPage } from '../modals/direccionnueva/direccionnueva.page';
import { ModalController } from '@ionic/angular';
import { NuevacompraPage } from '../modals/nuevacompra/nuevacompra.page';
import { VisualizadorimagenesPage } from '../modals/visualizadorimagenes/visualizadorimagenes.page';
import { ToastController, LoadingController } from "@ionic/angular";

@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.page.html',
  styleUrls: ['./formularios.page.scss'],
})
export class FormulariosPage {


  
  secretKey = "123456&Descryption";
  verificarloginemail: any;
  menuderechosuperior:boolean=false;
  countryData: { id: number; name: string; }[];
  informacion_perfil: any;
  step:any='1';
  languages_active: any;
  ValorSegmento: any ='formularios';
  tonystraerformulariosdeusuario: any;
  formularioseleccionado:any;
  respuestadetonysobtenerpreguntasdeformulario: any;
  constructor(
    private loadingController: LoadingController,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private variosservicios: VariosService,
    public  varios: VariosService,
    private router: Router,
    private menu: MenuController,
    private imageService: ImageService,
    private paises: PaisesService,
    public alertController: AlertController

  ) 
  {

    this.countryData=this.paises.countryData;    
    this.ObtenerProfileInfo();
    this.step='1';
  }
  ionViewWillEnter(){
    this.menu.enable(true);
    this.variosservicios.activar_realtime_paqueteria=true;
    this.ConRealTime();
  }
  async ngOnInit() {
    this.ObtenerProfileInfo();
    this.step='1';
    this.obtenermovimientos();
  }

  async ObtenerProfileInfo(){
    if(this.varios.informacion_perfil){
      this.informacion_perfil=this.varios.informacion_perfil;
      console.log('informacion de perfil en Perfil', this.informacion_perfil);
    }
  }

  ONCHANGEmenuderechosuperior(){
    if(this.menuderechosuperior==false)   {this.menuderechosuperior=true;}
    else{this.menuderechosuperior=false;}
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

obtenermovimientos(){
  this.informacion_perfil=localStorage.getItem('profileInfo');
  this.informacion_perfil=this.decrypt(this.informacion_perfil);
  this.informacion_perfil=JSON.parse(this.informacion_perfil);
  var datatonystraerformulariosdeusuario = {
    nombre_solicitud: 'tonystraerformulariosdeusuario',
    id: this.informacion_perfil.id
  }
   this.variosservicios.variasfunciones(datatonystraerformulariosdeusuario).subscribe(async( res: any ) =>{
     console.log('respuesta de tonystraerformulariosdeusuario', res);
     this.tonystraerformulariosdeusuario=res;
   });
}

  async obtenermovimientosconloading(){
  const actualizando = await this.loadingController.create({
    message: 'Actualizando...',spinner: 'bubbles',duration: 15000,
    });
    actualizando.present();
    this.informacion_perfil=localStorage.getItem('profileInfo');
    this.informacion_perfil=this.decrypt(this.informacion_perfil);
    this.informacion_perfil=JSON.parse(this.informacion_perfil);
    var datatonystraerformulariosdeusuario = {
      nombre_solicitud: 'tonystraerformulariosdeusuario',
      id: this.informacion_perfil.id
    }
     this.variosservicios.variasfunciones(datatonystraerformulariosdeusuario).subscribe(async( res: any ) =>{
       console.log('respuesta de tonystraerformulariosdeusuario', res);
       this.tonystraerformulariosdeusuario=res;
       actualizando.dismiss();
     });
}

ConRealTime(){
  
  setTimeout(() => 
  {
    if(this.variosservicios.activar_realtime_paqueteria==true){
      this.obtenermovimientos(); 
      this.ConRealTime();  //se repite
    } 
    },
      20000);
}


async agregarcompra() {
  const modal = await this.modalController.create({
    component: NuevacompraPage,
    initialBreakpoint: 1.2,
    breakpoints: [1, 1.5, 1]
  });
  modal.onDidDismiss().then((data) => {
      console.log('data',data);
      if(data.data.dismissed==true){
        this.obtenermovimientos();
      }
    });


  return await modal.present();
}


async VerImagen(ImgUrl) {
  const modal = await this.modalController.create({
    component: VisualizadorimagenesPage,
    componentProps: {
      'dataparaelmodal': ImgUrl
    },
    // initialBreakpoint: 1.2,
    // breakpoints: [1, 1.5, 1]
  });
  modal.onDidDismiss().then((data) => {
      console.log('data',data);
    });


  return await modal.present();
}

ionViewWillLeave(){
  this.variosservicios.activar_realtime_paqueteria=false;
}

//empieza nuevo codigo de mis compras:
segmentChanged(event: any) {
  console.log('Segment changed', event);
  this.ValorSegmento=event.target.value;
  if(this.ValorSegmento=="formularios"){
    this.step='1';
    this.obtenermovimientosconloading();
  }
}

  async VerFormulariousuario(){
  const actualizando = await this.loadingController.create({
    message: 'Vista de formularios en desarrollo...',spinner: 'bubbles',duration: 6000,
    });
    actualizando.present();
    this.variosservicios.presentToast("..::LLenar formularios en Desarrollo...::..");

}

async step2(cadaformulario){
  console.log('formulario seleccionado=',cadaformulario);
  this.formularioseleccionado=cadaformulario;
  const actualizando = await this.loadingController.create({
    message: 'Cargando información del formulario, porfavor espere...',spinner: 'bubbles',duration: 16000,
    });
    actualizando.present();
  var datatonysobtenerpreguntasdeformulario = {
  nombre_solicitud:'tonysobtenerpreguntasdeformulariousuarios',
  id:cadaformulario.detalles.id
  }
  this.variosservicios.variasfunciones(datatonysobtenerpreguntasdeformulario).subscribe(async( res: any ) =>{
  console.log('respuesta de tonysobtenerpreguntasdeformulario', res);
  if(res!=null){
    actualizando.dismiss();
    this.step='2';
    this.respuestadetonysobtenerpreguntasdeformulario=res
  }
  });


}

async step1(){
  this.step='1';
  this.formularioseleccionado=undefined;
}



}
