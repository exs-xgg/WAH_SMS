import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModalController, NavParams } from 'ionic-angular';
import { CompleteModal } from '../../pages/complete/complete';
import 'rxjs/add/operator/map';
import { SmsSenderProvider } from '../../providers/sms-sender/sms-sender';
import { PageServiceProvider } from '../../providers/pageservice/pageservice';
import { SMS } from '@ionic-native/sms';

/*
  Generated class for the SpasmsServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SpasmsServiceProvider {

  constructor(public modalCtrl: ModalController,public http: HttpClient,private sms: SMS) {}
 
  public showSending(){
    document.getElementById('standby').style.display = "none";
    document.getElementById('sending').style.display = "block";
  }

  public presentCompleteModal() {
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
    document.getElementById('error').style.display = "none";
    document.getElementById('finished').style.display ="none";
    document.getElementById('stopped').style.display ="none";
    document.getElementById('standby').style.display = "block";
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

  getRemoteData(){
    this.http.get('http://api.randomuser.me/?results=1&noinfo').subscribe(data => {
        alert(JSON.stringify(data));
    },error => this.showError());
  }
  
  checkRemoteData(data){
    if (data.toString==""){
      setTimeout(() => { 
        console.log('nothing new');
        this.getRemoteData();}, 4000); 
    }else{
      this.Send(data.toString);
      this.showSending();
    }
  }

  public Send(data){
    this.sms.send('09295868987', data);
  }

}
