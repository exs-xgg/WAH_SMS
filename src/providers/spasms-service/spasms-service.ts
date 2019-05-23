  /* tslint:disable:no-unused-variable */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModalController, NavParams, NavController } from 'ionic-angular';
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
  update=0;
  counter=0;
  total_Messages=0;
  total_Daily_Messages=0;
  failed_Messages=0;
  sent_Messages=0;
  finished_Messages=0;
  id: any = [];
  receiver: any = [];
  message: any = [];
  ip_Address="192.168.0.100";
  temp_Address="";
  p;
  i=0;
  result=0;
  test;
  m=1;
  log="start";
  progress=0;

  refresh_interval:any;
  error_interval:any;
  checker_interval:any;
  finish_interval:any;
  send_interval:any;
  finish;
  
  interval3:any;
  interval4:any;
  timer;
  timer2;
  status="";

  constructor(public modalCtrl: ModalController,
              public http: HttpClient,
              private sms: SMS,
              public navCtrl:NavController
            ) {}
 

// clearRefreshInterval(){
//   clearInterval(this.refresh_interval);
// }

clearErrorInterval(){
  clearInterval(this.error_interval);
}

clearCheckerInterval(){
  clearInterval(this.checker_interval);
}

clearFinishInterval(){
  clearInterval(this.finish_interval);
}

// startRefreshInterval(){
//   this.refresh_interval = setInterval(() => {
//     if (this.p==0){
//       this.getMessages();
//       this.getLGU();
//     }
//   }, 5000);
// }          

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
          }
       }, 3000);
}          

startFinishInterval(){
  this.finish_interval = setInterval(() => {
    this.timer2--;
  }, 1000);
}     

startSendInterval(){
  this.send_interval = setInterval(() => {
    if (this.result==1&&this.update==1){
      this.result=0;
      this.update=0;
      this.i++;
      this.Sender();
      this.clearSendInterval();
    }
  }, 1);
}   

