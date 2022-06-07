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

@Component({
  selector: 'app-direccionderetiro',
  templateUrl: './direccionderetiro.page.html',
  styleUrls: ['./direccionderetiro.page.scss'],
})
export class DireccionderetiroPage {

  secretKey = "123456&Descryption";
  verificarloginemail: any;
  menuderechosuperior:boolean=false;
  countryData: { id: number; name: string; }[];
  informacion_perfil: any;
  step:any;
  languages_active: any;
  direccionderetiro: any;
  ya_paso_1_segundo: boolean=false;

  constructor(
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private variosservicios: VariosService,
    public varios: VariosService,
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
    this.obtenerdirecciones();
  }
  async ngOnInit() {
    this.ObtenerProfileInfo();
    this.step='1';
    this.mostrardireccionTRAS1segundo();
  }

  obtenerdirecciones(){
    var datatonysobtenerdireccionderetiro = {
      nombre_solicitud: 'tonysobtenerdireccionderetiro',
    }
     this.variosservicios.variasfunciones(datatonysobtenerdireccionderetiro).subscribe(async( res: any ) =>{
       console.log('respuesta de tonysobtenerdireccionderetiro', res);
       this.direccionderetiro=res;
     });
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

mostrardireccionTRAS1segundo(){
  setTimeout(() => 
  {
    this.ya_paso_1_segundo=true;
  },
  1500);
}


async presentModal() {
      this.variosservicios.presentToast("Actualmente solo podra retirar su paqueteria en nuestra oficina central");

  // const modal = await this.modalController.create({
  //   component: DireccionnuevaPage,
  //   initialBreakpoint: 0.8,
  //   breakpoints: [0, 0.8, 3]
  // });
  // modal.onDidDismiss().then((data) => {
  //     console.log('data',data);
  //     if(data.data.dismissed==true){
  //       this.obtenerdirecciones();
  //     }
  //   });


  // return await modal.present();
}




}
