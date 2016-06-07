import {Injectable} from '@angular/core';
import {Hotel} from '../../model/backend-typings';
import {Http} from '@angular/http';
import {Coordinate} from './coordinate';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class MapService {

  private apiUrl: string = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  private apiKey: string = 'AIzaSyB9aWalvPN_ThVFnN90dVrTlPRQSykiYwo';

  constructor(private http: Http) {
  }

  public getCoordinates(hotel: Hotel): Observable<Coordinate> {
    let subject = new Subject<Coordinate>();
    let addressInput: string = [hotel.name, hotel.street, hotel.streetNumber, hotel.zipCode, hotel.city, hotel.countryCode].join(',');
    this.http.get(this.apiUrl + addressInput + '&key=' + this.apiKey).subscribe(response => {
        if (response.status === 200 && response.json().results[0]) {

          let coordinate: Coordinate = new Coordinate(
            response.json().results[0].geometry.location.lat,
            response.json().results[0].geometry.location.lng
          );
          console.log('coordinate', coordinate);
          subject.next(coordinate);
        }
      }
    );
    return subject.asObservable();


    // let geocoder = new google.maps.Geocoder();
    //
    // geocoder.geocode({address: addressInput}, function (results, status) {
    //   if (status === google.maps.GeocoderStatus.OK) {
    //     return new Coordinate(results[0].geometry.location.lat, results[0].geometry.location.lng);
    //   }
    // });
  }
}
