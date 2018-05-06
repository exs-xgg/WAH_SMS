import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { SmsSenderProvider } from '../../providers/sms-sender/sms-sender';
import { PageServiceProvider } from '../../providers/pageservice/pageservice';
import { SMS } from '@ionic-native/sms';
import { ModalController } from 'ionic-angular';
/*
  Generated class for the SmsControllerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SmsControllerProvider {
 
constructor(public http: HttpClient, public sms:SMS,public modalCtrl: ModalController) {
}

json;
sender = new SmsSenderProvider(this.sms);
page = new PageServiceProvider(this.modalCtrl);

getRemoteData(){
  this.http.get('http://api.randomuser.me/?results=1&noinfo').subscribe(data => {
      this.json=data;
      alert(JSON.parse(JSON.stringify(data["Results"].gender)));
      this.checkRemoteData(data);
  });
}

checkRemoteData(data){
  if (data.toString==""){
    setTimeout(() => { 
      console.log('nothing new');
      this.getRemoteData();}, 4000); 
  }else{
    this.sender.Send(data.toString);
    this.page.showSending();
  }
}

}
