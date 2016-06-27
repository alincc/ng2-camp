import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/let';

import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';
import { routerReducer, RouterState } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import hotelsReducer, * as fromHotels from './hotel.reducer';

export interface AppState {
  router: RouterState;
  hotels: fromHotels.HotelsState;
}

export function getHotelState() {
  return (state$: Observable<AppState>) => state$
    .select(appState => appState.hotels);
}

export function getHotelEntities() {
  return compose(fromHotels.getHotelEntities(), getHotelState());
}

/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
export default compose(combineReducers)({
  router: routerReducer
});

