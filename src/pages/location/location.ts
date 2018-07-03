import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertLoader } from '../../providers/alert/AlertProvider';
import { AddLocationPage } from '../location/addLocation';
import { ListLocationPage } from '../location/listLocation';

declare var google: any;
declare var location: any;

@Component({
  selector: 'page-location',
  templateUrl: 'location.html'
})
export class LocationPage {
  usersLocation: any;
  mapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#181818"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1b1b1b"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#2c2c2c"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8a8a8a"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#373737"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3c3c3c"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#4e4e4e"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3d3d3d"
        }
      ]
    }
  ];
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers = [];
  buttonFabs: any;
  constructor(public navCtrl: NavController, public platform: Platform, private geolocation: Geolocation, private alert: AlertLoader) {
    this.buttonFabs = [
      { icon: 'add', component: AddLocationPage, color: 'secondary' },
      { icon: 'list', component: ListLocationPage, color: 'danger' }
    ]
    platform.ready().then(() => {
      this.initMap();
      this.getLocation();
    });


  }

  getLocation() {
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      location.lat = data.coords.latitude;
      location.lon = data.coords.longitude;
      this.deleteMarkers();
      let updatelocation = new google.maps.LatLng(location.lat, location.lon);
      this.setMarker(updatelocation);
      this.map.setCenter(updatelocation);
      this.setMapOnAll(this.map);
    });
  }
  setCenter() {
    if (location.lat && location.lon) {
      let locate = new google.maps.LatLng(location.lat, location.lon);
      this.map.setCenter(locate);
    }
    else {
      this.alert.presentAlert('Error', 'Failed get your location').present();
    }
  }
  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 14,
      center: { lat: -6.243871, lng: 106.7247318 },
      disableDefaultUI: true,
      styles: this.mapStyle,
      zoomControl: true,
    });
  };

  setMarker(loc) {
    let marker = new google.maps.Marker({
      position: loc,
      map: this.map,
      icon: { url: 'assets/imgs/marker.png', scaledSize: new google.maps.Size(15, 15) }
    });
    this.markers.push(marker);
  }

  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }
  openPage(page) {
    this.navCtrl.push(page.component);
  }
  clearMarkers() {
    this.setMapOnAll(null);
  }

  deleteMarkers() {
    this.clearMarkers();
    this.markers = [];
  }


}
