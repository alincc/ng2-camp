import {Component} from '@angular/core';
import {RouteParams, Router} from '@ngrx/router';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/interval';
import {HotelService} from '../../shared/hotel.service';
import {Hotel, Rating, Offer} from '../../model/backend-typings';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers/index';
import {Observable} from 'rxjs/Observable';
import {HotelDetailComponent} from '../../components/hotel-detail/hotel-detail.component';
import {RatingService} from '../../shared/rating.service';
import * as Materialize from 'angular2-materialize/dist/index';
import {OfferService} from '../../shared/offer.service';

@Component({
  selector: 'hotel-detail-page',
  directives: [HotelDetailComponent],
  providers: [],
  template: `
    <hotel-detail 
        [hotel]="hotel | async" 
        [ratings]="ratings | async"
        [offers]="offers | async"
        (delete)="deleteHotel($event)">
    </hotel-detail>
    `
})
export class HotelDetailPageComponent {

  hotel: Observable<Hotel>;
  ratings: Observable<Rating[]>;
  offers: Observable<Offer[]>;

  hotelId: number;

  constructor(private routeParams: RouteParams,
              private router: Router,
              private ratingService: RatingService,
              private offerService: OfferService,
              private hotelService: HotelService,
              private store: Store<AppState>) {
    this.hotel = this.routeParams
      .pluck<string>('hotelId')
      .distinctUntilChanged()
      .flatMap(hotelId => {
        return this.store.select<Hotel[]>('hotels')
          .flatMap(hotels => Observable.from(hotels))
          .filter(hotel => {
            return hotel.id.toString() === hotelId.toString();
          })
      })
  }

  ngOnInit() {
    this.ratings = this.hotel
      .flatMap(hotel => this.ratingService.getByHotelId(hotel.id));
    this.offers = this.hotel
      .flatMap(hotel => this.offerService.getByHotelId(hotel.id));
  }

  deleteHotel(hotel: Hotel) {
    if (hotel && hotel.id) {
      this.hotelService.deleteHotel(hotel.id).subscribe(() => {
        Materialize.toast('Deleted hotel', 4000, 'rounded');
        this.router.go('/hotels');
      }, () => {
        Materialize.toast('Error: Could not delete hotel', 4000, 'rounded');
      });
    }
  }
}
