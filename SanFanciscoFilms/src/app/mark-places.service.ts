import {Injectable, OnInit} from '@angular/core';
import {SFMovie} from "./Models";
import {InfowindowService} from "./infowindow.service";
declare var google: any;
@Injectable()
export class MarkPlacesService {

  constructor(private infowindowService:InfowindowService) {}

  $map;  map;  googleMapApi;  iceCreamStores = [];  markersArray = [];
  markerImagePath = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

  init() {
    console.log('find place init');
    let sanFrancisco_latlng = {lat: 37.773972, lng: -122.431297};//test
    let options = {
      zoom: 15,
      mapTypeControl: true,
      streetViewControl: true
    };
    this.$map = document.getElementById('map');
    this.googleMapApi = google.maps;
    this.map = new this.googleMapApi.Map(this.$map, options);
    this.iceCreamStores = [];
    this.iceCreamStores = [];
    this.map.setCenter(new google.maps.LatLng(sanFrancisco_latlng.lat, sanFrancisco_latlng.lng));

  };
  markPlaces(sfMovies: SFMovie[]) {
    /*this will mark all give lat,lng */
    //first, clear all previous markers from the map
    this.clearAllMarkers();
    this.iceCreamStores = [];//empty it for fresh search
    let bounds = new google.maps.LatLngBounds();

    for (let i = 0; i < sfMovies.length; i++) {

      let tempCoord = sfMovies[i].coords;

      this.addMarkers(tempCoord, this.markerImagePath, sfMovies[i]);
      bounds.extend(tempCoord);
      this.map.fitBounds(bounds);
    }
  };

  addMarkers(coords, imageURL, sfMovie: SFMovie) {
    let icon = {
      url: imageURL, // url
      scaledSize: new this.googleMapApi.Size(40, 49), // scaled size
      origin: new this.googleMapApi.Point(0, 0), // origin
      anchor: new this.googleMapApi.Point(0, 0) // anchor
    };

    let marker = new this.googleMapApi.Marker({
      position: coords,
      map: this.map,
      animation: this.googleMapApi.Animation.DROP,
      icon: icon
    });
    this.markersArray.push(marker);
    this.infowindowService.addInfoWindow(sfMovie,marker,this.map);
  };

  clearOverlays() {
    for (let i = 0; i < this.markersArray.length; i++) {
      this.markersArray[i].setMap(null);
    }
    this.markersArray.length = 0;
  }

  clearAllMarkers() {
    this.clearOverlays();
  };


}
