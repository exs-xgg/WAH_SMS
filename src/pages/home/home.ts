import { Component} from '@angular/core';
import { ModalController } from 'ionic-angular';
import { PageServiceProvider } from '../../providers/pageservice/pageservice';
import { SmsSenderProvider } from '../../providers/sms-sender/sms-sender';
import { SmsControllerProvider } from '../../providers/sms-controller/sms-controller';
import { SMS } from '@ionic-native/sms';
import { HttpClient } from '@angular/common/http';
import { BackgroundMode } from '@ionic-native/background-mode';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage{

  constructor(public modalCtrl: ModalController,public sms: SMS, public smsController: SmsControllerProvider, public backgroundMode: BackgroundMode) {
  }

  num=0;
  page = new PageServiceProvider(this.modalCtrl);
  sender = new SmsSenderProvider(this.sms);

  ngOnInit(){
    this.backgroundMode.enable();
    this.page.showStandby();
    //this.smsController.getRemoteData();
    this.count();
  }

  showStandby(){
    this.page.showStandby();
  }

  count(){
    while (this.num!=10){
      setTimeout(() => { 
        this.num=this.page.add(this.num);}, 4000);
    }  
    this.num=15;
  }

  showSending(){
    this.page.showSending();
  }

  showFinished(){
    this.page.showFinished();
  }

  showStopped(){
    this.page.showStopped();
  }

  showError(){
    this.page.showError();
  }

  onBack(){
    this.page.showStandby();
  }

  onViewResults(){
    this.page.presentCompleteModal();
  }
}
