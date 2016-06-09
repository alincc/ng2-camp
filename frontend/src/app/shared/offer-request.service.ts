import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {OfferRequest} from '../model/backend-typings';
import {CrudService} from './crud.service';

@Injectable()
export class OfferRequestService {

  constructor(private crud: CrudService) {
  }

  saveOfferRequest(campId: number, offerRequest: OfferRequest): Observable<OfferRequest> {
    return this.crud.post('/rest/camps/' + campId + '/offerrequests', offerRequest);
  }

  getOfferRequests(): Observable<OfferRequest[]> {
    return this.crud.get('/rest/offerrequests');
  }

  getOfferRequest(id: number): Observable<OfferRequest> {
    return this.crud.get('/rest/offerrequests/' + id);
  }

  deleteOfferRequest(id: number): Observable<Response> {
    return this.crud.doDelete('/rest/offerrequests/' + id);
  }
}
