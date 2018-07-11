import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindActivityPage } from './find-activity';

@NgModule({
  declarations: [
    FindActivityPage,
  ],
  imports: [
    IonicPageModule.forChild(FindActivityPage),
  ],
})
export class FindActivityPageModule {}
