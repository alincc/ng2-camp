import 'rxjs/add/operator/take';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/concat';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {Guard, TraversalCandidate} from '@ngrx/router';
import {AppState, getHotelsLoaded, hasHotel} from '../reducers';
import {HotelActions} from '../actions/hotel.actions';
import {HotelService} from '../shared/hotel.service';

@Injectable()
export class HotelExistsGuard implements Guard {
  constructor(private store: Store<AppState>,
              private hotelService: HotelService,
              private hotelActions: HotelActions) {
  }

  waitForCollectionToLoad() {
    return this.store.let(getHotelsLoaded())
      .filter(loaded => loaded)
      .take(1);
  }

  hasHotelInStore(id: number) {
    return this.store.let(hasHotel(id)).take(1);
  }

  hasHotelInApi(id: number) {
    console.log(id);
    return this.hotelService.getHotel(id)
      .map(hotel => this.hotelActions.loadHotel(hotel))
      .do(action => this.store.dispatch(action))
      .map(hotel => !!hotel)
      .catch(() => Observable.of(false));
  }

  hasHotel(id: number) {
    return this.hasHotelInStore(id)
      .switchMap(inStore => {
        if (inStore) {
          return Observable.of(inStore);
        }
        return this.hasHotelInApi(id);
      });
  }

  protectRoute(candidate: TraversalCandidate) {
    console.log(candidate.routeParams);
    return this.waitForCollectionToLoad()
      .switchMapTo(this.hasHotel(candidate.routeParams.hotelId));
  }

}
