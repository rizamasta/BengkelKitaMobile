import { Component } from '@angular/core';

import { LocationPage } from '../location/location';
import { AboutPage } from '../about/about';
import { ListLocationPage } from '../location/listLocation';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabAbout = AboutPage;
  tabLocation = LocationPage;
  tabList = ListLocationPage;
  constructor() {

  }
}
