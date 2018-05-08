import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompleteModal } from './complete';

@NgModule({
  declarations: [
    CompleteModal,
  ],
  imports: [
    IonicPageModule.forChild(CompleteModal),
  ],
})
export class CompleteModalModule {}
