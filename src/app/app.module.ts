import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LocationPage } from '../pages/location/location';
import { ContactPage } from '../pages/contact/contact';
import { AboutPage } from '../pages/about/about';
import { TabsPage } from '../pages/tabs/tabs';
import { AddLocationPage } from '../pages/location/addLocation';
import { ListLocationPage } from '../pages/location/listLocation';

import { HttpClientModule } from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Geolocation } from '@ionic-native/geolocation';
import { AlertLoader } from '../providers/alert/AlertProvider';
import { http } from '../providers/services/http';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    LocationPage,
    AddLocationPage,
    ListLocationPage,
    ContactPage,
    AboutPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LocationPage,
    AddLocationPage,
    ListLocationPage,
    ContactPage,
    AboutPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    http,
    AlertLoader,
    FileTransfer,
    FileTransferObject,
    Geolocation,
    File,
    Camera
  ]
})
export class AppModule { }
