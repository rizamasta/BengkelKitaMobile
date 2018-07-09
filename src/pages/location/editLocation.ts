import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';
import { http } from '../../providers/services/http';
import { AlertLoader } from '../../providers/alert/AlertProvider';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';
declare var google: any;
@Component({
    selector: 'page-editLocation',
    templateUrl: 'editLocation.html'
})
export class EditLocationPage {
    @ViewChild('map2') mapElement: ElementRef;
    form: FormGroup;
    map: any;
    dataLocation = {
        name: '',
        address: '',
        latitude: 0,
        longitude: 0
    };
    editable = false;
    latLng: any;
    markers = [];
    optAddMore = {
        title: 'Operation Success',
        message: 'Do you want to add more location?',
        buttons: [
            {
                text: 'YES',
                role: 'cancel'
            },
            {
                text: 'NO',
                handler: () => {
                    this.navCtrl.pop();
                }
            }
        ]
    };
    uid = "";
    constructor(
        public navCtrl: NavController,
        private navParams: NavParams,
        private alert: AlertLoader,
        private httpc: http,
        private formBuilder: FormBuilder,
        private platform: Platform,
        private geolocation: Geolocation
    ) {
        this.form = this.formBuilder.group({
            name: ['Please fill the Location Name', Validators.required],
            address: ['Fill the full address', Validators.required],
            editable: ['', Validators.nullValidator]
        });
        this.platform.ready().then(() => {
            this.uid = this.navParams.data.uid;
            this.getListLocation(this.uid);
        });

    }
    initEditMap(lat, lng) {
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
            zoom: 14,
            center: { lat: parseFloat(lat), lng: parseFloat(lng) },
            disableDefaultUI: true,
            zoomControl: true,
        });
    };
    initMap() {
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
            zoom: 14,
            center: { lat: -6.243871, lng: 106.7247318 },
            disableDefaultUI: true,
            zoomControl: true,
        });
        this.geolocation.getCurrentPosition().then((resp) => {
            this.dataLocation.latitude = resp.coords.latitude;
            this.dataLocation.longitude = resp.coords.longitude;
            let locate = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
            this.map.setCenter(locate);
        }, (e) => {
            this.alert.presentAlert('MAP Error', 'Failed get location');
            let locate = new google.maps.LatLng(-6.243871, 106.7247318);
            this.map.setCenter(locate);
        })

    };

    initial() {
        this.map.addListener('click', (event) => {
            this.dataLocation.address = "";
            this.deleteMarkers();
            this.setMarker(event.latLng);
            this.map.setCenter(event.latLng);
            this.convertName();
        });
    }

    setCenter() {
        this.geolocation.getCurrentPosition().then((resp) => {
            this.dataLocation.latitude = resp.coords.latitude;
            this.dataLocation.longitude = resp.coords.longitude;
            this.deleteMarkers();
            let locate = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
            this.setMarker(locate);
            this.setMapOnAll(this.map);
            this.map.setCenter(locate);
        }, (e) => {
            this.deleteMarkers();
            let locate = new google.maps.LatLng(-6.243871, 106.7247318);
            this.setMarker(locate);
            this.setMapOnAll(this.map);
            this.map.setCenter(locate);
            this.convertName();
        })

    }

    setMarker(loc) {
        let marker = new google.maps.Marker({
            position: loc,
            map: this.map,
            icon: { url: 'assets/imgs/marker.png', scaledSize: new google.maps.Size(25, 25) },
            draggable: true
        });
        this.dataLocation.latitude = marker.getPosition().lat();
        this.dataLocation.longitude = marker.getPosition().lng();
        google.maps.event.addListener(marker, 'dragend', () => {
            this.dataLocation.address = "";
            this.dataLocation.latitude = marker.getPosition().lat();
            this.dataLocation.longitude = marker.getPosition().lng();
            this.map.setCenter(loc);
            this.convertName();
        });
        this.markers.push(marker);
    }

    setMapOnAll(map) {
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(map);
        }
    }

    clearMarkers() {
        this.setMapOnAll(null);
    }

    deleteMarkers() {
        this.clearMarkers();
        this.markers = [];
    }

    updateLocation() {
        this.httpc.put('location/' + this.uid, this.dataLocation).subscribe(dt => {
            var res: any;
            res = dt;
            if (res.status == 200) {
                this.alert.presentAlert('Updated', "Success update data!").present();
            }
            else {
                this.alert.presentAlert('Failed Save', res.display_message).present();
            }
        }, err => {
            this.alert.presentAlert('Failed Save', 'We try process your request, but we just got an error. Please try again.').present();
        })
    }

    getListLocation(id) {
        this.httpc.get('location/' + id, "").subscribe(
            data => {
                let res: any;
                res = data;
                this.dataLocation = res.data;
                this.initEditMap(this.dataLocation.latitude, this.dataLocation.longitude);
                this.deleteMarkers();
                let locate = new google.maps.LatLng(this.dataLocation.latitude, this.dataLocation.longitude);
                this.setMarker(locate);
                this.setMapOnAll(this.map);
                this.map.setCenter(locate);
                this.convertName();
                this.initial();
            },
            error => {
                this.alert.presentAlert('Failed get data', 'Please try again!').present();
                console.log(JSON.stringify(error));

            }
        );
    }

    convertName() {
        this.httpc.getAddressName(this.dataLocation.latitude, this.dataLocation.longitude).subscribe((data) => {
            let res: any;
            res = data;
            try {
                this.dataLocation.address = res.results[0].formatted_address;
            } catch (e) {
                console.log(e);
                this.dataLocation.address = "";
            }
        }, (e) => {
            console.log(e);
            this.initMap();
            this.dataLocation.address = "";
        });
    }

}
