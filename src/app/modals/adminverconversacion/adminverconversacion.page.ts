import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { VariosService } from 'src/app/service/varios.service';
import { IonContent } from '@ionic/angular';


@Component({
  selector: 'app-adminverconversacion',
  templateUrl: './adminverconversacion.page.html',
  styleUrls: ['./adminverconversacion.page.scss'],
})
export class AdminverconversacionPage implements OnInit {

  @ViewChild(IonContent, { static: false }) content: IonContent;


  dataparaelmodal;
  informacion_perfil: any;
  respuestamismensajesdechatabierto: any;
  hizo_scroll_pararriba: boolean;
  mensaje: any='';
  respuestaguardarmensajedeusuario: any;
  mostrarr = false;

  constructor(
    public varios: VariosService,
    navParams: NavParams,
    public modalController: ModalController,
  ) 
  
  {
    this.traidopormodalparamsFuction();
    this.ScrollToBottom();
   }

  ngOnInit() {
    this.traidopormodalparamsFuction();
  }

  ionViewWillEnter(){
    this.varios.activar_realtime_user_conversaciones=false;
    this.varios.activar_realtime_admin_conversaciones=false;
    this.varios.activar_real_time_modal_ver_conversacion_chat=true;
    console.log('activando',this.varios.activar_real_time_modal_ver_conversacion_chat );
    this.realtimeAdminChat();
    this.Traermismensajesdechatabierto();
    // this.enviomensaje();
    this.ScrollToBottom();
  }

  traidopormodalparamsFuction(){
    // this.traidopormodalparams=navParams.get('dataparaelmodal');
    console.log('recibido por modalparams', this.dataparaelmodal);
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
  }


  realtimeAdminChat(){
    if(this.varios.activar_real_time_modal_ver_conversacion_chat==true){
      console.log('se cumplio la condicion en ChatRealTime() De Soporte');
      setTimeout(()=>{ 
          this.Traermismensajesdechatabierto();
          this.realtimeAdminChat(); //repite
        },8000);
    }
  }


  ScrollToBottom() {
    if(!this.hizo_scroll_pararriba&&this.varios.activar_real_time_modal_ver_conversacion_chat==true){
      setTimeout(()=>{ 
        this.content.scrollToBottom(300);
        console.log('se hizo scroll para abajo');
        this.ScrollToBottom(); //repite
      },600);
    }
  }

  async Traermismensajesdechatabierto(){
    var datatonystraermensajesdeconversacion = {
      nombre_solicitud: 'tonystraermensajesdeconversacion',
      id_conversacion:this.dataparaelmodal.id
      }
      this.varios.variasfunciones(datatonystraermensajesdeconversacion).subscribe(async( res: any ) =>{
      console.log('respuesta de tonystraermensajesdeconversacion', res);
      this.respuestamismensajesdechatabierto=res;
      // this.enviomensaje();
      });
  }

  hizoscroll(){
    this.hizo_scroll_pararriba=true;
  }

  enviomensaje(){
    setTimeout(()=>{ 
    this.content.scrollToBottom(1000);
     },400);
  }


  marcarresuelto(){
    var datatonyscerrarconversacion = {
      nombre_solicitud: 'tonyscerrarconversacion',
      id:this.dataparaelmodal.id
    }
    this.varios.variasfunciones(datatonyscerrarconversacion).subscribe(async( res: any ) =>{
      console.log('respuesta de tonyscerrarconversacion', res);
      if(res){
        this.Traermismensajesdechatabierto();
        this.enviomensaje();
        this.dataparaelmodal.status='cerrado';
      }
    });

  }


  EnviarMensajeDeChat(){
    var dataguardarmensajedeusuario = {
      nombre_solicitud: 'tonysguardarmensajedeusuario',
      id_user:this.dataparaelmodal.userdetalles.id,
      es_admin_mensaje: '1',
      mensaje:this.mensaje,
      id_conversacion:this.dataparaelmodal.id
    }
    this.varios.variasfunciones(dataguardarmensajedeusuario).subscribe(async( res: any ) =>{
      console.log('respuesta de guardarmensajedeusuario', res);
      this.respuestaguardarmensajedeusuario=res;
      if(res){
        this.Traermismensajesdechatabierto();
        this.ScrollToBottom();
        this.enviomensaje();
        // this.AgregarChatAbierto();
        this.mensaje='';
      }
    });

  }

  ionViewWillLeave(){
    this.varios.activar_real_time_modal_ver_conversacion_chat=false;
  }



}
