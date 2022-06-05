import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VariosService } from 'src/app/service/varios.service';
import * as CryptoJS from 'crypto-js';
import { ImageService } from '../../service/image.service';
import { Image } from './../../models/image.model';

@Component({
  selector: 'app-nuevacompra',
  templateUrl: './nuevacompra.page.html',
  styleUrls: ['./nuevacompra.page.scss'],
})
export class NuevacompraPage implements OnInit {

  metodoindex: any;
  direccion: any;
  secretKey = "123456&Descryption";
  informacion_perfil: any;
  admindirecciones: any;
  montoenweras:any;
  montoendolares:any;
  infovariable:any;
  mostrarinformaciondepago: boolean = false;
  imageProfile: any = null;
  new_url_image: any = null;
  montopasadoaweras: any = null;
  precio_wera_usd: any;
  filterTerm: string;
  respuestaobtenerusuariosbusqueda: any;
  mostrarleusuarios:  boolean = false;
  selected_user: any;
  indexdeusuario: any;
  traking: any;
  peso: any;
  origen: any;
  mostrarcampopuntos:  boolean = false;
  puntos:any;
  observacion:any;
  seleccion = [];
  archivoaceptado:  boolean = false;
  archivosubido:  boolean = false;

  constructor(
    private imageService: ImageService,
    private varios: VariosService,
    private modalController: ModalController,
    private variosservicios: VariosService,

  ) 
  {
    // this.obtenerprecio_wera_usdsegunfase(); 
   }

  ngOnInit() {
    this.obtenerAdminDirecciones();
    // this.obtenerprecio_wera_usdsegunfase();
    this.ObtenerUsariosNormales();
  }

  // obtenerprecio_wera_usdsegunfase(){
  //   var datatonysobtenerprecio_wera_usd = {
  //     nombre_solicitud: 'tonysobtenerprecio_wera_usd'
  //   }
  //   this.variosservicios.variasfunciones(datatonysobtenerprecio_wera_usd).subscribe(async( res: any ) =>{
  //     console.log('respuesta de tonysobtenerprecio_wera_usd', res);
  //     this.precio_wera_usd=res;
  // });
  // }

  ObtenerUsariosNormales(){
    var dataobtenerusuariosbusqueda = {
      nombre_solicitud: 'tonysobtenerusuariosbusqueda'
    }
    this.variosservicios.variasfunciones(dataobtenerusuariosbusqueda).subscribe(async( res: any ) =>{
      console.log('respuesta de obtenerusuariosbusqueda', res);
      this.respuestaobtenerusuariosbusqueda=res;
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
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': false
    });
  }


  obtenerAdminDirecciones(){
      var datatonysobteneradmindirecciones = {
        nombre_solicitud: 'tonysobteneradmindirecciones'
      }
      this.variosservicios.variasfunciones(datatonysobteneradmindirecciones).subscribe(async( res: any ) =>{
        console.log('respuesta de tonysobteneradmindirecciones', res);
        this.admindirecciones=res;
    });
  }

  ONCHANGEmetodo(event){
    this.infovariable = this.admindirecciones[event.target.value];
    console.log('infovarible', this.infovariable);
    this.mostrarinformaciondepago=false;

  }

  
    async IONFOCUSmontoenweras(){
      this.montoendolares=null;
    }

    async IONFOCUSmontoendolares(){
     this.montoenweras=null;
    }

  
  MostrarInfo(){
    this.mostrarinformaciondepago=true;
  }

  NoMostrarInfo(){
    this.mostrarinformaciondepago=false;
  }



  async takePicture(event: any){
    const input = <File>event.target.files[0];
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageProfile = event.target.result;
      // this.sendPhotos(input);
      console.log('Base64',this.imageProfile);
    }
    reader.readAsDataURL(event.target.files[0]);
    console.log('file data:',event.target.files[0]);
    console.log('file name:',event.target.files[0].name);
    console.log('file extencion:',event.target.files[0].name.split('.').pop());
    if(event.target.files[0].name.split('.').pop()=='txt'||
    event.target.files[0].name.split('.').pop()=='text'||
    event.target.files[0].name.split('.').pop()=='pptx'||
    event.target.files[0].name.split('.').pop()=='ppt'||
    event.target.files[0].name.split('.').pop()=='pdf'||
    event.target.files[0].name.split('.').pop()=='doc'||
    event.target.files[0].name.split('.').pop()=='docx'||
    event.target.files[0].name.split('.').pop()=='xls'||
    event.target.files[0].name.split('.').pop()=='xlsx'
    )
    {
      this.variosservicios.presentToast("..::Aceptado::..");

      // URGENTE PORFAVOR! archivo aceptado true luego de la respuesta del server
      // extension del archivo compatible, se procedera a subir al servidor

      
      this.archivoaceptado=true;

      // this.variosservicios.presentToast("..::Subido::..");
      this.archivosubido=true;

    }
    else {
      this.variosservicios.presentToast("..::Archivo No Admitido::..");
      this.archivoaceptado=false;
    }

  }
  
  // sendPhotos(file){
  //   this.imageService.generateUrl(file).subscribe(x => {
  //     let imagentemporal = new Image();
  //     imagentemporal.urlImage = x.data.url;
  //     this.new_url_image=imagentemporal.urlImage;
  //     console.log('this.new_url_image',this.new_url_image);
  //   }); 
  //}

  decrypt(textToDecrypt : string){
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }


  agregarcompra(){
    this.informacion_perfil=localStorage.getItem('profileInfo');
    this.informacion_perfil=this.decrypt(this.informacion_perfil);
    this.informacion_perfil=JSON.parse(this.informacion_perfil);
    




      if(this.mostrarcampopuntos){  }
      else { this.puntos=0;  }

      var dataagregarmovimiento = {
        id_tipo_movimiento: '1',
        nombre_solicitud: 'tonyscrearmovimiento',
        id_user: this.selected_user.id,
        traking: this.traking,
        peso:this.peso,
        origen:this.origen,
        mas_o_menos:'mas',
        monto:this.puntos,
        reciboImgUrl: this.new_url_image,
        observacion: this.observacion
      }
    

    console.log('data a guardar', dataagregarmovimiento);

    this.variosservicios.variasfunciones(dataagregarmovimiento).subscribe(async( res: any ) =>{
      console.log('respuesta de tonyscrearmovimiento', res);
      this.dismissyactualiza();
      });


  }
  
  mostrarleusuariosverdadero(){
    this.mostrarleusuarios=true;
  }
  mostrarleusuariosfalso(){
      setTimeout(() => 
      {
        this.mostrarleusuarios=false;
      },
      150);
}
  

  esteusuario(usuario, index){
    console.log('Usuario',usuario);
    // this.indexdeusuario= i;
    this.selected_user=usuario;

    this.respuestaobtenerusuariosbusqueda.splice(index, 1);
    this.seleccion[this.seleccion.length]=usuario;
    console.log('seleccion',this.seleccion);
  }

  borrarSelectedUserDeSeleccion(usuario, index){
    this.seleccion.splice(index, 1);
    this.respuestaobtenerusuariosbusqueda[this.respuestaobtenerusuariosbusqueda.length]=usuario;

  }

  
}
