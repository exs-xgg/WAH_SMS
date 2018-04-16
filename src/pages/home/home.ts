import { Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController, NavParams } from 'ionic-angular';
import { CompleteModal } from '../complete/complete';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage{

  count=0;

  ngOnInit(){
    this.showStandby();
  }

  constructor(public modalCtrl: ModalController,) {
    function back(){
      this.showStandby();
    }
  }

  
  showSending(){
    document.getElementById('standby').style.display = "none";
    document.getElementById('sending').style.display = "block";
    setTimeout(() => {
      this.showFinished();}, 4000);
  }

  showFinished(){
    document.getElementById('sending').style.display = "none";
    this.presentComepleteModal();
  }

  showStandby(){
    document.getElementById('error').style.display = "none";
    document.getElementById('standby').style.display = "block";
    setTimeout(() => {
      this.showSending();}, 8000);
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
    setTimeout(() => {
      this.showStandby();}, 4000);
  }

  presentComepleteModal() {
    let completeModal = this.modalCtrl.create(CompleteModal);
    completeModal.present();
  }

}
