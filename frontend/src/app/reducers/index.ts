import '@ngrx/core/add/operator/select';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/let';
import {Observable} from 'rxjs/Observable';
import hotelReducer, * as fromHotels from './hotel.reducer';
import campReducer, * as fromCamps from './camp.reducer';

export interface AppState {
  hotels: fromHotels.HotelsState,
  camps: fromCamps.CampsState
}

export default combineReducers({
  hotels: hotelReducer,
  camps: campReducer
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

export function getHotel(id: number) {
  return compose(fromHotels.getHotel(id), getHotelsState());
}

export function getCampsState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.camps);
}

export function getCampsLoaded() {
  return compose(fromCamps.getCampsLoaded(), getCampsState());
}

export function hasCamp(id: number) {
  return compose(fromCamps.hasCamp(id), getCampsState());
}

export function getCamps() {
  return compose(fromCamps.getCamps(), getCampsState());
}

export function getCamp(id: number) {
  return compose(fromCamps.getCamp(id), getCampsState());
}



