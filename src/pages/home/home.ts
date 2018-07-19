import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import{ActivityPage} from '../activity/activity'

import{ ManageActivityPage} from '../manage-activity/manage-activity';
import { TestPage} from '../test/test';

import{LoginPage} from '../login/login';
import {HomeAlunoPage} from '../home-aluno/home-aluno';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  activityPage: ActivityPage;
  manageActivityPage: ManageActivityPage;
  homeScreenOn=false;
  name:any;
  

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public storage: Storage, ) {
    
  }

  ionViewDidLoad() {
    let name; // auxiliar para envio na requisição que não aceita variavel global

    //  this.storage.remove('user_name');
    //verificando se existe usuário logado
    this.storage.get('name').then((val) => {
      if (val == null) {
        this.navCtrl.setRoot(LoginPage);
      } else {
   
        this.homeScreenOn = true;
        this.storage.forEach((value: string, key: string, iterationNumber: Number) => {
          if (value != null) {
            this.name = value;

            setTimeout(() => {

              name = this.name;
            
            }, 250);
          
          }
        
        });
      }
   
    });
}

 
  
  manageActivityOn() {


    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'carregando'
    });
    loading.present();

    setTimeout(() => {
      this.navCtrl.push(ManageActivityPage);
      loading.dismiss();
    }, 1000);

  }

  activityOn(){
   

    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'carregando'
    });
    loading.present();

    setTimeout(() => {
      this.navCtrl.push(ActivityPage);
      loading.dismiss();
    }, 1000);

    
  }

  homeAlunoPageOn(){
    this.navCtrl.push(HomeAlunoPage);
  }



}
