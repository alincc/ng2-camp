import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMapTo';
import {StateUpdates, Effect, toPayload} from '@ngrx/effects'
import {HotelActions} from '../actions/hotel.actions';
import {HotelService} from '../shared/hotel.service';
import {AppState} from '../reducers/index';
import {Hotel} from '../model/backend-typings';

@Injectable()
export class HotelEffects {
  constructor(    private updates$: StateUpdates<AppState>,
                  private hotelService: HotelService,
                  private hotelActions: HotelActions) {
  }

  @Effect()
  loadCollectionOnInit$ = Observable.of(this.hotelActions.loadCollection());

  /*@Effect()
  loadCollection$ = this.updates$
    .whenAction(HotelActions.LOAD_COLLECTION)
    .switchMapTo(this.hotelService.getHotels())
    .map((hotels) => this.hotelActions.loadCollectionSuccess(hotels));

  @Effect()
  addHotelToCollection$ = this.updates$
    .whenAction(HotelActions.ADD_TO_COLLECTION)
    .map<Hotel>(toPayload)
    .mergeMap(hotel => this.hotelService.saveHotel(hotel)
      .mapTo(this.hotelActions.addToCollectionSuccess(hotel))
      .catch(() => Observable.of(
        this.hotelActions.addToCollectionFail(hotel)
      ))
    );*/
}
