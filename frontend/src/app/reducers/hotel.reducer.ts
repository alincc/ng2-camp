import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import {Hotel} from '../model/backend-typings';
import {HotelActions} from '../actions/index';


export interface HotelsState {
  ids: number[];
  entities: { [id: number]: Hotel };
};

const initialState: HotelsState = {
  ids: [],
  entities: {}
};

export default function(state = initialState, action: Action): HotelsState {
  switch (action.type) {
    case HotelActions.LOAD_COLLECTION_SUCCESS: {
      const hotels: Hotel[] = action.payload;
      const newHotels = hotels.filter(hotel => !state.entities[hotel.id]);

      const newHotelIds = newHotels.map(hotel => hotel.id);
      const newHotelEntites = newHotels.reduce((entities: { [id: number]: Hotel }, hotel: Hotel) => {
        return Object.assign(entities, {
          [hotel.id]: hotel
        });
      }, {});

      return {
        ids: [ ...state.ids, ...newHotelIds ],
        entities: Object.assign({}, state.entities, newHotelEntites)
      };
    }

    case HotelActions.ADD_TO_COLLECTION_SUCCESS:{
      const hotel: Hotel = action.payload;

      if (state.ids.includes(hotel.id)) {
        return state;
      }

      return Object.assign({}, state, {
        ids: [ ...state.ids, hotel.id ]
      });
    }

    default: {
      return state;
    }
  }
}

export function getHotelEntities() {
  return (state$: Observable<HotelsState>) => state$
    .select(s => s.entities);
};

