import { Component} from '@angular/core';
import { ModalController } from 'ionic-angular';
import { PageServiceProvider } from '../../providers/pageservice/pageservice';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage{

  constructor(public modalCtrl: ModalController) {
  }

  page = new PageServiceProvider(this.modalCtrl);

  ngOnInit(){
    this.page.showStandby();
  }

  showStandby(){
    this.page.showStandby();
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
}
