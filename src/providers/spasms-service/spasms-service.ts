import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModalController, NavParams,NavController } from 'ionic-angular';
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
  ip_Address="192.168.1.100";
  temp_Address="";
  p;

  refresh_interval:any;
  error_interval:any;
  checker_interval:any;
  finish_interval:any;

  finish;
  
  interval3:any;
  interval4:any;
  timer;
  timer2;
  status="";

  constructor(public modalCtrl: ModalController,
              public http: HttpClient,
              private sms: SMS,
              private navCtrl:NavController
            ) {}
 

clearRefreshInterval(){
  clearInterval(this.refresh_interval);
}

clearErrorInterval(){
  clearInterval(this.error_interval);
}

clearCheckerInterval(){
  clearInterval(this.checker_interval);
}

clearFinishInterval(){
  clearInterval(this.finish_interval);
}

startRefreshInterval(){
  this.refresh_interval = setInterval(() => {
    if (this.p==0){
      this.getMessages();
      this.getLGU();
    }
  }, 5000);
}          

startErrorInterval(){
  this.error_interval = setInterval(() => {
    this.timer--;
  }, 1000);
}          

startCheckerInterval(){
      this.checker_interval = setInterval(() => {
        console.log("check")
          if (this.finished_Messages==this.total_Messages){
            this.clearCheckerInterval();
            this.showFinished();
            this.p=0;
    this.temp_Address="";
    this.total_Daily_Messages=0;
    this.failed_Messages=0;
    this.sent_Messages=0;
    this.finished_Messages=0;
    this.total_Messages=0;
          }
       }, 3000);
}          

startFinishInterval(){
  this.finish_interval = setInterval(() => {
    this.timer2--;
  }, 1000);
}          

  showSending(){
    console.log("sending called");
    this.startCheckerInterval();
    this.clearRefreshInterval();
    console.log("clearRef");
    document.getElementById('standby').style.display = "none";
    document.getElementById('sending').style.display = "block";
    // setTimeout(() => { 
    //   for (; this.finished_Messages<=this.total_Messages;) {
    //     if (this.finished_Messages==this.total_Messages){
    //       this.showFinished();
    //   }else{}
    // };}, 2000); 
  }
  

  // presentCompleteModal() {
  //   let completeModal = this.modalCtrl.create(CompleteModal);
  //   completeModal.present();
  // }

  finishTimeout(){
    this.finish=setTimeout(() => { 
      this.clearFinishInterval();
      this.showStandby();}, 10000);   
  }

  clearFinishTimeout(){
    clearTimeout(this.finish);   
  }

  showFinished(){
    this.clearCheckerInterval();
    console.log("finish called")
    this.startFinishInterval();
    this.timer2=10;
    document.getElementById('error').style.display = "none";
    document.getElementById('stopped').style.display ="none";
    document.getElementById('sending').style.display = "none";
    document.getElementById('finished').style.display ="block";
    this.finishTimeout();
  }

  showStandby(){
    this.p=0;
    this.temp_Address="";
    this.total_Daily_Messages=0;
    this.failed_Messages=0;
    this.sent_Messages=0;
    this.finished_Messages=0;
    this.total_Messages=0;
    document.getElementById('ipChange').style.display = "none";
    document.getElementById('error').style.display = "none";
    document.getElementById('finished').style.display ="none";
    document.getElementById('stopped').style.display ="none";
    document.getElementById('standby').style.display = "block";
    this.startRefreshInterval();
    console.log("startrefresh");
    console.log("standby called")
  }

  showStopped(){
    document.getElementById('sending').style.display = "none";
    document.getElementById('standby').style.display = "none";
    document.getElementById('stopped').style.display = "block";
    this.clearCheckerInterval();
  }

  showError(){
    this.clearRefreshInterval();
    console.log("clearRef");
    this.timer=5;
    document.getElementById('sending').style.display = "none";
    document.getElementById('finished').style.display = "none";
    document.getElementById('standby').style.display = "none";
    document.getElementById('stopped').style.display = "none";
    document.getElementById('error').style.display = "block";
    this.startErrorInterval();
      setTimeout(() => { 
      this.clearErrorInterval();
      this.showStandby();}, 5000);   
  }

  onBack(){
    this.clearFinishInterval();
    this.clearFinishTimeout();
    this.showStandby();
  }

  onIpSave(){
    this.ip_Address=this.temp_Address;
    this.showStandby();
    this.p=0;
  }

  onIpCancel(){
    this.showStandby();
    this.p=0;
  }

  onIpChange(){
    this.clearRefreshInterval();
    console.log("clearRefresh");
    this.p=1;
    this.clearRefreshInterval();
    document.getElementById('sending').style.display = "none";
    document.getElementById('finished').style.display = "none";
    document.getElementById('standby').style.display = "none";
    document.getElementById('stopped').style.display = "none";
    document.getElementById('error').style.display = "none";
    document.getElementById('ipChange').style.display = "block";
  }

  getLGU(){
    //this.http.get('../../assets/RHU.json').toPromise()
    this.http.get('http://'+ this.ip_Address +'/api/spasms/getRHU').toPromise()
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
    console.log("getMessages");
    //this.http.get('../../assets/sample.json').toPromise()
    this.http.get('http://'+ this.ip_Address +'/api/spasms/showSms').toPromise()
    .then((data:any)=> { 
      var message_quantity=[];
      message_quantity=data;
      console.log(message_quantity);
      if (message_quantity.length!=0){
        var k=0;
        for (var i of message_quantity) {
          this.id[k]=i.id;
          this.receiver[k]=i.receiver;
          this.message[k]=i.msg;
          k++;
        };   
    this.Sender();
    }
  },error=>{
  console.log("error called")
  this.showError();})
  //
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
        console.log('http:///s');
        this.http.get('http://'+ this.ip_Address +'/api/spasms/updateStats/'+this.id[i]+'/s').toPromise()
        .then((data:any)=> { 
         });
        }, (error) => {
        this.failed_Messages++;
        this.finished_Messages++;
        console.log('http:///x');
        this.http.get('http://'+ this.ip_Address +'/api/spasms/updateStats/'+this.id[i]+'/x').toPromise()
        .then((data:any)=> { 
          });
        });
        // console.log(this.sent_Messages);
        // console.log(this.failed_Messages);
        // console.log(this.total_Messages);
        // console.log(this.finished_Messages);     
        // console.log(this.failed_Messages);  
        // console.log("status" + this.status + "hello");
        //  console.log('http://192.168.1.119/api/spasms/updateStats/'+this.id[i]+'/'+this.status);
      }
      if (this.total_Messages>0){
        this.showSending();
      }
  }

}
