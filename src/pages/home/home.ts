import { Component} from '@angular/core';
import { ModalController,NavController } from 'ionic-angular';
import { SpasmsServiceProvider } from '../../providers/spasms-service/spasms-service';
import { SMS } from '@ionic-native/sms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage{

  constructor(public modalCtrl: ModalController,
              public sms: SMS, 
             
              public http: HttpClient,
              public navCtrl: NavController,
            ) {
  }

  service = new SpasmsServiceProvider(this.modalCtrl,this.http,this.sms,this.navCtrl);

  ngOnInit(){
    this.service.showStandby();
  }
}
