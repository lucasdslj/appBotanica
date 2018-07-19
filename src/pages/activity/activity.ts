import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { FormBuilder, Validators } from '@angular/forms'

@IonicPage()
@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {

  formActivity:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController, public geolocation: Geolocation) {
    this.formActivity = formBuilder.group({
      name: ['', Validators.compose([Validators.maxLength(70),  Validators.required])],
      descricao: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      dica: ['', Validators.compose([Validators.required])],
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

  setLocation(name, descricao, dica) {
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

      let lat = res.coords.latitude;
      let lng = res.coords.longitude;

      loading.dismiss();
      this.createNewActivity(name, descricao, dica, lat, lng );


    }).catch(() => {
      loading.dismiss();
      this.alertLocation('Por favor ative seu Gps ou certifique-se de ter concedido as permissões necessárias!', 'Aviso');
      // Vá em: configurações->aplicativos->selecione este app->permissões->permita a localização
    });

  }


  createNewActivity(name, descricao, dica, latitude, longitude) {
    
      this.http.post('http://tcc-andre.herokuapp.com/api/coord', { name, latitude, longitude, descricao}).toPromise().then(rs => {
        this.alert('Atividade criada com sucesso', 'Aviso');
    });
  }




}
