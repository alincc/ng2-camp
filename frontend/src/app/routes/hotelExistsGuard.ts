import 'rxjs/add/operator/take';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/concat';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {AppState, getHotelsLoaded, hasHotel} from '../reducers';
import {HotelActions} from '../actions/hotel.actions';
import {HotelService} from '../shared/hotel.service';
import {ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate} from "@angular/router";

@Injectable()
export class HotelExistsGuard implements CanActivate {
  constructor(private store: Store<AppState>,
              private hotelService: HotelService,
              private hotelActions: HotelActions) {
  }

  waitForHotelsToLoad() {
    return this.store.let(getHotelsLoaded())
      .filter(loaded => loaded)
      .take(1);
  }

  hasHotelInStore(id: number){
    return this.store.let(hasHotel(id)).take(1);
  }

  hasHotelInApi(id: number) {
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

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if(route.params.hotelId === 'new') {
      return Observable.of(false);
    }
    return this.waitForHotelsToLoad()
      .switchMapTo(this.hasHotel(route.params.hotelId));
  }

}
