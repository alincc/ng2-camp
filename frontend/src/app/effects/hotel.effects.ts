import {Injectable, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMapTo';
import {Actions, Effect} from '@ngrx/effects';
import {HotelActions} from '../actions/hotel.actions';
import {HotelService} from '../shared/hotel.service';
import {go} from "@ngrx/router-store";

@Injectable()
export class HotelEffects {

  constructor(private actions$:Actions,
              private hotelService:HotelService,
              private hotelActions:HotelActions) {
  }

  @Effect()
  loadHotelsOnInit = Observable.of(this.hotelActions.loadHotels());

  @Effect()
  loadHotels = this.actions$
    .ofType(HotelActions.LOAD_HOTELS)
    .switchMapTo(this.hotelService.getHotels())
    .map(hotels => this.hotelActions.loadHotelsSuccess(hotels));

  @Effect()
  saveHotel = this.actions$
    .ofType(HotelActions.SAVE_HOTEL)
    .map(action => action.payload)
    .flatMap(hotel => this.hotelService.saveHotel(hotel)
      .map(savedHotel => this.hotelActions.saveHotelSuccess(savedHotel))
      .catch(() => Observable.of(
        this.hotelActions.saveHotelFail(hotel)
      ))
    );

  @Effect()
  saveHotelSuccess = this.actions$
    .ofType(HotelActions.SAVE_HOTEL_SUCCESS)
    .map(action => action.payload)
    .do(hotel => {
      go(['/hotels/', {routeParam: hotel.id}])
    }).filter(() => false);

  @Effect()
  deleteHotel = this.actions$
    .ofType(HotelActions.DELETE_HOTEL)
    .map(action => action.payload)
    .flatMap(hotel => this.hotelService.deleteHotel(hotel.id)
      .mapTo(this.hotelActions.deleteHotelSuccess(hotel))
      .catch(() => Observable.of(
        this.hotelActions.deleteHotelFail(hotel)
      ))
    );

}
