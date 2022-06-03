import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {Router} from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-guia',
  templateUrl: './guia.page.html',
  styleUrls: ['./guia.page.scss'],
})
export class GuiaPage implements OnInit {
  mostrardedos:boolean=true;
  // slideOpts = {
  //   initialSlide: 1,
  //   speed: 400,
  //   slideShadows: true
  // };

  slideOpts = {
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };
  
  constructor(
    private router: Router,
    private menu: MenuController,

  ) 
  {
  }

  ionViewWillEnter(){
    this.menu.enable(true);
  }


    async ngOnInit() {
  }

  desactivardedos(){
    this.mostrardedos=false;
  }

  activardedos(){
    this.mostrardedos=true;
  }

  

}
