import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { VariosService } from 'src/app/service/varios.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-usuariosdeformulario',
  templateUrl: './usuariosdeformulario.page.html',
  styleUrls: ['./usuariosdeformulario.page.scss'],
})
export class UsuariosdeformularioPage implements OnInit {

  id;
  nombre;
  step: string = '1';
  respuestadetonysverusuariosdeformulario: any;
  mostrarleusuarios:  boolean = false;
  filterTerm: string;
  selected_user: any;
  respuestaobtenerusuariosbusqueda: any;
  seleccion = [];

  constructor(
    private loadingController: LoadingController,
    private varios: VariosService,
    private modalController: ModalController,
    private variosservicios: VariosService,
  ) 
  
  {
    this.VerUsuariosDeformularioFuction();
    this.traidopormodalparamsFuction();
  }

  ngOnInit() {
    this.ObtenerUsariosNormales();
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

  traidopormodalparamsFuction(){
    // this.traidopormodalparams=navParams.get('dataparaelmodal');
    console.log('recibido por modalparams 1', this.id);
    console.log('recibido por modalparams 2', this.nombre);

    // ya no es necesario sanatizar porque se a instalado el plugin BUENO npms de visualizador
    // this.doc = this.sanitizer.bypassSecurityTrustResourceUrl('https://docs.google.com/gview?url='+this.dataparaelmodal+'&embedded=true');        
    
  }

  async VerUsuariosDeformularioFuction(){
    const actualizando = await this.loadingController.create({
      message: 'Consultando usuarios...',spinner: 'bubbles',duration: 15000,
      });
      actualizando.present();
    var datatonysverusuariosdeformulario = {
      nombre_solicitud: 'tonysverusuariosdeformulario',
      id: this.id
    }
     this.variosservicios.variasfunciones(datatonysverusuariosdeformulario).subscribe(async( res: any ) =>{
       console.log('respuesta de tonysverusuariosdeformulario', res);
       this.respuestadetonysverusuariosdeformulario=res;
       actualizando.dismiss();
     });
  }
  
  step1(){
    this.VerUsuariosDeformularioFuction();
    this.step='1';
    this.seleccion=[];
        console.log('this.step', this.step);
  }

  step2(){
    this.ObtenerUsariosNormales();
    this.step='2';
        console.log('this.step', this.step);
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
  this.selected_user=usuario;

  this.respuestaobtenerusuariosbusqueda.splice(index, 1);
  this.seleccion[this.seleccion.length]=usuario;
  console.log('seleccion',this.seleccion);
}

borrarSelectedUserDeSeleccion(usuario, index){
  this.seleccion.splice(index, 1);
  this.respuestaobtenerusuariosbusqueda[this.respuestaobtenerusuariosbusqueda.length]=usuario;

}

ObtenerUsariosNormales(){
  var dataobtenerusuariosbusqueda = {
    nombre_solicitud: 'tonysobtenerusuariosbusqueda'
  }
  this.variosservicios.variasfunciones(dataobtenerusuariosbusqueda).subscribe(async( res: any ) =>{
    console.log('respuesta de obtenerusuariosbusqueda', res);
    this.respuestaobtenerusuariosbusqueda=res;
});
}


async AgregarusuariosAformulario(){
  const actualizando = await this.loadingController.create({
    message: 'Autorizando usuarios a este formulario, Porfavor espere...',spinner: 'bubbles',duration: 35000,
    });
  actualizando.present();

  var datatonysagregarusuarioaformulario = {
    nombre_solicitud: 'tonysagregarusuarioaformulario',
    usuarios: this.seleccion,
    id_formulario: this.id
  }


  this.variosservicios.variasfunciones(datatonysagregarusuarioaformulario).subscribe(async( res: any ) =>{
    console.log('respuesta de tonysagregarusuarioaformulario', res);
    actualizando.dismiss();
    this.step1();
    // this.dismissyactualiza();
    this.variosservicios.presentToast("..::Usuarios agregados exitosamente!::..");
    });


}

  async borrarusuariostep1(cadausuario){
  const actualizando = await this.loadingController.create({
    message: 'Desautorizando (Borrando) acceso de usuario a este formulario, espere...',spinner: 'bubbles',duration: 20000,
    });
  actualizando.present();

  var datatonysborrarusuariodeunformulario = {
    nombre_solicitud: 'tonysborrarusuariodeunformulario',
    usuario: cadausuario.usuario,
    id_formulario: this.id
  }

  console.log('data a enviar', datatonysborrarusuariodeunformulario);

  this.variosservicios.variasfunciones(datatonysborrarusuariodeunformulario).subscribe(async( res: any ) =>{
    console.log('respuesta de tonysborrarusuariodeunformulario', res);
    actualizando.dismiss();
    this.step1();
    this.variosservicios.presentToast("..::Usuario Borrado exitosamente!::..");
    });

}



}
