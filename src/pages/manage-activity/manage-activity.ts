import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { EditActivityPage } from '../edit-activity/edit-activity';
@IonicPage()
@Component({
  selector: 'page-manage-activity',
  templateUrl: 'manage-activity.html',
})
export class ManageActivityPage {
  data: any;
  editActivityPage: EditActivityPage;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {
  }



  ionViewDidEnter() {
    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'carregando'
    });
    loading.present();
    this.http.get('http://tcc-andre.herokuapp.com/api/coord').toPromise().then((rs) => {

      this.data = rs.json();
      loading.dismiss();
      console.log(this.data);

    });
  }

  editActivityOn(dataActivity) {
    this.navCtrl.push(EditActivityPage, { dataActivity });
  }

  alert(message, title) {
    let alertBattle = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [


        {
          text: 'ok',
          handler: () => {
            this.ionViewDidEnter();

          }
        }

      ]
    });
    alertBattle.present()
  }

  delActivity(id) {
    let alert = this.alertCtrl.create({
      title: 'Aviso!',
      message: 'Deseja realmente deletar esta atividade?',
      buttons: [


        {
          text: 'Não',
          handler: () => {


          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.http.delete('http://tcc-andre.herokuapp.com/api/coord/' + id).toPromise().then(rs => {
              this.alert('Atividade apaga!', 'Tudo Certo');
            });

          }
        }

      ]
    });
    alert.present()
  }

}
