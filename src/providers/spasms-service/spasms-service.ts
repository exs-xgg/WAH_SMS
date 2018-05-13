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
  interval:any;
  interval2:any;
  interval3:any;
  interval4:any;
  timer;
  timer2;
  status = "";

  constructor(public modalCtrl: ModalController,
              public http: HttpClient,
              private sms: SMS,
              private navCtrl:NavController
            ) {}
 


clearInterval(){
  clearInterval(this.interval);
}

clearInterval2(){
  clearInterval(this.interval2);
}

clearInterval3(){
  clearInterval(this.interval3);
}

clearInterval4(){
  clearInterval(this.interval4);
}

startInterval(){
      this.interval = setInterval(() => {
          if (this.finished_Messages==this.total_Messages){
              this.showFinished();
              this.clearInterval();
          }
       }, 5000);
}          

// startInterval2(){
//   this.interval4 = setInterval(() => {
//       if (this.finished_Messages==this.total_Messages){
//           this.showFinished();
//           this.clearInterval();
//       }
//    }, 5000);
// }          

  showSending(){
    document.getElementById('standby').style.display = "none";
    document.getElementById('sending').style.display = "block";
    this.startInterval();
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
    this.timer2=3;
    document.getElementById('error').style.display = "none";
    document.getElementById('stopped').style.display ="none";
    document.getElementById('sending').style.display = "none";
    document.getElementById('finished').style.display ="block";
    this.interval2 = setInterval(() => {
      this.timer2--;
    }, 1000);
     setTimeout(() => { 
       this.clearInterval2();
       this.showStandby();}, 3000);     
  }

  showStandby(){
    this.total_Daily_Messages=0;
    this.failed_Messages=0;
    this.sent_Messages=0;
    this.finished_Messages=0;
    this.total_Messages=0;
    document.getElementById('error').style.display = "none";
    document.getElementById('finished').style.display ="none";
    document.getElementById('stopped').style.display ="none";
    document.getElementById('standby').style.display = "block";
    this.interval4 = setInterval(() => {
      this.getMessages();
    }, 5000);
    this.getLGU();
  }

  showStopped(){
    document.getElementById('sending').style.display = "none";
    document.getElementById('standby').style.display = "none";
    document.getElementById('stopped').style.display = "block";
  }

  showError(){
    this.timer=5;
    document.getElementById('sending').style.display = "none";
    document.getElementById('finished').style.display = "none";
    document.getElementById('standby').style.display = "none";
    document.getElementById('stopped').style.display = "none";
    document.getElementById('error').style.display = "block";
    this.interval3 = setInterval(() => {
     this.timer--;
   }, 1000);
    setTimeout(() => { 
      console.log(this.timer);
      this.clearInterval3();
      this.showStandby();}, 5000);   
  }

  onBack(){
    this.clearInterval2();
    this.showStandby();
  }

  getLGU(){
    //this.http.get('../../assets/RHU.json').toPromise()
    this.http.get('http://192.168.0.119/api/spasms/getRHU').toPromise()
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
  },error=>console.log("Cannot retrieve RHU name")
  )}

  getMessages(){
    this.http.get('http://192.168.0.119/api/spasms/showSms').toPromise()
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
    //
  },error=>this.showError())
  //
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
    this.status="";
    this.total_Messages=this.id.length;
    for (let i=0; i<this.total_Messages; i++) {
      phoneNumber=this.receiver[i];
      Message=this.message[i];
      this.sms.send(phoneNumber,Message).then((result) => {
        this.sent_Messages++;
        this.finished_Messages++;
        this.status = "s";
        }, (error) => {
        this.failed_Messages++;
        this.finished_Messages++;
        this.status = "x";
        });
        console.log(this.sent_Messages);
        console.log(this.failed_Messages);
        console.log(this.total_Messages);
        console.log(this.finished_Messages);     
        console.log(this.failed_Messages);  
        console.log("status" + this.status + "hello");
         console.log('http://192.168.1.119/api/spasms/updateStats/'+this.id[i]+'/'+this.status);
        this.http.get('http://192.168.1.119/api/spasms/updateStats/'+this.id[i]+'/'+this.status).toPromise()
        .then((data:any)=> { 
      });
      }
      if (this.total_Messages>0){
        this.clearInterval4();
        this.showSending();
      }
  }

}
