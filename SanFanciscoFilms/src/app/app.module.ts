import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from "./app.component";
import {Route, RouterModule} from "@angular/router";

import {NotfoundComponent} from "./notfound/notfound.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {HeaderComponent} from './header/header.component';
import {MapComponent} from './map/map.component';

import {InfowindowService} from "./infowindow.service";
import {MarkPlacesService} from "./mark-places.service";
import {AppVariablesService} from "./appVariables.service";
import {ServerService} from "./server.service";



const routes: Route[] = [
  {path: '', component: MapComponent},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    MapComponent,
    HeaderComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ServerService,
    AppVariablesService,
    MarkPlacesService,
    InfowindowService
  ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
