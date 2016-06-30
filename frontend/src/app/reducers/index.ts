import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/let';
import { Action} from '@ngrx/store';
import {HotelActions} from '../actions/index';
import {Hotel} from '../model/backend-typings';

export interface AppState {
  hotels: Hotel[];
}

export const defaultState: AppState = {
  hotels: []
}

export const hotels = (state = defaultState, action:Action):AppState => {
  switch (action.type) {
    case HotelActions.LOAD_COLLECTION:
    {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case HotelActions.LOAD_COLLECTION_SUCCESS:
    {
      const hotels:Hotel[] = action.payload;
      return {
        hotels: hotels
      };
    }

    default:
    {
      return state;
    }
  }
}


