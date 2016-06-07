import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/toArray';
import {Country} from '../model/backend-typings';

@Injectable()
export class CountryService {

  private baseUrl:string = "https://restcountries.eu/rest/v1";

  constructor(private http:Http) {
  }

  getAllCountries():Observable<Country[]> {
    return this.http.get(this.baseUrl + '/all')
      .map((res:Response) => res.json())
      .flatMap((countries:ISOCountry[]) => Observable.from(countries))
      .map((country:ISOCountry) => {
          return {
            name: country.name,
            code: country.alpha2Code
          };
        }
      )
      .toArray();
  }

}

interface ISOCountry {
  name:string;
  alpha2Code:string;
}
