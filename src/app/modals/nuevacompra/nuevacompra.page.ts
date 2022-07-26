import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
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
  filebase64data: any = null;
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
  extension: any;
  seleccion = [];
  archivoaceptado:  boolean = false;
  typefile: any;
  arrayarchivoinfo= [];
  pesoarchivo:any;
  nombrearchivo:any;
  pesoaceptado:  boolean = true;
  constructor(
    private loadingController: LoadingController,
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
    console.log('event',event);
    const input = <File>event.target.files[0];
    var reader = new FileReader();
    reader.onload = (event: any) => {
      // this.filebase64data = event.target.result;
      this.filebase64data = reader.result;
      this.arrayarchivoinfo = this.filebase64data.split(',');
      console.log("this.arrayarchivoinfo",this.arrayarchivoinfo);
      // this.sendPhotos(input);
      console.log('Base64====',this.filebase64data);
      
    }

    reader.readAsDataURL(event.target.files[0]);
    console.log('file data:',event.target.files[0]);
    console.log('file type:',event.target.files[0].type);
    this.nombrearchivo = event.target.files[0].name;
    this.pesoarchivo = event.target.files[0].size;
    this.typefile = event.target.files[0].type;
    console.log('file name:',event.target.files[0].name);
    console.log('file extencion:',event.target.files[0].name.split('.').pop());
    this.extension = event.target.files[0].name.split('.').pop();
    if(
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
    
      this.archivoaceptado=true;
    }
    else {
      this.variosservicios.presentToast("..::Archivo No Admitido::..");
      this.archivoaceptado=false;
    }

  }
  

  decrypt(textToDecrypt : string){
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }


  async agregarcompra(){
    const actualizando = await this.loadingController.create({
      message: 'Subiendo archivo, porfavor espere...',spinner: 'bubbles',duration: 35000,
      });
    actualizando.present();
    console.log('base64 en JSON',this.filebase64data);
    var datatonysagregararchivonuevo = {
      nombre_solicitud: 'tonysagregararchivonuevo',
      usuarios: this.seleccion,
      filebase64data: this.filebase64data,
      extension: this.extension,
      type:this.typefile,
      pesoarchivo: this.pesoarchivo,
      nombrearchivo:this.nombrearchivo,
      observacion:this.observacion,
      recomendacion:this.origen,
      antesdelacoma: this.arrayarchivoinfo[0],
      despuesdelacoma: this.arrayarchivoinfo[1]
    }
    console.log('informacion de usuarios/archivo',datatonysagregararchivonuevo);


    this.variosservicios.variasfunciones(datatonysagregararchivonuevo).subscribe(async( res: any ) =>{
      console.log('respuesta de tonysagregararchivonuevo', res);
      actualizando.dismiss();
      this.dismissyactualiza();
      this.variosservicios.presentToast("..::Subido::..");
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
