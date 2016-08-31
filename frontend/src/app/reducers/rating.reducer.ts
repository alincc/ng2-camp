import {Rating} from '..//model/backend-typings';
import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {RatingActions} from "../actions/rating.actions";

export interface RatingsState {
  loaded:boolean;
  loading:boolean;
  ratings:Rating[];
}
;

const initialState:RatingsState = {
  loaded: false,
  loading: false,
  ratings: []
};

export default function (state = initialState, action:Action):RatingsState {
  switch (action.type) {
    case RatingActions.LOAD_RATINGS:
    {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case RatingActions.LOAD_RATINGS_SUCCESS:
    {
      return {
        loaded: true,
        loading: false,
        ratings: action.payload,
      };
    }

    case RatingActions.SAVE_RATING_SUCCESS:
    case RatingActions.DELETE_RATING_FAIL:
    {
      return Object.assign({}, state, {
        ratings: [
          ...state.ratings,
          action.payload
        ]
      })
    }

    case RatingActions.DELETE_RATING_SUCCESS:
    case RatingActions.SAVE_RATING_FAIL:
    {
      return Object.assign({}, state, {
        ids: state.ratings.filter(rating => rating.id !== rating.id)
      });
    }

    default:
    {
      return state;
    }
  }
}

export function getRatingsLoaded() {
  return (state$:Observable<RatingsState>) => state$
    .select(s => s.loaded);
}

export function getRatingsLoading() {
  return (state$:Observable<RatingsState>) => state$
    .select(s => s.loading);
}
export function hasRating(id:number) {
  return (state$:Observable<RatingsState>) => state$
    .select(s => s.ratings
      .filter(rating => rating.id.toString() === id.toString()));
}

export function getRatings() {
  return (state$:Observable<RatingsState>) => state$
    .select(s => s.ratings);
}

export function getByHotelId(id:number) {
  return (state$:Observable<RatingsState>) => state$
    .select(s => s.ratings
      .some(rating => {
        return rating.hotel.id.toString() === id.toString()
      }));
}

export function getRating(id:number) {
  return (state$:Observable<RatingsState>) => state$
    .select(s => s.ratings)
    .flatMap(ratings => Observable.from(ratings))
    .filter(rating => rating.id.toString() === id.toString());
}
