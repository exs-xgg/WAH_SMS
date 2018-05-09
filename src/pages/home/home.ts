import { Component} from '@angular/core';
import { ModalController,NavController } from 'ionic-angular';
import { SpasmsServiceProvider } from '../../providers/spasms-service/spasms-service';
import { SMS } from '@ionic-native/sms';
import { HttpClient } from '@angular/common/http';
import { BackgroundMode } from '@ionic-native/background-mode';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage{

  constructor(public modalCtrl: ModalController,
              public sms: SMS, 
              public backgroundMode: BackgroundMode,
              public http: HttpClient,
              public navCtrl: NavController,
            ) {
  }

  service = new SpasmsServiceProvider(this.modalCtrl,this.http,this.sms,this.navCtrl);

  ngOnInit(){
    this.backgroundMode.enable();
    this.service.showStandby();
    this.service.getLGU();
  }
}
