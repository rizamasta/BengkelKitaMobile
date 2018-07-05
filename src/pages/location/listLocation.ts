import { Component } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';
import { http } from '../../providers/services/http';
import { AlertLoader } from '../../providers/alert/AlertProvider';
import { EditLocationPage } from '../../pages/location/editLocation';
import { AddLocationPage } from './addLocation';

@Component({
    selector: 'page-listLocation',
    templateUrl: 'listLocation.html'
})
export class ListLocationPage {
    data = undefined;
    listLocation: any;
    locationID: any;
    optDeleteLocation = {
        title: 'Confirm Delete',
        message: 'Do you want to delete this item?',
        buttons: [
            {
                text: 'Cancel',
                role: 'cancel'
            },
            {
                text: 'Delete',
                handler: () => {
                    this.deleteLocation(this.locationID);
                }
            }
        ]
    };
    constructor(public navCtrl: NavController, private https: http, private alert: AlertLoader, private actSheet: ActionSheetController) {
    }
    ionViewWillEnter() {
        this.getListLocation();
    }
    doRefresh(refresher) {
        this.getListLocation();
        setTimeout(() => {
            refresher.complete();
        }, 2000);
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
    addLocation() {
        this.navCtrl.push(AddLocationPage);
    }
    openAction(id) {
        this.actSheet.create({
            title: 'Action',
            buttons: [
                {
                    text: 'Detail',
                    handler: () => {
                        this.viewLocation(id);
                    }
                },
                {
                    text: 'Delete',
                    role: 'destructive',
                    handler: () => {
                        this.alert.presentConfirm(this.optDeleteLocation).present();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                    }
                }
            ]
        }).present()
    }
    viewLocation(id) {
        this.navCtrl.push(EditLocationPage, { 'uid': id });

    }
    deleteLocation(id) {

    }

}
