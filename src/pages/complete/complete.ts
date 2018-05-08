import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { ModalController,NavController} from 'ionic-angular';
import { SpasmsServiceProvider } from '../../providers/spasms-service/spasms-service';
import { SMS } from '@ionic-native/sms';
import { HttpClient } from '@angular/common/http';
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

  constructor(public modalCtrl: ModalController,public sms: SMS,public http: HttpClient,public navCtrl:NavController) {
  }
  
  service = new SpasmsServiceProvider(this.modalCtrl,this.http,this.sms,this.navCtrl);

  onBack(){
    this.navCtrl.pop();
  }

}
