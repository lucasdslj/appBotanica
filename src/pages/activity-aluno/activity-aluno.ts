import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';

import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-activity-aluno',
  templateUrl: 'activity-aluno.html',
})
export class ActivityAlunoPage {
  name: any;
  descricao: any;
  latitude: any;
  longitude: any;
  id: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
     public loadingCtrl: LoadingController, public alertCtrl: AlertController, public geolocation: Geolocation) { 
  }

  ionViewDidLoad() {
    let dataActivity = this.navParams.get('dataActivity');
    this.id = dataActivity.id;
    this.name = dataActivity.name;
    this.descricao = dataActivity.descricao;
    }

    checkCoord(latitude, longitude){
      let id = this.id;
      this.http.post('http://tcc-andre.herokuapp.com/api/checkCoord', { id, latitude, longitude }).toPromise().then(rs => {
        let resp = rs.json();

        if (resp == 'checked') {
          this.alert('Você encontrou a planta! Atividade Realizada!', 'Parabéns!!!');
        } else {
          this.alertLocation('Este não é o local da planta procurada!', 'Oh não :(');
        }
       
      });


    }

  alertLocation(message, title) {
    let alertBattle = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [


        {
          text: 'Ok',
          handler: () => {


          }
        }

      ]
    });
    alertBattle.present()
  }


  alert(message, title) {
    let alertBattle = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [


        {
          text: 'ok',
          handler: () => {
            this.navCtrl.pop();

          }
        }

      ]
    });
    alertBattle.present()
  }

  setLocation() {
    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Coletando coordenadas'
    });
    loading.present();

    var options = {
      enableHighAccuracy: true,
      timeout: 2000,
      maximumAge: 0
    };


    this.geolocation.getCurrentPosition(options).then((res) => {

      this.latitude = res.coords.latitude;
      this.longitude = res.coords.longitude;

      loading.dismiss();
      this.checkCoord(this.latitude, this.longitude);


    }).catch(() => {
      loading.dismiss();
      this.alertLocation('Por favor ative seu Gps ou certifique-se de ter concedido as permissões necessárias!', 'Aviso');
      // Vá em: configurações->aplicativos->selecione este app->permissões->permita a localização
    });

  }

}
