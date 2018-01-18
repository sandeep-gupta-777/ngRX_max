import {MarkPlacesService} from "../mark-places.service";

declare var require: any;

import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ServerService} from "../server.service";
import {AppVariablesService} from "../appVariables.service";
import {SFMovie} from "../Models";

// let googleMapsClient = require('@google/maps').createClient({
//   key: 'AIzaSyDVnVqGUMSSfP5vDXoYbTMzL8bOAhD_hT8'
// });

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit,AfterViewInit {


  search_mode = 'Title';
  typeaheads: SFMovie[] = [];
  showTypeahead = false;
  highlightedTypeaheadCount:number = 0;
  keyword = "";

  constructor(private findPlaceService: MarkPlacesService,
              private serverService: ServerService,
              private appVariablesService: AppVariablesService,
              ) {}

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.findPlaceService.init();
  }

  searchBoxBlurred() {
    console.log('on blur');
    setTimeout(()=>{
      console.log('hiding TA because of blue');
      this.showTypeahead = false},100);

  }
  onKeyDown($event){
    if($event.keyCode===40){
      ++this.highlightedTypeaheadCount;;
    }
    else if($event.keyCode===38){
      --this.highlightedTypeaheadCount;
    }
    else if($event.keyCode===13){
      this.typeaheadClicked(this.typeaheads[this.highlightedTypeaheadCount]);;
    }
    if(this.highlightedTypeaheadCount<0){
      this.highlightedTypeaheadCount = this.typeaheads.length-1;
    }
    else if(this.highlightedTypeaheadCount>this.typeaheads.length){
        this.highlightedTypeaheadCount =0;
    }
    console.log(this.highlightedTypeaheadCount);
  }

  searchBoxFoucessed() {
    console.log('on foucuus');
    this.showTypeahead = true;
  }

  typeaheadClicked(keyword) {
    console.log('on clicked');

    this.showTypeahead = true;
    this.keyword = keyword;
    console.log('searching');
    let criteraObj = {};
    criteraObj[this.search_mode] = keyword;
    this.serverService.makePostRequest(this.appVariablesService.BACKEND_SEARCH_RECORD_URL, criteraObj)
      .subscribe((values: SFMovie[]) => {
        //  show on map
        console.log(values);
        this.showTypeahead = false;
        this.findPlaceService.markPlaces(values);
        this.typeaheads = [];
      });
  }

  performSearch(keyword) {
    this.highlightedTypeaheadCount = 0;
    console.log(keyword);
    let criteraObj = {};
    this.showTypeahead = true;
    criteraObj[this.search_mode] = this.keyword;

    this.serverService.makePostRequest(this.appVariablesService.BACKEND_SEARCH_URL, criteraObj)
      .subscribe((values: SFMovie[]) => {
        console.log(values);
        this.typeaheads = [];
        this.typeaheads = values.slice(0, 10);

      });
  }


}
