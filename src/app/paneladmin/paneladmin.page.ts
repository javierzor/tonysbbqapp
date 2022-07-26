import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {Router} from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { VariosService } from '../service/varios.service';
import { ToastController, LoadingController } from "@ionic/angular";
import { VisualizadorimagenesPage } from '../modals/visualizadorimagenes/visualizadorimagenes.page';
import { ModalController } from '@ionic/angular';
import { NuevafasePage } from '../modals/nuevafase/nuevafase.page';
import { NuevacompraPage } from '../modals/nuevacompra/nuevacompra.page';
import { ActualizardireccionPage } from '../modals/actualizardireccion/actualizardireccion.page';
import { DatePipe } from '@angular/common'
import { ActualizarretirooficinaPage } from '../modals/actualizarretirooficina/actualizarretirooficina.page';
import { VerconversacionPage } from '../modals/verconversacion/verconversacion.page';
import { AdminverconversacionPage } from '../modals/adminverconversacion/adminverconversacion.page';
import { UsuariosdearchivoPage } from '../modals/usuariosdearchivo/usuariosdearchivo.page';
import { DireccionnuevaPage } from '../modals/direccionnueva/direccionnueva.page';
import { UsuariosdeformularioPage } from '../modals/usuariosdeformulario/usuariosdeformulario.page';


@Component({
  selector: 'app-paneladmin',
  templateUrl: './paneladmin.page.html',
  styleUrls: ['./paneladmin.page.scss'],
})



export class PaneladminPage implements OnInit {
  segmentModel: any;
  secretKey = "123456&Descryption";
  verificarloginemail: any;
  menuderechosuperior:boolean=false;
  imageProfile: any = null;
  informacion_perfil: any;
  respuestadetonysadminobtenermovimientos: any;
  respuestadetonysadminobtenerlistadeuduarios: any;
  ModalAggFaseAbierto: boolean=false;
  respuestatonysanuncios: any;
  tonysobteneadminrformularios: any;
  cambiarestado_a: any;
  fecha_inicio: string;
  fecha_fin: string;
  estado: any;
  reportederegistros: any;
  cambioelselector: boolean=false;
  listasdechat: any;
  verarchivo: boolean=false;
  desactivar_agregar: boolean=false;
  desactivar_verusuariosdearchivo: boolean=false;
  nombreformulario: any;
  editorformulario: any;
  constructor(
    private datepipe : DatePipe,
    private alertController: AlertController,
    private variosservicios: VariosService,
    private modalController: ModalController,
    public varios: VariosService,
    private router: Router,
    private menu: MenuController,
    private loadingController: LoadingController,
  )
   {
    // this.progress=0;
   }
  ionViewWillEnter(){
    this.menu.enable(true);
    this.ObtenerProfileInfo();
    this.variosservicios.activar_realtime_admin_conversaciones=true;
  }
  async ngOnInit() {
    this.segmentModel=null;
    this.ObtenerProfileInfo();
    this.ModalAggFaseAbierto=false;

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

  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
    window.location.reload();
  }

  decrypt(textToDecrypt : string){
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }

  //terminan las funciones del menu superior derecho

