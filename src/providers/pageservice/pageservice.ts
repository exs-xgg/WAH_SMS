import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModalController, NavParams } from 'ionic-angular';
import { CompleteModal } from '../../pages/complete/complete';


/*
  Generated class for the PagecontrolProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PageServiceProvider {

  constructor(public modalCtrl: ModalController,) {}

  public showSending(){
    document.getElementById('standby').style.display = "none";
    document.getElementById('sending').style.display = "block";
  }

  public presentComepleteModal() {
    let completeModal = this.modalCtrl.create(CompleteModal);
    completeModal.present();
  }

  showFinished(){
    document.getElementById('sending').style.display = "none";
    this.presentComepleteModal();
  }

  showStandby(){
    document.getElementById('error').style.display = "none";
    document.getElementById('standby').style.display = "block";
  }

  showStopped(){
    document.getElementById('sending').style.display = "none";
    document.getElementById('standby').style.display = "none";
    document.getElementById('stopped').style.display = "block";
  }

  showError(){
    document.getElementById('sending').style.display = "none";
    document.getElementById('standby').style.display = "none";
    document.getElementById('stopped').style.display = "none";
    document.getElementById('error').style.display = "block";
  }

}
