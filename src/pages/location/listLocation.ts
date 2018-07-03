import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { http } from '../../providers/services/http';
import { AlertLoader } from '../../providers/alert/AlertProvider';

@Component({
    selector: 'page-listLocation',
    templateUrl: 'listLocation.html'
})
export class ListLocationPage {
    data = undefined;
    listLocation: any;
    constructor(public navCtrl: NavController, private https: http, private alert: AlertLoader) {
        this.getListLocation();
    }

    getListLocation() {
        this.https.get('location', this.data).subscribe(
            data => {
                let res: any;
                res = data;
                this.listLocation = res.data;
            },
            error => {
                console.log(JSON.stringify(error));
                this.alert.presentAlert('Failed get data', 'Please try again!').present();
            }
        );
    }

}
