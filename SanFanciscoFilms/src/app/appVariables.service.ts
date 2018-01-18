import {Injectable} from '@angular/core';

@Injectable()
export class AppVariablesService {

  constructor() {
  }

  public LOCALSTORAGE_user_id = 'user_id';

  readonly BACKEND_SERVER_URL = 'http://localhost:3000';

  public BACKEND_SEARCH_URL = this.BACKEND_SERVER_URL + '/searchsf';
  public BACKEND_SEARCH_RECORD_URL = this.BACKEND_SERVER_URL + '/searchsfrecord';


}
