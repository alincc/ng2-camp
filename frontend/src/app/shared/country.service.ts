import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/toArray';
import {Country} from '../model/backend-typings';

@Injectable()
export class CountryService {

  private baseUrl:string = "https://restcountries.eu/rest/v1";

  constructor(private http:Http) {
  }

  getCountriesAuthenticated():Observable<Country[]> {
    return this.http.get(this.baseUrl + '/all')
      .map(response => response.json())
      .flatMap(countries => Observable.from(countries))
      .map(country => {
          return {
            name: country.name,
            code: country.alpha2Code
          } as Country;
        }
      )
      .toArray();
  }
}
