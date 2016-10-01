import {Component} from '@angular/core';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/interval';
import {Hotel, Rating, Offer} from '../../model/backend-typings';
import {Store} from '@ngrx/store';
import {AppState, getHotel, getRatingsByHotelId, getOffersByHotelId} from '../../reducers';
import {Observable} from 'rxjs/Observable';
import {HotelActions} from '../../actions/hotel.actions';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'hotel-detail-page',
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

  constructor(private route: ActivatedRoute,
              private hotelActions: HotelActions,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.hotel = this.route.params
      .pluck<string>('hotelId')
      .distinctUntilChanged()
      .map(hotelId => parseInt(hotelId))
      .flatMap(hotelId =>this.store.let(getHotel(hotelId)));
    this.ratings = this.hotel
      .flatMap(hotel => this.store.let(getRatingsByHotelId(hotel.id)));
    this.offers = this.hotel
      .flatMap(hotel => this.store.let(getOffersByHotelId(hotel.id)));
  }

  deleteHotel(hotel: Hotel) {
    this.store.dispatch(this.hotelActions.deleteHotel(hotel));
    // TODO Show error via effects, also route via effects once hotel got deleted
    /*if (hotel && hotel.id) {
      this.hotelService.deleteHotel(hotel.id).subscribe(() => {
        Materialize.toast('Deleted hotel', 4000, 'rounded');
        this.router.go('/hotels');
      }, () => {
        Materialize.toast('Error: Could not delete hotel', 4000, 'rounded');
      });
    }*/
  }
}
