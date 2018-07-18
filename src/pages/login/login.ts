import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';

import {HomePage} from '../home/home';
import {HomeAlunoPage} from '../home-aluno/home-aluno';
import { SignUpPage} from '../sign-up/sign-up';

import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  formLogin:any;
  userData:any;
  password_type: String = 'password';
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public http: Http,
    public formBuilder: FormBuilder, private toastCtrl: ToastController, public alertCtrl: AlertController, public storage: Storage) {

    this.formLogin = formBuilder.group({
      email: ['', Validators.compose([Validators.maxLength(70),
      Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
      Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      typeUser: ['', Validators.compose([Validators.required])],
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  togglePasswordMode() {
    this.password_type = this.password_type === 'text' ? 'password' : 'text';
    console.log(this.password_type);
  }

  homeOn(typeUser){
    if (typeUser == 'Professor' ) {
      this.navCtrl.setRoot(HomePage);
    }else{
      this.navCtrl.setRoot(HomeAlunoPage);
    }

  }

  signupOn(){


    this.navCtrl.push(SignUpPage);
  }

  homeOn2(email, password, type){

   


    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'carregando'
    });
    loading.present();

 

    this.http.post('http://tcc-andre.herokuapp.com/api/login', { email, password, type }).toPromise().then((response) => {
      console.log(response);
      this.userData.push(response.json());

      console.log(this.userData);

      if (this.userData[0] != "err") {

       

        let toast = this.toastCtrl.create(
          {
            message: 'Usuário logado com sucesso!',
            duration: 2000,
          });
        toast.onDidDismiss;
        toast.present();

        //preparando para usar banco local
        this.storage.ready().then(() => {
        });

        this.userData = this.userData[0];

        // console.log(this.userData[0].user_name);
        //this.storage.remove('user_name');
        let name = this.userData[0].name + '';
        this.storage.set('user_name', name);
  
        loading.dismiss();
        if (type == 'Professor') {
          this.navCtrl.setRoot(HomePage);
        } else {
          this.navCtrl.setRoot(HomeAlunoPage);
        }

       

      } if (this.userData[0] == "err") {
      
        this.userData = [];
        loading.dismiss();
        let toast = this.toastCtrl.create(
          {
            message: 'Email ou Senha incorreto!!',
            duration: 2000,
          });
        toast.onDidDismiss;
        toast.present();


      }
  
    });






  }





}
