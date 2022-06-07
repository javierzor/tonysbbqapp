import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import * as CryptoJS from 'crypto-js';
import { VariosService } from './service/varios.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  iconohambuergesa: boolean = false;
  secretKey = "123456&Descryption";
  verificarloginemail: any;
  tipo_cuenta: any;
  estadodelmenu: Promise<boolean>;
  mostrareditarperfil: boolean = false;

  public appPages = [
    // { title: 'Home', url: 'home', icon: 'planet' },
    { title: 'Ingreso de Material', url: '/home', icon: 'add' },
    { title: 'Consulta', url: '/miscompras', icon: 'search' },
    { title: 'Solicitud de Fraccionamiento', url: 'solicitud-fraccionamiento', icon: 'archive' },
    { title: 'Bloqueo de Ordenes de fraccionamiento', url: 'bloq-orden-fraccionamiento', icon: 'trash' },
    { title: 'Bloqueo de ingreso de material', url: 'bloq-ingreso-material', icon: 'stop-circle' },
    { title: 'Fraccionamiento', url: 'fraccionamiento', icon: 'cut' },
    { title: 'Auditoria', url: 'auditoria', icon: 'clipboard' },
    { title: 'Creación de Roles', url: 'crear-roles', icon: 'enter' },
    { title: 'Creación de usuarios', url: 'crear-usuarios', icon: 'person-add' },
    { title: 'Creación de referencias', url: 'crear-referencias', icon: 'duplicate' },
    { title: 'Cambio de carrete a Chipa', url: 'de-carrete-a-otro', icon: 'at-circle' },
    { title: 'Pantalla de entregas', url: 'https://cables.cameleco.com/pantalla-entregas/', icon: 'checkbox' },
    { title: 'Entregas', url: 'entregas', icon: 'laptop' },
    { title: 'Novedades Supervisor', url: 'novedades-supervisor', icon: 'newspaper' },
  ];
  informacion_perfil: any;
  isloggedin: any;


  constructor(
    private router: Router,
    private menu: MenuController,
    public varios: VariosService

  ) 
  
  {

    // this.funcionverificartipocuenta();
    // this.funcionverificartipocuenta();
    this.ConsultarLogin();
    this.tipo_cuenta_botones_admin();
  }
  
  ngOnInit() {
    // this.funcionverificartipocuenta();
    this.tipo_cuenta_botones_admin();
  }

  iralpaneladmin(){

  }

  async ConsultarLogin(){
    this.isloggedin=localStorage.getItem('isloggedin');
    if (this.isloggedin !== 'si') {
      this.router.navigate(['login']);
    }
    else{
      this.informacion_perfil=localStorage.getItem('profileInfo');
      this.informacion_perfil=this.decrypt(this.informacion_perfil);
      this.varios.informacion_perfil=JSON.parse(this.informacion_perfil);
    }
    this.tipo_cuenta_botones_admin();
  }

  tipo_cuenta_botones_admin(){
    this.tipo_cuenta=this.varios.informacion_perfil.tipo_cuenta;
  }

  // async ConsultarLogin(){
  //   this.isloggedin=localStorage.getItem('isloggedin');
  //   console.log('this.isloggedin',this.isloggedin);

  //   if(this.isloggedin=='si'){
  //     this.informacion_perfil=localStorage.getItem('profileInfo');
  //     if(this.informacion_perfil!=null){
  //       this.informacion_perfil=this.decrypt(this.informacion_perfil);
  //     }
  //     this.informacion_perfil=JSON.parse(this.informacion_perfil);
  //     console.log('informacion de perfil en Perfil', this.informacion_perfil);
  //     this.tipo_cuenta=this.informacion_perfil.tipo_cuenta;
  //   }

  //   else{
  //     this.router.navigate(['login']);
  //   }
    
  // }

  
  ocultarhamburgesa(){
    this.iconohambuergesa=true;
  }

  mostraramburgesa(){
    this.iconohambuergesa=false;

  }

  ONCHANGEusuario(){
    if(this.mostrareditarperfil==true)
    this.mostrareditarperfil=false
    else{
      this.mostrareditarperfil=true;
    }
  }

  toggleMenu(){ // this function will toggle your menu. 
    this.menu.toggle();
    this.mostrareditarperfil=false;
  }

    toggleMenuDeeditarPerfil(){ // this function will toggle your menu. 
    this.menu.toggle();
    this.mostrareditarperfil=true;
  }

  CloseMenuFlechaBoton(){
    this.menu.close();
  }

  // funcionverificarlogin(){
  //   this.verificarloginemail=localStorage.getItem('email');
  //   this.verificarloginemail= this.decrypt(this.verificarloginemail);
  //   console.log('this.verificarlogin', this.verificarloginemail);
  //   if(this.verificarloginemail!=null||this.verificarloginemail!='false')
  //    {
  //     console.log('Bienvenido:',this.verificarloginemail);
  //   }
  // }


  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }


  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  decrypt(textToDecrypt : string){
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }


}
