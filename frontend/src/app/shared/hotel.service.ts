import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Hotel} from '../model/backend-typings';
import {CrudService} from './crud.service';
import {MapService} from '../shared/map.service';

@Injectable()
export class HotelService {

  constructor(private crud: CrudService, private mapService: MapService) {
  }

  saveHotel(hotel: Hotel): Observable<Hotel> {
    return this.crud.post<Hotel>('/rest/hotels', hotel);
  }

  getHotels(): Observable<Hotel[]> {
    return this.crud.get<Hotel[]>('/rest/hotels')
      .map((hotels: Hotel[]) => Observable.from(hotels)
        .map(hotel => this.mapService.enrichHotelWithCoordinate(hotel))
        .concatAll()
        .toArray())
      .concatAll();
  }

  getHotel(id: number): Observable < Hotel > {
    return this.crud.get<Hotel>('/rest/hotels/' + id)
      .map(hotel => this.mapService.enrichHotelWithCoordinate(hotel));
  }

  deleteHotel(id: number): Observable < Response > {
    return this.crud.doDelete('/rest/hotels/' + id);
  }
}
