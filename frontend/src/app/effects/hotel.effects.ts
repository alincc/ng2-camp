import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMapTo';
import {StateUpdates, Effect} from '@ngrx/effects';
import {HotelActions} from '../actions/hotel.actions';
import {HotelService} from '../shared/hotel.service';
import {AppState} from '../reducers/index';

@Injectable()
export class HotelEffects {
  constructor(private updates$: StateUpdates<AppState>,
              private hotelService: HotelService,
              private hotelActions: HotelActions) {
  }

  @Effect()
  loadCollectionOnInit$ = Observable.of(this.hotelActions.loadCollection());

  @Effect()
  loadCollection$ = this.updates$
    .whenAction(HotelActions.LOAD_COLLECTION)
    .switchMapTo(this.hotelService.getHotelsWithCoordinates())
    .map((hotels) => this.hotelActions.loadCollectionSuccess(hotels));

}
