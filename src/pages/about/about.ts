import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddLocationPage } from '../location/addLocation';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {

  }
  addLocation() {
    this.navCtrl.push(AddLocationPage);
  }
}