  async segmentChanged(){

    const actualizando = await this.loadingController.create({
    message: 'Actualizando...',spinner: 'bubbles',duration: 15000,
    });
    console.log(this.segmentModel);
    if(this.segmentModel!='chatdesoporte'){
      actualizando.present();
      this.varios.activar_realtime_admin_conversaciones=false;
    }
    
if(this.segmentModel=='solicitudesdecompras'){
  var datatonysadminobtenermovimientos = {
    nombre_solicitud: 'tonysadminobtenermovimientos',
    id_user: this.informacion_perfil.id
  }
   this.variosservicios.variasfunciones(datatonysadminobtenermovimientos).subscribe(async( res: any ) =>{
     console.log('respuesta de tonysadminobtenermovimientos', res);
     this.respuestadetonysadminobtenermovimientos=res;
     actualizando.dismiss();
   });
}


if(this.segmentModel=='activardesacusuario'){
  var datatonysadminobtenerlistadeuduarios = {
    nombre_solicitud: 'tonysadminobtenerlistadeuduarios'
  }
   this.variosservicios.variasfunciones(datatonysadminobtenerlistadeuduarios).subscribe(async( res: any ) =>{
     console.log('respuesta de tonysadminobtenerlistadeuduarios', res);
     this.respuestadetonysadminobtenerlistadeuduarios=res;
     actualizando.dismiss();
   });
}

if(this.segmentModel=='veraumentarfase'){
  var datatonysanuncios = {
    nombre_solicitud: 'tonysanuncios'
  }
   this.variosservicios.variasfunciones(datatonysanuncios).subscribe(async( res: any ) =>{
     console.log('respuesta de tonysanuncios', res);
     this.respuestatonysanuncios=res;
     actualizando.dismiss();
   });
}

if(this.segmentModel=='direcciones'){
  var datatonysobteneadminrformularios = {
    nombre_solicitud: 'tonysobteneadminrformularios',
    id_user: this.informacion_perfil.id
  }
   this.variosservicios.variasfunciones(datatonysobteneadminrformularios).subscribe(async( res: any ) =>{
     console.log('respuesta de tonysobteneadminrformularios', res);
     this.tonysobteneadminrformularios=res;
     actualizando.dismiss();
   });
}

if(this.segmentModel=='reportes'){
   actualizando.dismiss();
}

if(this.segmentModel=='chatdesoporte'){
  actualizando.dismiss();
  this.varios.activar_realtime_admin_conversaciones=true;
  if(this.varios.activar_realtime_admin_conversaciones==true&&this.varios.activar_real_time_modal_ver_conversacion_chat==false){
    
    setTimeout(()=>{ 
          this.FuncionObtenerlistasdechat();
          // this.segmentModel='chatdesoporte';
          this.segmentChanged();
          },8000);
      }
}


}

FuncionObtenerlistasdechat(){
  var datatonysobteneradminconversaciones = {
    nombre_solicitud: 'tonysobteneradminconversaciones'
  }
   this.variosservicios.variasfunciones(datatonysobteneradminconversaciones).subscribe(async( res: any ) =>{
     console.log('respuesta de tonysobteneradminconversaciones', res);
     this.listasdechat=res;
   });
}

async leermensajes(ticket) {
  const modal = await this.modalController.create({
    component: AdminverconversacionPage,
    componentProps: { 
      dataparaelmodal:ticket
    }
    });
  modal.onDidDismiss().then((data) => {
      console.log('data',data);
      console.log('data',data);
      this.varios.activar_realtime_admin_conversaciones=true;
      this.varios.activar_real_time_modal_ver_conversacion_chat=false;
      this.segmentModel='chatdesoporte';
      this.segmentChanged();
      
    });


  return await modal.present();
}



suspender(){
  
}

verificar(){
  
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


    verificarmovimiento(movimiento){
      var datatonysverificarunmovimiento = {
        nombre_solicitud: 'tonysverificarunmovimiento',
        tipo_cuenta:this.varios.tipo_cuenta,
        id_movimiento: movimiento.id
      }
       this.variosservicios.variasfunciones(datatonysverificarunmovimiento).subscribe(async( res: any ) =>{
         console.log('respuesta de tonysverificarunmovimiento', res);
         if(res>0){
          this.segmentModel='solicitudesdecompras';
          this.segmentChanged();
         }
         else {
          this.variosservicios.presentToast("..::Error, debe reingresar seccion, (recomprobacion admin)::..");

        }
        });
    }


    suspendermovimiento(movimiento){
      var datatonyssuspenderunmovimiento = {
        nombre_solicitud: 'tonyssuspenderunmovimiento',
        tipo_cuenta:this.varios.tipo_cuenta,
        id_movimiento: movimiento.id
      }
       this.variosservicios.variasfunciones(datatonyssuspenderunmovimiento).subscribe(async( res: any ) =>{
         console.log('respuesta de tonyssuspenderunmovimiento', res);
         if(res>0){
          this.segmentModel='solicitudesdecompras';
          this.segmentChanged();
         }
         else {
          this.variosservicios.presentToast("..::Error, debe reingresar seccion, (recomprobacion admin)::..");

        }
        });
    }

    suspenderusuario(usuario){
      var datatonyssuspenderusuario = {
        nombre_solicitud: 'tonyssuspenderusuario',
        tipo_cuenta:this.varios.tipo_cuenta,
        id_usuario: usuario.id
      }
       this.variosservicios.variasfunciones(datatonyssuspenderusuario).subscribe(async( res: any ) =>{
         console.log('respuesta de tonyssuspenderusuario', res);
         if(res>0){
          this.segmentModel='activardesacusuario';
          this.segmentChanged();
         }
         else {
          this.variosservicios.presentToast("..::Error, debe reingresar seccion, (recomprobacion admin)::..");

        }
        });
    }

    activarusuario(usuario){
      var datatonysverificarusuario = {
        nombre_solicitud: 'tonysverificarusuario',
        tipo_cuenta:this.varios.tipo_cuenta,
        id_usuario: usuario.id
      }
       this.variosservicios.variasfunciones(datatonysverificarusuario).subscribe(async( res: any ) =>{
         console.log('respuesta de tonysverificarusuario', res);
         if(res>0){
          this.segmentModel='activardesacusuario';
          this.segmentChanged();
         }
         else {
          this.variosservicios.presentToast("..::Error, debe reingresar seccion, (recomprobacion admin)::..");

        }
        });
    }
    
    async borraranuncios(cadaanuncio){
      var datatonysborraranuncio = {
        nombre_solicitud: 'tonysborraranuncio',
        id:cadaanuncio.id
      }
       this.variosservicios.variasfunciones(datatonysborraranuncio).subscribe(async( res: any ) =>{
         console.log('respuesta de tonysborraranuncio', res);
         if(res){
            this.segmentModel='veraumentarfase';
            this.segmentChanged();
         }
         });
    }


    async borrarformulario(cadaanuncio){
      this.variosservicios.presentToast("Porfavor espere...");
      var datatonysborraranuncio = {
        nombre_solicitud: 'tonysborrarformularios',
        id:cadaanuncio.id
      }
       this.variosservicios.variasfunciones(datatonysborraranuncio).subscribe(async( res: any ) =>{
         console.log('respuesta de tonysborraranuncio', res);
         if(res){
            this.segmentModel='direcciones';
            this.segmentChanged();
         }
         });
    }


    async borrararhivos(movimiento){
      this.variosservicios.presentToast("Porfavor espere...");
      var datatonysborraranuncio = {
        nombre_solicitud: 'tonysborrararchivos',
        id:movimiento.id
      }
       this.variosservicios.variasfunciones(datatonysborraranuncio).subscribe(async( res: any ) =>{
         console.log('respuesta de tonysborraranuncio', res);
         if(res){
            this.segmentModel='solicitudesdecompras';
            this.segmentChanged();
         }
         });
    }

    async borrarusuarios(cadausuario){
      this.variosservicios.presentToast("Porfavor espere...");
      var datatonysborraranuncio = {
        nombre_solicitud: 'tonysborrarusuario',
        id:cadausuario.id
      }
       this.variosservicios.variasfunciones(datatonysborraranuncio).subscribe(async( res: any ) =>{
         console.log('respuesta de tonysborraranuncio', res);
         if(res){
            this.segmentModel='activardesacusuario';
            this.segmentChanged();
         }
         });
    }


    

    


    async AdminagregarFase(){

      
      const modal = await this.modalController.create({
        component: NuevafasePage,
        initialBreakpoint: 0.8,
        breakpoints: [0, 0.8, 3]
      });
      this.ModalAggFaseAbierto=true;
      modal.onDidDismiss().then((data) => {
          this.ModalAggFaseAbierto=false;
          console.log('data',data);
          if(data.data.dismissed==true){
            this.segmentModel='veraumentarfase';
            this.segmentChanged();
          }
        });
      return await modal.present();
    }

    async agregarcompra() {
      this.desactivar_agregar=true;
      const modal = await this.modalController.create({
        component: NuevacompraPage,
        initialBreakpoint: 1.2,
        breakpoints: [1, 1.5, 1]
      });
      modal.onDidDismiss().then((data) => {
          console.log('data',data);
          this.desactivar_agregar=false;
          if(data.data.dismissed==true){
            this.segmentModel='solicitudesdecompras';
            this.segmentChanged();
          }
        });
    
    
      return await modal.present();
    }

    async Verusuariosdearchivo(id, nombre){
      this.desactivar_verusuariosdearchivo=true;
      const modal = await this.modalController.create({
        component: UsuariosdearchivoPage,
        componentProps: { 
          id:id,
          nombre:nombre
        },
      });
      modal.onDidDismiss().then((data) => {
          console.log('data',data);
          this.desactivar_verusuariosdearchivo=false;
          if(data.data.dismissed==true){
            this.segmentModel='solicitudesdecompras';
            
            // NO ES NECESARIO ACTUALIZAR PORQUE NOMAS SE LE ASIGNO USUARIOS
            // POR ESO HE DESACTIVADO this.segmentChanged();
            // this.segmentChanged();
          }
        });
    
    
      return await modal.present();

    }

    async Verusuariosdeformulario(id, nombre){
      this.desactivar_verusuariosdearchivo=true;
      const modal = await this.modalController.create({
        component: UsuariosdeformularioPage,
        componentProps: { 
          id:id,
          nombre:nombre
        },
      });
      modal.onDidDismiss().then((data) => {
          console.log('data',data);
          this.desactivar_verusuariosdearchivo=false;
          if(data.data.dismissed==true){
            this.segmentModel='solicitudesdecompras';
            
            // NO ES NECESARIO ACTUALIZAR PORQUE NOMAS SE LE ASIGNO USUARIOS
            // POR ESO HE DESACTIVADO this.segmentChanged();
            // this.segmentChanged();
          }
        });
    
    
      return await modal.present();

    }




    async agregarformulario(tipo, cadaformulario) {

      if(tipo=='agregar'){

          const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Agregar Formulario:',
            inputs: [
              {
                name: 'nombreformulario',
                type: 'text',
                placeholder: 'Nombre del formulario',
                value: this.nombreformulario
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
                  console.log(alertData.nombreformulario);

                  var datatonyscrearformulario = {
                    nombre_solicitud: 'tonyscrearformulario',
                    nombre:alertData.nombreformulario
                  }
                   this.variosservicios.variasfunciones(datatonyscrearformulario).subscribe(async( res: any ) =>{
                     console.log('respuesta de tonyscrearformulario', res);
                     if(res.nombre==alertData.nombreformulario){
                         this.variosservicios.presentToast("..::Formulario creado exitosamente::..");
                          const modal = await this.modalController.create({
                            component: DireccionnuevaPage,
                            componentProps: { 
                              cadaformulario:cadaformulario
                            },
                          });
                          modal.onDidDismiss().then((data) => {
                              console.log('data',data);
                              if(data.data.dismissed==true){
                                this.segmentModel='direcciones';
                                this.segmentChanged();
                              }
                            });
                            return await modal.present();
                          }
                     });

                }
              }
            ]
          });
      
