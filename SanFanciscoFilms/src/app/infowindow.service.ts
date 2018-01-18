import { Injectable } from '@angular/core';
// import {google} from "./mark-places.service";
import {SFMovie} from "./Models";
declare var google: any;

@Injectable()
export class InfowindowService {

  infowindow;
  constructor() { }

  addInfoWindow(sfMovie:SFMovie,marker,map){
    let contentString = `
      <div class="container1" style = "overflow:hidden">
  <div class="row">
    <div class="col-12">
      <h5>${sfMovie.Title}</h5>
    </div>
    <ul>
   <li><b>Director:</b> ${sfMovie.Director}</li>
   <li><b>Lead Actor:</b> ${sfMovie['Actor 1']}</li>
       <li><b>Address:</b> ${sfMovie.Locations}</li>

</ul>
  </div>
  </div>
    `;


    marker.addListener('click', () => {
      //close previously opended info windows
      if (this.infowindow) {
        this.infowindow.close();
      };
      this.infowindow = new google.maps.InfoWindow({
        content: contentString
      });
      this.infowindow.open(map, marker);
    });
  }
}
