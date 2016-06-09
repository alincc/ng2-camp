import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toArray';
import {Observer} from 'rxjs/Observer';
import {Country} from '../model/country';
import {Subscription} from 'rxjs/Rx';

@Injectable()
export class CountryService {

  private baseUrl: string = 'https://restcountries.eu/rest/v1';
  private countries: Country[];
  private observer: Observer<Country[]>;

  private subscription: Subscription;

  constructor(private http: Http) {
  }

  getAllCountries(): Observable<Country[]> {
    if (this.countries) {
      return Observable.of(this.countries);
    }

    let observable = new Observable<Country[]>(observer => this.observer = observer);
    this.subscription = this.fetchCountries().subscribe(
      (countries) => {
        this.countries = countries;
        this.observer.next(this.countries);
      }
    );
    return observable;
  }

  getCountryByCode(isoCode: string): Observable<Country> {
    return this.getAllCountries()
      .flatMap((countries: Country[]) => Observable.from(countries))
      .filter((country: Country) => {
        return country.code === isoCode;
      });
  }

  private fetchCountries(): Observable<Country[]> {
    return this.http.get(this.baseUrl + '/all')
      .map((res: Response) => res.json())
      .flatMap((countries: ISOCountry[]) => Observable.from(countries))
      .map(this.mapCountry)
      .toArray();
  }

  private mapCountry(country: ISOCountry): Country {
    return {
      name: country.name,
      code: country.alpha2Code
    };
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

interface ISOCountry {
  name: string;
  alpha2Code: string;
}
