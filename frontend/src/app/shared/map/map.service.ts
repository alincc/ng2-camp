import {Injectable} from '@angular/core';
import {Hotel} from '../../model/backend-typings';
import {Http} from '@angular/http';
import {Coordinate} from './coordinate';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MapService {

  private apiUrl: string = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  private apiKey: string = 'AIzaSyB9aWalvPN_ThVFnN90dVrTlPRQSykiYwo';

  constructor(private http: Http) {
  }

  public getCoordinates(hotel: Hotel): Observable<Coordinate> {
    let addressInput: string = ['hotel ' + hotel.name, hotel.city, hotel.street, hotel.countryCode].join(',');
    return this.http.get(this.apiUrl + addressInput + '&key=' + this.apiKey)
      .filter(response => response.status === 200)
      .map(response => response.json())
      .filter(data => data.status === 'OK' && data.results[0])
      .map(data => {
        return new Coordinate(
          data.results[0].geometry.location.lat,
          data.results[0].geometry.location.lng
        );
      });
  }
}
