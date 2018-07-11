import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ActivityAlunoPage} from '../activity-aluno/activity-aluno';
import { Http } from '@angular/http';


@IonicPage()
@Component({
  selector: 'page-find-activity',
  templateUrl: 'find-activity.html',
})
export class FindActivityPage {
  data:any;
  constructor (public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl: AlertController,
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
  activityAlunoOn(dataActivity){
    this.navCtrl.push(ActivityAlunoPage, { dataActivity });
  }
}
