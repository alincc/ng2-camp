import {Camp} from '..//model/backend-typings';
import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {CampActions} from "../actions/camp.actions";

export interface CampsState {
  loaded: boolean;
  loading: boolean;
  camps: Camp[];
};

const initialState: CampsState = {
  loaded: false,
  loading: false,
  camps: []
};

export default function (state = initialState, action: Action): CampsState {
  switch (action.type) {
    case CampActions.LOAD_CAMPS:
    {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case CampActions.LOAD_CAMPS_SUCCESS:
    {
      return {
        loaded: true,
        loading: false,
        camps: action.payload,
      };
    }

    case CampActions.SAVE_CAMP_SUCCESS:
    case CampActions.DELETE_CAMP_FAIL:
    {
      return Object.assign({}, state, {
        camps: [
          ...state.camps,
          action.payload
        ]
      })
    }

    case CampActions.DELETE_CAMP_SUCCESS:
    case CampActions.SAVE_CAMP_FAIL:
    {
      return Object.assign({}, state, {
        ids: state.camps.filter(camp => camp.id !== camp.id)
      });
    }

    default:
    {
      return state;
    }
  }
}

export function getCampsLoaded() {
  return (state$: Observable<CampsState>) => state$
    .select(s => s.loaded);
}

export function getCampsLoading() {
  return (state$: Observable<CampsState>) => state$
    .select(s => s.loading);
}
export function hasCamp(id: number) {
  return (state$: Observable<CampsState>) => state$
    .select(s => s.camps.forEach(camp => {
      let campExists: boolean = false;
      if (camp.id.toString() === id.toString()) {
        campExists = true;
      }
      return campExists;
    }));
}

export function getCamps() {
  return (state$: Observable<CampsState>) => state$
    .select(s => s.camps);
};
