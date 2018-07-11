import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageActivityPage } from './manage-activity';

@NgModule({
  declarations: [
    ManageActivityPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageActivityPage),
  ],
})
export class ManageActivityPageModule {}
