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
  desbloquear_boton_enviar_formulario_cerrada:boolean=false;
  desbloquear_boton_enviar_formulario_abierta:boolean=false;
  today: any;
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
  this.desbloquear_boton_enviar_formulario_cerrada=false;
  this.desbloquear_boton_enviar_formulario_abierta=false
}


async seleccionarpreguntacerrada(opcion, i){
  this.respuestadetonysobtenerpreguntasdeformulario[i].respuestacerrada=opcion;
  this.respuestadetonysobtenerpreguntasdeformulario[i].respondida='si';
  // console.log('respuestadetonysobtenerpreguntasdeformulario=',this.respuestadetonysobtenerpreguntasdeformulario);
  // console.log('indice',i);
  // console.log('opcion',opcion);
}

async responderpreguntaabierta (event, i){
  this.respuestadetonysobtenerpreguntasdeformulario[i].respuestaabierta=event.target.value;
  this.respuestadetonysobtenerpreguntasdeformulario[i].respondida='si';
}

async ONCHANGECONTENTactivadordebotonenviar(){
  for (var i=0; i<this.respuestadetonysobtenerpreguntasdeformulario.length; i++) { 

      if(this.respuestadetonysobtenerpreguntasdeformulario[i].tipo=='cerrada'){
              this.respuestadetonysobtenerpreguntasdeformulario[i].respuestaabierta=null;
              if(
                  this.respuestadetonysobtenerpreguntasdeformulario[i].respuestacerrada=='a'||
                  this.respuestadetonysobtenerpreguntasdeformulario[i].respuestacerrada=='b'||
                  this.respuestadetonysobtenerpreguntasdeformulario[i].respuestacerrada=='c'||
                  this.respuestadetonysobtenerpreguntasdeformulario[i].respuestacerrada=='d'||
                  this.respuestadetonysobtenerpreguntasdeformulario[i].respuestacerrada=='e'||
                  this.respuestadetonysobtenerpreguntasdeformulario[i].respuestacerrada=='f'
          ){
            this.desbloquear_boton_enviar_formulario_cerrada=true;
            }
          else {
            this.desbloquear_boton_enviar_formulario_cerrada=false;
          }
      
    }

}


for (var j=0; j<this.respuestadetonysobtenerpreguntasdeformulario.length; j++) { 

  if(this.respuestadetonysobtenerpreguntasdeformulario[j].tipo=='abierta'){
      this.respuestadetonysobtenerpreguntasdeformulario[j].respuestacerrada=null;
      if(this.respuestadetonysobtenerpreguntasdeformulario[j].respuestaabierta==''||
      this.respuestadetonysobtenerpreguntasdeformulario[j].respuestaabierta==undefined||
      this.respuestadetonysobtenerpreguntasdeformulario[j].respuestaabierta==null
        ){
          this.desbloquear_boton_enviar_formulario_abierta=false;
      }
      else {
          this.desbloquear_boton_enviar_formulario_abierta=true;
      }
  }

}


// console.log('formulario completo', this.respuestadetonysobtenerpreguntasdeformulario);


}

async enviarformulario(){
  var strdedia = new Date();
  // this.today = Date.now();
  var datestring = strdedia.toString();

  const actualizando = await this.loadingController.create({
    message: 'Actualizando...',spinner: 'bubbles',duration: 15000,
    });
    actualizando.present();
    this.informacion_perfil=localStorage.getItem('profileInfo');
    this.informacion_perfil=this.decrypt(this.informacion_perfil);
    this.informacion_perfil=JSON.parse(this.informacion_perfil);
    var datatonysguardarrespuestadeformulario = {
      nombre_solicitud: 'tonysguardarrespuestadeformulario',
      id_usuario_que_respondio: this.informacion_perfil.id,
      respuestas: this.respuestadetonysobtenerpreguntasdeformulario
    }
     console.log('data a enviar',datatonysguardarrespuestadeformulario);
     this.variosservicios.variasfunciones(datatonysguardarrespuestadeformulario).subscribe(async( res: any ) =>{
       console.log('respuesta de tonysguardarrespuestadeformulario', res);
       actualizando.dismiss();

     const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Agregar Formulario:',
      inputs: [
        {
          name: 'email1',
          type: 'email',
          placeholder: 'Email 1',
        },
        {
          name: 'email2',
          type: 'email',
          placeholder: 'Email 2',

        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: async (alertData) => {
            console.log('Confirm Ok');
            console.log(alertData.email1);
            var datatonysenviaremail = {
              nombre_solicitud: 'tonysenviaremail',
              to: alertData.email1,
              id_publico:res[0].id_publico,
              datestring:datestring,
              nombre_usuario_que_respondio: this.informacion_perfil.name+' '+this.informacion_perfil.lastname,
            }
             console.log('data a enviar',datatonysenviaremail);
             this.variosservicios.variasfunciones(datatonysenviaremail).subscribe(async( res2: any ) =>{
               console.log('res2puesta de tonysenviaremail', res2);
                        //segundo email:
                        var datatonysenviaremail2 = {
                          nombre_solicitud: 'tonysenviaremail',
                          to: alertData.email2,
                          id_publico:res[0].id_publico,
                          datestring:datestring,
                          nombre_usuario_que_respondio: this.informacion_perfil.name+' '+this.informacion_perfil.lastname,
                        }
                         console.log('data a enviar',datatonysenviaremail2);
                         this.variosservicios.variasfunciones(datatonysenviaremail2).subscribe(async( res3: any ) =>{
                           console.log('respuesta de tonysenviaremail2', res3);
                               this.variosservicios.presentToast("..::Formulario Enviado a (2)Direcciones de correo::..");
                               this.step1();
                          //  actualizando.dismiss();
                         });
              //  actualizando.dismiss();
             });
          }
        }
      ]
    });

    await alert.present();



     });

    //  var datatonysenviaremail = {
    //   nombre_solicitud: 'tonysenviaremail',
    //   to: 'javier20450@gmail.com'
    // }
    //  console.log('data a enviar',datatonysenviaremail);
    //  this.variosservicios.variasfunciones(datatonysenviaremail).subscribe(async( res: any ) =>{
    //    console.log('respuesta de tonysenviaremail', res);
    //    actualizando.dismiss();
    //  });
    





  
}


}
