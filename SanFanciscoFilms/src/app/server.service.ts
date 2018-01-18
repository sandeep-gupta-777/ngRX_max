import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppVariablesService} from "./appVariables.service";

@Injectable()
export class ServerService {
  constructor(private httpClient:HttpClient, private appVariablesService:AppVariablesService) { }
  makePostRequest(url,bodyObj){
    return this.httpClient.post(url, bodyObj);
  }
  makeGetRequest(url){
    let user_id = localStorage.getItem(this.appVariablesService.LOCALSTORAGE_user_id);
    return this.httpClient.get(url+`&user_id=${user_id}`);
  }


}
