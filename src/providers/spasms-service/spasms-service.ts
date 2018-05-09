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
  LGU_name="asdasd";
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
    // setTimeout(() => { 
    //   for (; this.finished_Messages<=this.total_Messages;) {
    //     if (this.finished_Messages==this.total_Messages){
    //       this.showFinished();
    //   }else{}
    // };}, 2000); 
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
    // this.failed_Messages=0;
    // this.sent_Messages=0;
    // this.finished_Messages=0;
    this.total_Messages=0;
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
    this.http.get('../../assets/RHU.json').toPromise()
    //this.http.get('http://192.168.1.129/api/spasms/getRHU').toPromise()
    .then((data:any)=> { 
      var LGU=[];
      LGU=data;
      for (var i of LGU) {
        this.LGU_name=i.hfhudname;
    };
    if (this.LGU_name.length<=25){
      document.getElementById('LGU').style.fontSize = "6.2vw";
    }else if (this.LGU_name.length<=30){
            document.getElementById('LGU').style.fontSize = "5.4vw";
          }else if (this.LGU_name.length<=35){
                  document.getElementById('LGU').style.fontSize = "4.6vw";
                }else if (this.LGU_name.length<=40){
                        document.getElementById('LGU').style.fontSize = "3.8vw";
                      }else{
                        document.getElementById('LGU').style.fontSize = "3.2vw";}
  },error=>alert("Cannot retrieve RHU name"))}

  getMessages(){
    this.http.get('../../assets/sample.json').toPromise()
    //this.http.get('http://192.168.1.129/api/spasms/showSms').toPromise()
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
    var status = "s";
    this.total_Messages=this.id.length;
    for (let i=0; i<this.total_Messages; i++) {
      phoneNumber=this.receiver[i];
      Message=this.message[i];
      this.sms.send(phoneNumber,Message).then((result) => {
        this.sent_Messages++;
        this.finished_Messages++;
        status = "s";
        }, (error) => {
        this.failed_Messages++;
        this.finished_Messages++;
        status = "x";
        })
        console.log(this.sent_Messages);
        console.log(this.failed_Messages);
        console.log(this.total_Messages);
        console.log(this.finished_Messages);     
        console.log(this.failed_Messages);  
      //  console.log('http://192.168.1.129/api/spasms/updateStats/'+this.id[i]+'/'+status);
      //   this.http.get('http://192.168.1.129/api/spasms/updateStats/'+this.id[i]+'/'+status).toPromise()
      //   .then((data:any)=> { 
      // })
      }
      this.showSending();
  }

}
