import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VariosService } from 'src/app/service/varios.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-direccionnueva',
  templateUrl: './direccionnueva.page.html',
  styleUrls: ['./direccionnueva.page.scss'],
})
export class DireccionnuevaPage implements OnInit {
  tipo_pregunta: any;
  direccion: any;
  secretKey = "123456&Descryption";
  informacion_perfil: any;
  direccionesderetiro: any;
  cadaformulario;
  step: any = '1';
  respuestadetonysobtenerpreguntasdeformulario: any;
  anular_pregunta_a: boolean=false;
  anular_pregunta_b: boolean=false;
  anular_pregunta_c: boolean=false;
  anular_pregunta_d: boolean=false;
  anular_pregunta_e: boolean=false;
  anular_pregunta_f: boolean=false;
  a: any;
  b: any;
  c: any;
  d: any;
  e: any;
  f: any;
  respuestatonysagregarpreguntadeformulario: any;

  constructor(
    private varios: VariosService,
    private modalController: ModalController,
    private variosservicios: VariosService,

  ) { }

  ngOnInit() {
    // this.FuncionTonysobtenerpreguntasdeformulario();
  }

  ionViewWillEnter(){
    this.FuncionTonysobtenerpreguntasdeformulario();

  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': false
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

  FuncionTonysobtenerpreguntasdeformulario(){

    var datatonysobtenerpreguntasdeformulario = {
      nombre_solicitud:'tonysobtenerpreguntasdeformulario',
      id:this.cadaformulario.id
    }
    this.variosservicios.variasfunciones(datatonysobtenerpreguntasdeformulario).subscribe(async( res: any ) =>{
      console.log('respuesta de tonysobtenerpreguntasdeformulario', res);
      this.respuestadetonysobtenerpreguntasdeformulario=res
      });

  }

  agregardireccion(){



  }

  decrypt(textToDecrypt : string){
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }

  step1(){
    this.step='1';
    this.FuncionTonysobtenerpreguntasdeformulario();
  }

  step2(){
    this.step='2';
  }

  desactivaranular_pregunta_a(){ this.anular_pregunta_a=false}
  desactivaranular_pregunta_b(){ this.anular_pregunta_b=false}
  desactivaranular_pregunta_c(){ this.anular_pregunta_c=false}
  desactivaranular_pregunta_d(){ this.anular_pregunta_d=false}
  desactivaranular_pregunta_e(){ this.anular_pregunta_e=false}
  desactivaranular_pregunta_f(){ this.anular_pregunta_f=false}

  activaranular_pregunta_a(){ this.anular_pregunta_a=true}
  activaranular_pregunta_b(){ this.anular_pregunta_b=true}
  activaranular_pregunta_c(){ this.anular_pregunta_c=true}
  activaranular_pregunta_d(){ this.anular_pregunta_d=true}
  activaranular_pregunta_e(){ this.anular_pregunta_e=true}
  activaranular_pregunta_f(){ this.anular_pregunta_f=true}

  agregarpregunta(){
    if(this.anular_pregunta_a==true){this.a=null}
    if(this.anular_pregunta_b==true){this.b=null}
    if(this.anular_pregunta_c==true){this.c=null}
    if(this.anular_pregunta_d==true){this.d=null}
    if(this.anular_pregunta_e==true){this.e=null}
    if(this.anular_pregunta_f==true){this.f=null}
    if(this.tipo_pregunta=='abierta'){ this.a=null;this.b=null;this.c=null;this.d=null;this.e=null;this.f=null;}

    var datatonysagregarpreguntadeformulario = {
      nombre_solicitud: 'tonysagregarpreguntadeformulario',
      id_formulario: this.cadaformulario.id,
      tipo_pregunta: this.tipo_pregunta,
      pregunta:this.direccion,
      a:this.a,
      b:this.b,
      c:this.c,
      d:this.d,
      e:this.e,
      f:this.f
    }
    console.log('data de pregunta a guardar', datatonysagregarpreguntadeformulario);

     this.variosservicios.variasfunciones(datatonysagregarpreguntadeformulario).subscribe(async( res: any ) =>{
       console.log('respuesta de tonysagregarpreguntadeformulario', res);
       if(res.id&&res.id>0){
         this.FuncionTonysobtenerpreguntasdeformulario();
         this.step='1';
       }
     });


  }

  borrarpregunta(cadapregunta){
    console.log('id de la pregunta a borrar', cadapregunta.id);

    var datatonysobtenerpreguntasdeformularioborrarla = {
      nombre_solicitud:'tonysobtenerpreguntasdeformularioborrarla',
      id:cadapregunta.id
    }
    this.variosservicios.variasfunciones(datatonysobtenerpreguntasdeformularioborrarla).subscribe(async( res: any ) =>{
      console.log('respuesta de tonysobtenerpreguntasdeformularioborrarla', res);
      this.FuncionTonysobtenerpreguntasdeformulario();
      });

    
  }
  

}