clearSendInterval(){
  clearTimeout(this.send_interval);
}

  showSending(){
    this.p=1;
    console.log("sending called");
    this.startCheckerInterval();
   // this.clearRefreshInterval();
    console.log("clearRef");
    document.getElementById('standby').style.display = "none";
    document.getElementById('sending').style.display = "block";
  }

  finishTimeout(){
    this.finish=setTimeout(() => { 
      this.clearFinishInterval();
      this.showStandby();}, 10000);   
  }

  clearFinishTimeout(){
    clearTimeout(this.finish);   
  }

  showFinished(){
    this.p=1;
    this.clearCheckerInterval();
    console.log("finish called")
    this.startFinishInterval();
    this.timer2=10;
    document.getElementById('standby').style.display = "none";
    document.getElementById('stopped').style.display ="none";
    document.getElementById('sending').style.display = "none";
    document.getElementById('finished').style.display ="block";
    this.finishTimeout();
  }

  showStandby(){
    this.progress=0;
    this.p=0;
    this.i=0;
    this.m=1;
    this.log="standby called " + this.m;
    this.temp_Address="";
    this.total_Daily_Messages=0;
    this.failed_Messages=0;
    this.sent_Messages=0;
    this.finished_Messages=0;
    this.total_Messages=0;
    this.id = [];
    this.receiver = [];
    this.message = [];
    document.getElementById('ipChange').style.display = "none";
    document.getElementById('error').style.display = "none";
    document.getElementById('finished').style.display ="none";
    document.getElementById('stopped').style.display ="none";
    document.getElementById('standby').style.display = "block";
   this.doIt();
    console.log("standby called")
  }

  showStopped(){
    document.getElementById('sending').style.display = "none";
    document.getElementById('standby').style.display = "none";
    document.getElementById('stopped').style.display = "block";
    this.clearCheckerInterval();
  }

  showError(){
    this.p=1;
    console.log("error called")
    //this.clearRefreshInterval();
    console.log("clearRef");
    this.timer=5;
    //this.clearRefreshInterval();
    document.getElementById('sending').style.display = "none";
    document.getElementById('finished').style.display = "none";
    document.getElementById('standby').style.display = "none";
    document.getElementById('stopped').style.display = "none";
    document.getElementById('error').style.display = "block";
    this.startErrorInterval();
      setTimeout(() => { 
      this.clearErrorInterval();
      this.showStandby();
        this.p=0;
    }, 5000);   
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
    //this.clearRefreshInterval();
    //console.log("clearRefresh");
    this.p=1;
    document.getElementById('sending').style.display = "none";
    document.getElementById('finished').style.display = "none";
    document.getElementById('standby').style.display = "none";
    document.getElementById('stopped').style.display = "none";
    document.getElementById('error').style.display = "none";
    document.getElementById('ipChange').style.display = "block";
  }

  getLGU(){
    //this.http.get('../../assets/RHU.json').toPromise()
    this.http.get('https://'+ this.ip_Address +'/api/spasms/getRHU').toPromise()
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

  doIt(){
    this.test=setTimeout(() => { 
      console.log("doIt called" + this.m)
      if (this.m==1&&this.p==0){
      this.log="doIt validated" + this.m;
      this.m=0;
      this.getMessages();
      this.getLGU();}}, 5000);   
  }

  getMessages(){
    console.log("getMessages");
    this.log="getMessages " + this.m;
    //this.http.get('../../assets/sample.json').toPromise()
    this.http.get('https://'+ this.ip_Address +'/api/spasms/showSms').toPromise()
    .then((data:any)=> { 
      this.m=1;
      this.log="getMessages showSMS" + this.m;
      var message_quantity=[];
      message_quantity=data;
      console.log("message quantity"+ message_quantity);
      this.log="message quantity" + this.m;
      if (message_quantity.length!=0){
        this.showSending();
        var k=0;
        for (var i of message_quantity) {
          this.id[k]=i.id;
          console.log("this" + this.id[k])
          this.receiver[k]=i.receiver;
          this.message[k]=i.msg;
          k++;
        };   
      this.Sender();
      }else{
        this.log="doIt called inside" + this.m;
        console.log("doIt called inside" + this.m)
        this.doIt();
      }
  },error=>{
    this.m=1;
    this.log="getMessages showSMS error" + this.m;
    this.log="error";
  if (this.p==0){
  this.showError();}
  else{
    //this.clearRefreshInterval();
    console.log("cant retrieve messages");
    this.log="cant retrieve messages " + this.m;
  }
  })
  this.log="doIt called outside" + this.m;
  console.log("doIt called outside" + this.m);
  this.doIt();
  
  }

  Sender(){
 
    var phoneNumber ="";
    var Message="";
    this.status="";

    this.total_Messages=this.id.length;
    console.log(this.id.length);
    if (this.i<this.total_Messages){
      phoneNumber=this.receiver[this.i];
      Message=this.message[this.i];
      this.Send(phoneNumber,Message);
      // this.sms.send(phoneNumber,Message).then(() => {
      //   this.sent_Messages++;
      //   this.finished_Messages++;
      //   console.log('https:///s');
      //   this.http.get('https://'+ this.ip_Address +'/api/spasms/updateStats/'+this.id[i]+'/s').toPromise()
      //   .then((data:any)=> { 
      //    });
      //   }, () => {
      //   this.failed_Messages++;
      //   this.finished_Messages++;
      //   console.log('https:///x');
      //   this.http.get('https://'+ this.ip_Address +'/api/spasms/updateStats/'+this.id[i]+'/x').toPromise()
      //   .then((data:any)=> { 
      //     });
      //   });
      }
     
  }

  Update(){
    this.http.get('https://'+ this.ip_Address +'/api/spasms/updateStats/'+this.id[this.i]+'/'+this.status).toPromise()
    .then((data:any)=> {
      document.getElementById('disconnected').style.display = "none";
      this.update=1;
      this.counter=0;
     },()=>{
       this.notUpdate();
     }
    );
  }

  notUpdate(){
    this.counter++;
    if (this.counter<1){
      this.counter=1;
      document.getElementById('disconnected').style.display = "block";
    }
    this.Update();
  }

  Send(phoneNumber,Message){
     this.sms.send(phoneNumber,Message).then(() => {
        this.sent_Messages++;
        this.finished_Messages++;
        var tempProgress=this.finished_Messages/this.total_Messages*100;

        this.progress=parseInt(tempProgress.toFixed(0));
        console.log('https:///s');
        this.result=1;
        this.status='s';
        this.Update();
        }, () => {
        this.failed_Messages++;
        this.finished_Messages++;
        var tempProgress=this.finished_Messages/this.total_Messages*100;
        
        this.progress=parseInt(tempProgress.toFixed(0));
        console.log('https:///x');
        this.result=1;
        this.status='x';
        this.Update();
        // this.http.get('https://'+ this.ip_Address +'/api/spasms/updateStats/'+this.id[this.i]+'/x').toPromise()
        // .then((data:any)=> { 
        //   });
        });
    this.startSendInterval();
  }

}
