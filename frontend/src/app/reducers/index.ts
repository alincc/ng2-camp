import '@ngrx/core/add/operator/select';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/let';
import {Observable} from 'rxjs/Observable';
import hotelReducer, * as fromHotels from './hotel.reducer';

export interface AppState {
  hotels: fromHotels.HotelsState
}

export default combineReducers({
  hotels: hotelReducer
});

export function getHotelsState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.hotels);
}

export function getHotelsLoaded() {
  return compose(fromHotels.getHotelsLoaded(), getHotelsState());
}

export function hasHotel(id: number) {
  return compose(fromHotels.hasHotel(id), getHotelsState());
}

export function getHotels() {
  return compose(fromHotels.getHotels(), getHotelsState());
}



