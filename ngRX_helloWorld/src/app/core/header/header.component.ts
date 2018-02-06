import {Component, OnInit} from '@angular/core';
// import { HttpEvent, HttpEventType } from '@angular/common/http';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import * as fromApp from "../../store/app.reducer";
import * as fromAuth from "../../auth/store/auth.reducers";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit{

  authState:Observable<fromAuth.State>;

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService,
              private store:Store<fromAuth.AppState>,
              ) {
  }

  ngOnInit(){
    this.authState = this.store.select('auth');//key should be a key from obj [store<obj>]
  }

  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe(
        (response) => {
          console.log(response);
        }
      );
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  onLogout() {
    this.authService.logout();
  }
}
