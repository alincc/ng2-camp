import {Hotel} from '..//model/backend-typings';
import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {HotelActions} from '../actions/hotel.actions';

export interface HotelsState {
  loaded: boolean;
  loading: boolean;
  hotels: Hotel[];
};

const initialState: HotelsState = {
  loaded: false,
  loading: false,
  hotels: []
};

export default function (state = initialState, action: Action): HotelsState {
  switch (action.type) {
    case HotelActions.LOAD_HOTELS:
    {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case HotelActions.LOAD_HOTELS_SUCCESS:
    {
      return {
        loaded: true,
        loading: false,
        hotels: action.payload,
      };
    }

    case HotelActions.SAVE_HOTEL_SUCCESS:
    case HotelActions.DELETE_HOTEL_FAIL:
    {
      return Object.assign({}, state, {
        hotels: [
          ...state.hotels,
          action.payload
        ]
      })
    }

    case HotelActions.DELETE_HOTEL_SUCCESS:
    case HotelActions.SAVE_HOTEL_FAIL:
    {
      return Object.assign({}, state, {
        ids: state.hotels.filter(hotel => hotel.id !== hotel.id)
      });
    }

    default:
    {
      return state;
    }
  }
}

export function getHotelsLoaded() {
  return (state$: Observable<HotelsState>) => state$
    .select(s => s.loaded);
}

export function getHotelsLoading() {
  return (state$: Observable<HotelsState>) => state$
    .select(s => s.loading);
}
export function hasHotel(id: number) {
  return (state$: Observable<HotelsState>) => state$
    .select(s => s.hotels
      .filter(hotel => hotel.id.toString() === id.toString()));
}

export function getHotel(id:number) {
    return (state$: Observable<HotelsState>) => state$
      .select(s => s.hotels)
    .flatMap(hotels => Observable.from(hotels))
    .filter(hotel => hotel.id.toString() === id.toString());
}

export function getHotels() {
  return (state$: Observable<HotelsState>) => state$
    .select(s => s.hotels);
}
