import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelpPage } from '../pages/help/help';
import { LogsPage } from '../pages/logs/logs';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CompleteModal } from '../pages/complete/complete';
import { ResultsModal } from '../pages/results/results';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PageServiceProvider } from '../providers/pageservice/pageservice';

@NgModule({
  declarations: [
    MyApp,
    HelpPage,
    LogsPage,
    HomePage,
    TabsPage,
    CompleteModal,
    ResultsModal,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelpPage,
    LogsPage,
    HomePage,
    TabsPage,
    CompleteModal,
    ResultsModal,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PageServiceProvider
  ]
})
export class AppModule {}
