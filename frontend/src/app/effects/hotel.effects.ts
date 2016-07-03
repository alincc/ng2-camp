import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMapTo';
import {StateUpdates, Effect, toPayload} from '@ngrx/effects';
import {Router} from '@ngrx/router';
import {HotelActions} from '../actions/hotel.actions';
import {HotelService} from '../shared/hotel.service';
import {AppState} from '../reducers';
import {Hotel} from '../model/backend-typings';

@Injectable()
export class HotelEffects {
  constructor(private updates$: StateUpdates<AppState>,
              private hotelService: HotelService,
              private router: Router,
              private hotelActions: HotelActions) {
  }

  @Effect()
  loadHotelsOnInit = Observable.of(this.hotelActions.loadHotels());

  @Effect()
  loadHotels = this.updates$
    .whenAction(HotelActions.LOAD_HOTELS)
    .switchMapTo(this.hotelService.getHotelsWithCoordinates())
    .map((hotels) => this.hotelActions.loadHotelsSuccess(hotels));

  @Effect()
  saveHotel = this.updates$
    .whenAction(HotelActions.SAVE_HOTEL)
    .map<Hotel>(toPayload)
    .mergeMap(hotel => this.hotelService.saveHotel(hotel)
      .flatMap(savedHotel => this.hotelActions.saveHotelSuccess(savedHotel))
      .catch(() => Observable.of(
        this.hotelActions.saveHotelFail(hotel)
      ))
    );

  @Effect()
  saveHotelSuccess = this.updates$
    .whenAction(HotelActions.SAVE_HOTEL_SUCCESS)
    .map<Hotel>(toPayload)
    .mergeMap(hotel => this.router.go('/hotels/' + hotel.id));

  @Effect()
  deleteHotel = this.updates$
    .whenAction(HotelActions.DELETE_HOTEL)
    .map<Hotel>(toPayload)
    .mergeMap(hotel => this.hotelService.deleteHotel(hotel.id)
      .mapTo(this.hotelActions.deleteHotelSuccess(hotel))
      .catch(() => Observable.of(
        this.hotelActions.deleteHotelFail(hotel)
      ))
    );

}
