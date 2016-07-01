import {Component, OnInit, OnDestroy} from '@angular/core';
import {Hotel} from '../../model/backend-typings';
import {HotelService} from '../../shared/hotel.service';
import {RouteParams, Router} from '@ngrx/router';
import {HotelActions} from '../../actions/hotel.actions';
import {Country} from '../../model/country';
import {CountryService} from '../../shared/country.service';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers/index';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/observable/of';
import {HotelEditComponent} from '../../components/hotel-edit/hotel-edit.component';

@Component({
  selector: 'hotel-edit-page',
  directives: [HotelEditComponent],
  template: `
    <hotel-edit 
      [hotel]="hotel | async"
      [countries]="countries | async"
      (saveHotel)="saveHotel($event)">
    </hotel-edit>
`
})
export class HotelEditPageComponent implements OnInit, OnDestroy {

  hotel: Observable<Hotel>;
  countries: Observable<Country[]>;
  hotelIdSubscription: Subscription;

  constructor(private hotelService: HotelService,
              private countryService: CountryService,
              private router: Router,
              private store: Store<AppState>,
              private hotelActions: HotelActions,
              private routeParams: RouteParams) {
  }

  ngOnInit() {
    this.countries = this.countryService
      .getAllCountries();

    this.hotelIdSubscription = this.routeParams.pluck<number>('hotelId')
      .subscribe(hotelId => {
        if (!isNaN(hotelId)) {
          this.hotel = this.store.select<Hotel[]>('hotels')
              .flatMap((hotels: Hotel[]) => Observable.from(hotels))
              .filter(hotel => hotel.id === hotelId);
        } else {
          this.hotel = Observable.of({} as Hotel);
        }
      });
  }

  ngOnDestroy() {
    this.hotelIdSubscription.unsubscribe();
  }

  saveHotel(hotel: Hotel) {
    this.store.dispatch(this.hotelActions.addToCollection(this.hotel));
    this.hotelService.saveHotel(hotel).subscribe(hotel =>
      this.router.go('/hotels/' + hotel.id));
  }

}
