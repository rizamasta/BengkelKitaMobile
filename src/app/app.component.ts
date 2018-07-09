import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HeaderColor } from '@ionic-native/header-color';
import { TabsPage } from '../pages/tabs/tabs';
import { Network } from '@ionic-native/network';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  disconnectSubscription: any;
  connectSubscription: any;
  constructor(public headerColor: HeaderColor, platform: Platform, private statusBar: StatusBar, splashScreen: SplashScreen, private network: Network, private toast: Toast) {
    platform.ready().then(() => {
      this.statusBar.styleBlackTranslucent();
      this.statusBar.overlaysWebView(true);
      this.statusBar.show();
      this.statusBar.backgroundColorByHexString('#731717');
      this.headerColor.tint("#961414");
      splashScreen.hide();
      // this.connecting();
      // this.disconnecting();
    });
  }
  connecting() {
    this.connectSubscription = this.network.onDisconnect().subscribe(() => {
      this.connectSubscription.unsubscribe();
      this.disconnecting();
      this.toast.show('You are getting online', '1000', 'center').subscribe();
    });
  }
  disconnecting() {
    this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.disconnectSubscription.unsubscribe();
      this.toast.show('You are getting offline', '10000', 'center').subscribe();
      this.connecting();
    });
  }
}
