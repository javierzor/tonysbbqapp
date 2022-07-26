import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {Router} from '@angular/router';
import { MenuController } from '@ionic/angular';
import { VariosService } from '../service/varios.service';
import { ImageService } from '../service/image.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Image } from './../models/image.model';
import { PaisesService } from '../service/paises.service';

declare var google;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {
  secretKey = "123456&Descryption";
  verificarloginemail: any;
  menuderechosuperior:boolean=false;
  imageProfile: any = null;
  public registerUserForm: FormGroup;
  formErrors = {
    'name': '',
    'lastName': '',
    'phone': '',
    'genderId': '',
    'countryId': '', 
    'address': '', 
    'birthDate': '',
    'lenguages1': '',
    'description': ''
  };
  tieneperfil: any;
  generos: any;
  // paises: any;
  crear_nombre: any;
  crear_apellido: any;
  crear_sexo: any;
  crear_pais: any;
  crear_nacimiento: any;
  uid: string;
  crear_id_imagen: any;
  logincon: any;
  loginvalor: any;
  inputparaescribirnumero: any;
  crear_celular: any;
  infoperfiltoview: any;
  languages: any;
  countryData: { id: number; name: string; }[];
  informacion_perfil: any;
  idPaisSeleccionado:any;
  new_url_image: any = null;
  ahora_selecciono_otra_foto: boolean=false;

  constructor(
    private variosservicios: VariosService,
    public varios: VariosService,
    private router: Router,
    private menu: MenuController,
    private imageService: ImageService,
    private builder: FormBuilder,
    private paises: PaisesService,

  ) 
  {
    this.countryData=this.paises.countryData;    
    this.registerUserForm = this.builder.group({
      name: null,
      lastName: null,
      genderId: null,
      countryId: null,
      description: null,
      paisnombre: null,
      profile_url_img: null,
      nuevopassword: null,
      uid: null
    });
    this.ObtenerProfileInfo();
  }
  ionViewWillEnter(){
    this.menu.enable(true);
    this.ObtenerProfileInfo();
  }
  async ngOnInit() {
    this.ObtenerProfileInfo();
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
//Termina menu superior y sus ONCHANGE

ONCHANGEpais(event){
  console.log('valor del change',event.target.value);
  console.log('id pais',this.idPaisSeleccionado);
}


async takePicture(event: any){
  this.ahora_selecciono_otra_foto = true;
  const input = <File>event.target.files[0];
  var reader = new FileReader();

  reader.onload = (event: any) => {
    this.imageProfile = event.target.result;
    this.sendPhotos(input);
  }
  
  reader.readAsDataURL(event.target.files[0]); 
}

sendPhotos(file){
  this.imageService.generateUrl(file).subscribe(x => {
    let imagentemporal = new Image();
    imagentemporal.urlImage = x.data.url;
    this.new_url_image=imagentemporal.urlImage;
    console.log('this.new_url_image',this.new_url_image);
  }); 
}

actualziarperfil(){

  if(this.informacion_perfil.nuevopassword){

  }

  if(this.registerUserForm.value.genderId==1){
    this.registerUserForm.value.genderId='Masculino';
  }

  else{
   if(this.registerUserForm.value.genderId==2){
      this.registerUserForm.value.genderId='Femenino';
    }
  }
  if(this.registerUserForm.value.countryId){
  this.registerUserForm.value.paisnombre=this.paises.countryData[parseInt(this.registerUserForm.value.countryId)-1].name;
}
  this.registerUserForm.value.uid=this.informacion_perfil.id;
  this.registerUserForm.value.profile_url_img=this.new_url_image;
  this.registerUserForm.value.nombre_solicitud='tonysupdateuser';
  console.log('actualziar perfil CON:', this.registerUserForm.value);
  this.variosservicios.variasfunciones(this.registerUserForm.value).subscribe(async( res: any ) =>{
    console.log(' respuesta tonysupdateuser ',res);
    localStorage.setItem('profileInfo', this.encrypt(JSON.stringify(res)));
    this.ObtenerProfileInfo();
    this.variosservicios.presentToast("Perfil actualizado exitosamente.");
    });

}

encrypt(value : string) : string{
  return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
}

decrypt(textToDecrypt : string){
  return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
}


}