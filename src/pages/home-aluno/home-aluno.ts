import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import {FindActivityPage} from '../find-activity/find-activity';


@IonicPage()
@Component({
  selector: 'page-home-aluno',
  templateUrl: 'home-aluno.html',
})
export class HomeAlunoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeAlunoPage');
  }

  findActivityPageOn(){

    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'carregando'
    });
    loading.present();

    setTimeout(() => {
      this.navCtrl.push(FindActivityPage);
      loading.dismiss();
    }, 1000);
    
  }
}
