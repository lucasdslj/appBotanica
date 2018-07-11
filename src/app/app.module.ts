import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { ActivityPage} from '../pages/activity/activity';
import { LoginPage} from '../pages/login/login';
import { SignUpPage} from '../pages/sign-up/sign-up';
import { ManageActivityPage} from '../pages/manage-activity/manage-activity'; 
import {EditActivityPage} from '../pages/edit-activity/edit-activity';
//aluno
import { HomeAlunoPage } from '../pages/home-aluno/home-aluno';
import {FindActivityPage} from '../pages/find-activity/find-activity';
import {ActivityAlunoPage} from '../pages/activity-aluno/activity-aluno';



import{TestPage} from '../pages/test/test';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ActivityPage,
    LoginPage,
    SignUpPage,
    ManageActivityPage,
    EditActivityPage,
    TestPage,
    HomeAlunoPage,
    FindActivityPage,
    ActivityAlunoPage,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ActivityPage,
    LoginPage,
    SignUpPage,
    ManageActivityPage,
    EditActivityPage,
    TestPage,
    HomeAlunoPage,
    FindActivityPage,
    ActivityAlunoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    AndroidPermissions,
    ScreenOrientation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
