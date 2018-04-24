import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SMS } from '@ionic-native/sms';

/*
  Generated class for the SmsSenderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SmsSenderProvider {

  constructor(private sms: SMS) {}

  public Send(){
    this.sms.send('09177995739', 'This is a text message sent from WAH-SPASMS');
  }

}
