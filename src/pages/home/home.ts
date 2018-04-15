import { Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{

  pb = "../../assets/imgs/progressbar.gif";
  count=0;

  ngOnInit(){
    this.showStandby();
  }

  showSending(){
    document.getElementById('standby').style.display = "none";
    document.getElementById('sending').style.display = "block";
    setTimeout(() => {
      this.showFinished();}, 4000);
  }

  showFinished(){
    document.getElementById('sending').style.display = "none";
    document.getElementById('finished').style.display = "block";
    setTimeout(() => {
      this.showStandby();}, 4000);
  }

  showStandby(){
    document.getElementById('error').style.display = "none";
    document.getElementById('finished').style.display = "none";
    document.getElementById('standby').style.display = "block";
    setTimeout(() => {
      this.showSending();}, 8000);
  }

  showStopped(){
    document.getElementById('finished').style.display = "none";
    document.getElementById('sending').style.display = "none";
    document.getElementById('standby').style.display = "none";
    document.getElementById('stopped').style.display = "block";
  }

  showError(){
    document.getElementById('finished').style.display = "none";
    document.getElementById('sending').style.display = "none";
    document.getElementById('standby').style.display = "none";
    document.getElementById('stopped').style.display = "none";
    document.getElementById('error').style.display = "block";
    setTimeout(() => {
      this.showStandby();}, 4000);
  }


  constructor(public navCtrl: NavController) {

  }

}
