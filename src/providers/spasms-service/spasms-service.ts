import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModalController, NavParams,NavController } from 'ionic-angular';
import { CompleteModal } from '../../pages/complete/complete';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { SMS } from '@ionic-native/sms';

/*
  Generated class for the SpasmsServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SpasmsServiceProvider {

  Json;
  LGU_name="";
  total_Messages=0;
  total_Daily_Messages=0;
  failed_Messages=0;
  sent_Messages=0;
  finished_Messages=0;
  id: any = [];
  receiver: any = [];
  message: any = [];

  constructor(public modalCtrl: ModalController,
              public http: HttpClient,
              private sms: SMS,
              private navCtrl:NavController
            ) {}
 
  showSending(){
    document.getElementById('standby').style.display = "none";
    document.getElementById('sending').style.display = "block";
  }

  presentCompleteModal() {
    let completeModal = this.modalCtrl.create(CompleteModal);
    completeModal.present();
  }

  showFinished(){
    document.getElementById('error').style.display = "none";
    document.getElementById('stopped').style.display ="none";
    document.getElementById('sending').style.display = "none";
    document.getElementById('finished').style.display ="block";    
  }

  showStandby(){
    this.total_Daily_Messages=0;
    this.failed_Messages=0;
    this.sent_Messages=0;
    document.getElementById('error').style.display = "none";
    document.getElementById('finished').style.display ="none";
    document.getElementById('stopped').style.display ="none";
    document.getElementById('standby').style.display = "block";
    this.getMessages();
  }

  showStopped(){
    document.getElementById('sending').style.display = "none";
    document.getElementById('standby').style.display = "none";
    document.getElementById('stopped').style.display = "block";
  }

  showError(){
    document.getElementById('sending').style.display = "none";
    document.getElementById('finished').style.display = "none";
    document.getElementById('standby').style.display = "none";
    document.getElementById('stopped').style.display = "none";
    document.getElementById('error').style.display = "block";
    setTimeout(() => { 
      this.showStandby();}, 5000); 
  }

  getLGU(){
    /* 
      this.http.get('LGU from server').subscribe(data => {
      LGU_name=**RECEIVED DATA**
    },error =>  setTimeout(() => { 
      this.showError();},5000))
    this.json = JSON.parse(data);*/
  }

  getMessages(){
    this.http.get('../../assets/sample.json').toPromise()
    .then((data:any)=> { 
      var message_quantity=[];
      message_quantity=data;
      var k=0;
      for (var i of message_quantity) {
        this.id[k]=i.id;
        this.receiver[k]=i.receiver;
        this.message[k]=i.msg;
        k++;
    };   
    this.showSending();
    this.Sender();
  })
  }

  getLogs(){
    /* this.http.get('logs from server').subscribe(data => {
      **STORE LOGS**
    },error =>  setTimeout(() => { 
      this.showError();},5000))
    */
  }

  Sender(){
    var phoneNumber ="";
    var Message="";
    this.total_Messages=this.id.length;
    for (let i=0; i<this.total_Messages; i++) {
      phoneNumber=this.receiver[i];
      Message=this.message[i];
      this.sms.send(phoneNumber,Message).then((result) => {
        this.sent_Messages++;
        }, (error) => {
        this.failed_Messages++;
        console.log("error",this.failed_Messages);
        })
        this.finished_Messages++;
      }
    this.showFinished();   
  }

}
