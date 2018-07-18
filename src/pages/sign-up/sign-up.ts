import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms'
import { Http } from '@angular/http';



@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  formSignUp: any;
  password_type: string = 'password';
  sex: any;
  type: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
    public formBuilder: FormBuilder, public http: Http, public alertCtrl: AlertController, public loadingCtrl: LoadingController,) {

    this.formSignUp = formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      /// nickname: ['', Validators.compose([Validators.minLength(4), Validators.pattern('^[a-zA-Z]+[_A-Za-z0-9-\\+]+'), Validators.required])], 
      email: ['', Validators.compose([Validators.maxLength(70),
      Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
      Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      sex: ['', Validators.compose([Validators.required])],
      type: ['', Validators.compose([Validators.required])],


    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  togglePasswordMode() {
    this.password_type = this.password_type === 'text' ? 'password' : 'text';
    console.log(this.password_type);
  }

  toastMessage(message) {
    let toast = this.toastCtrl.create(
      {
        message: message,
        duration: 2000,
      });
    toast.onDidDismiss;
    toast.present();
  }

signUp(name, email, type, sex, password){


    var verify = [];
    let message: string;


    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'carregando'
    });
    loading.present();

 


    this.http.post('http://tcc-andre.herokuapp.com/api/verifyEmail', { email }).toPromise().then((response) => {
      verify.push(response.json());

      console.log(verify[0]);
      if (verify[0] == 'available') {


        this.http.post('http://tcc-andre.herokuapp.com/api/singup', { name, email, type, sex, password }).toPromise().then((response) => {

          this.toastMessage('Cadastro realizado com Sucesso! Realize seu login!');

          // retornando à página de login            

             
          setTimeout(() => {
            this.navCtrl.pop();
            loading.dismiss();
          }, 1000);



        });

      } else {
       
        loading.dismiss();
        this.toastMessage("Email informado já utilizado!");

      }
    });


  }

}
