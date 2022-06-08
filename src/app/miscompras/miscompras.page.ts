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

@Component({
  selector: 'app-miscompras',
  templateUrl: './miscompras.page.html',
  styleUrls: ['./miscompras.page.scss'],
})
export class MiscomprasPage {

  secretKey = "123456&Descryption";
  verificarloginemail: any;
  menuderechosuperior:boolean=false;
  countryData: { id: number; name: string; }[];
  informacion_perfil: any;
  step:any;
  languages_active: any;
  movimientos: any;
  ValorSegmento: any ='archivos';

  constructor(
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
  var datatonysobtenermovimientos = {
    nombre_solicitud: 'tonysobtenermovimientos',
    id_user: this.informacion_perfil.id
  }
   this.variosservicios.variasfunciones(datatonysobtenermovimientos).subscribe(async( res: any ) =>{
     console.log('respuesta de tonysobtenermovimientos', res);
     this.movimientos=res;
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
      15000);
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
    initialBreakpoint: 1.2,
    breakpoints: [1, 1.5, 1]
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
}


}