          await alert.present();
      }

      if(tipo=='actualizar'){

        const modal = await this.modalController.create({
          component: DireccionnuevaPage,
          componentProps: { 
            cadaformulario:cadaformulario
          },
        });
        modal.onDidDismiss().then((data) => {
            console.log('data',data);
            if(data.data.dismissed==true){
              this.segmentModel='direcciones';
              this.segmentChanged();
            }
          });
          return await modal.present();
      }


    
    
    }



    consultarReporte(){
      var datatonysconsultarreporte = {
        nombre_solicitud:'tonysconsultarreporte',
        fecha_inicio: this.datepipe.transform(this.fecha_inicio, 'yyyyMMdd'),
        fecha_fin: this.datepipe.transform(this.fecha_fin, 'yyyyMMdd'),
        status:this.estado
      }
      this.variosservicios.variasfunciones(datatonysconsultarreporte).subscribe(async( res: any ) =>{
        console.log('respuesta de tonysconsultarreporte', res);
        this.cambioelselector=false;
        this.reportederegistros=res;
        });
    }

    IONCHANGEselector(){
      this.cambioelselector=true;
      console.log('cambioelselector',this.cambioelselector);
    }

    async abrireditardireccionderetiro(){
      const modal = await this.modalController.create({
        component: ActualizarretirooficinaPage,
        componentProps: { 
        },
      });
      modal.onDidDismiss().then((data) => {
          console.log('data',data);
          if(data.data.dismissed==true){
            this.variosservicios.presentToast("Dirección actualizada");
          }
        });
    
    
      return await modal.present();
    }


    ionViewWillLeave(){
      this.variosservicios.activar_realtime_user_conversaciones=false;
    }


}
