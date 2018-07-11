import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import{ActivityPage} from '../activity/activity'

import{ ManageActivityPage} from '../manage-activity/manage-activity';
import { TestPage} from '../test/test';

import{LoginPage} from '../login/login';
import {HomeAlunoPage} from '../home-aluno/home-aluno';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  activityPage: ActivityPage;
  manageActivityPage: ManageActivityPage;
  

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController ) {
    
  }

  ionViewDidLoad() {
  //  this.navCtrl.setRoot(LoginPage);
  }

 
  TestPage: TestPage;
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
