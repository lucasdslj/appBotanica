import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { FormBuilder, Validators  } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';


@IonicPage()
@Component({
  selector: 'page-edit-activity',
  templateUrl: 'edit-activity.html',
})
export class EditActivityPage {
  name:any;
  descricao:any;
  latitude:any;
  longitude:any;
  id:any;
  formActivity: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController, public geolocation: Geolocation) {

    this.formActivity = formBuilder.group({
      name: ['', Validators.compose([Validators.maxLength(70), Validators.required])],
      descricao: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  ionViewDidLoad() {
    let dataActivity = this.navParams.get('dataActivity');
    this.id = dataActivity.id;
    this.name = dataActivity.name;
    this.descricao = dataActivity.descricao;
    this.latitude = dataActivity.longitude;
    this.longitude = dataActivity.longitude;
  }


  updateData(){

    let name = this.name;
    let descricao = this.descricao;
    let latitude = this.latitude;
    let longitude = this.longitude;
    this.http.put('http://tcc-andre.herokuapp.com/api/coord/'+this.id, { name, latitude, longitude, descricao }).toPromise().then(rs => {
      this.alert('Atividade atualizada com sucesso', 'Tudo Certo');
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
      this.alertLocation('Coordenadas coletadas com sucesso! Agora aperte no botão gravar para efetuar a atualização', 'Aviso');


    }).catch(() => {
      loading.dismiss();
      this.alertLocation('Por favor ative seu Gps ou certifique-se de ter concedido as permissões necessárias!', 'Aviso');
      // Vá em: configurações->aplicativos->selecione este app->permissões->permita a localização
    });

  }

}
