import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { PageServiceProvider } from '../../providers/pageservice/pageservice';
import { ModalController,NavController} from 'ionic-angular';

/**
 * Generated class for the CompleteModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'complete',
  templateUrl: 'complete.html',
})

export class CompleteModal {

  constructor(public modalCtrl: ModalController,public navCtrl: NavController) {
  }
  
  page = new PageServiceProvider(this.modalCtrl);

  onBack(){
    this.page.showStandby();
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompleteModal');
  }

}
