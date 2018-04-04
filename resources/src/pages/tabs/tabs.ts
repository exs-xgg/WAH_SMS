import { Component } from '@angular/core';

import { LogsPage } from '../logs/logs';
import { HelpPage } from '../help/help';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = LogsPage;
  tab3Root = HelpPage;

  constructor() {

  }
}
