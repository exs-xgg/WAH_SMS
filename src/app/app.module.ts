import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import { HttpClientModule} from '@angular/common/http';
import { MyApp } from './app.component';
import { SMS } from '@ionic-native/sms';
import { HttpClient } from '@angular/common/http';
import { BackgroundMode } from '@ionic-native/background-mode';

import { HomePage } from '../pages/home/home';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SpasmsServiceProvider } from '../providers/spasms-service/spasms-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SMS,
    HttpClient,
    BackgroundMode,
    SpasmsServiceProvider,
  ]
})
export class AppModule {}





