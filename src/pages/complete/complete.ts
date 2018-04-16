import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the CompleteModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'complete',
  templateUrl: 'complete.html',
})
export class CompleteModal {

  constructor() {
  }

  onBack(){
    HomePage.showStandby();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompleteModal');
  }

}
