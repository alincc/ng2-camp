import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Camp} from '../model/backend-typings';
import {CrudService} from './crud.service';

@Injectable()
export class CampService {

  constructor(private crud: CrudService) {
  }

  saveCamp(camp: Camp): Observable<Camp> {
    return this.crud.post<Camp>('/rest/camps', camp);
  }

  getCamps(): Observable<Camp[]> {
    return this.crud.get<Camp[]>('/rest/camps');
  }

  getCamp(id: number): Observable<Camp> {
    return this.crud.get<Camp>('/rest/camps/' + id);
  }

  deleteCamp(id: number): Observable<Response> {
    return this.crud.doDelete('/rest/camps/' + id);
  }
}
