import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Hotel} from '../model/backend-typings';
import {CrudService} from './crud.service';

@Injectable()
export class HotelService {

  constructor(private crud: CrudService) {
  }

  saveHotel(hotel: Hotel): Observable<Hotel> {
    return this.crud.post('/rest/hotels', hotel);
  }

  getHotels(): Observable<Hotel[]> {
    return this.crud.get('/rest/hotels');
  }

  getHotel(id: number): Observable<Hotel> {
    return this.crud.get('/rest/hotels/' + id);
  }

  deleteHotel(id: number): Observable<Response> {
    return this.crud.doDelete('/rest/hotels/' + id);
  }
}
