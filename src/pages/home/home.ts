import { Component} from '@angular/core';
import { ModalController } from 'ionic-angular';
import { PageServiceProvider } from '../../providers/pageservice/pageservice';
import { SmsSenderProvider } from '../../providers/sms-sender/sms-sender';
import { SMS } from '@ionic-native/sms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage{

  constructor(public modalCtrl: ModalController,public sms: SMS) {
  }

  page = new PageServiceProvider(this.modalCtrl);
  sender = new SmsSenderProvider(this.sms);

  ngOnInit(){
    this.page.showStandby();
  }

  showStandby(){
    this.page.showStandby();
  }

  Send(){
    this.sender.Send();
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
