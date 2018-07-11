import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityAlunoPage } from './activity-aluno';

@NgModule({
  declarations: [
    ActivityAlunoPage,
  ],
  imports: [
    IonicPageModule.forChild(ActivityAlunoPage),
  ],
})
export class ActivityAlunoPageModule {}
