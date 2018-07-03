import { LoadingController, AlertController, ToastController } from 'ionic-angular'
import { Injectable } from '@angular/core';

@Injectable()
export class AlertLoader {
    constructor(public loadingCtrl: LoadingController, private alertCtrl: AlertController, private toastCtrl: ToastController) {

    }
    loading() {
        let loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        return loader;
    }

    presentAlert(title, subTitle) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: ['Dismiss']
        });
        return alert;
    }

    presentConfirm(opts) {
        return this.alertCtrl.create(opts);
    }
    successToast(msg) {
        return this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top'
        });
    }
    failedToast(msg) {
        return this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top'
        });
    }



}