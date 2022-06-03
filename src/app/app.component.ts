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


  constructor(
    private router: Router,
    private menu: MenuController,
    public varios: VariosService

  ) 
  
  {

    this.funcionverificartipocuenta();
  }
  
  ngOnInit() {
    this.funcionverificartipocuenta();
  }

  iralpaneladmin(){

  }
  
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

  funcionverificarlogin(){
    this.verificarloginemail=localStorage.getItem('email');
    this.verificarloginemail= this.decrypt(this.verificarloginemail);
    console.log('this.verificarlogin', this.verificarloginemail);
    if(this.verificarloginemail!=null||this.verificarloginemail!='false')
     {
      console.log('Bienvenido:',this.verificarloginemail);
    }
  }

  async funcionverificartipocuenta(){
    this.tipo_cuenta=localStorage.getItem('tipo_cuenta');
    this.tipo_cuenta= this.decrypt(this.tipo_cuenta);
    console.log('this.tipo_cuenta', this.tipo_cuenta);
    if(this.tipo_cuenta)
     {
      console.log('Bienvenido: tipo_cuenta',this.tipo_cuenta);
    }
  }

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
