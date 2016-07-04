import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import {Camp} from '../model/backend-typings';

@Injectable()
export class CampActions {

  static LOAD_CAMPS = '[Camp] Load Camps';
  loadCamps(): Action {
    return {
      type: CampActions.LOAD_CAMPS
    };
  }

  static LOAD_CAMPS_SUCCESS = '[Camp] Load Camps Success';
  loadCampsSuccess(camps: Camp[]): Action {
    return {
      type: CampActions.LOAD_CAMPS_SUCCESS,
      payload: camps
    };
  }

  static SAVE_CAMP = '[Camp] Save Camp';
  saveCamp(camp: Camp): Action {
    return {
      type: CampActions.SAVE_CAMP,
      payload: camp
    };
  }

  static SAVE_CAMP_SUCCESS = '[Camp] Save Camp Success';
  saveCampSuccess(camp: Camp): Action {
    return {
      type: CampActions.SAVE_CAMP_SUCCESS,
      payload: camp
    };
  }

  static SAVE_CAMP_FAIL = '[Camp] Save Camp Fail';
  saveCampFail(camp: Camp): Action {
    return {
      type: CampActions.SAVE_CAMP_FAIL,
      payload: camp
    };
  }

  static DELETE_CAMP = '[Camp] Delete Camp';
  deleteCamp(camp: Camp): Action {
    return {
      type: CampActions.DELETE_CAMP,
      payload: camp
    };
  }

  static DELETE_CAMP_SUCCESS = '[Camp] Delete Camp Success';
  deleteCampSuccess(camp: Camp): Action {
    return {
      type: CampActions.DELETE_CAMP_SUCCESS,
      payload: camp
    };
  }

  static DELETE_CAMP_FAIL = '[Camp] Delete Camp Fail';
  deleteCampFail(camp: Camp): Action {
    return {
      type: CampActions.DELETE_CAMP_FAIL,
      payload: camp
    };
  }

  static LOAD_CAMP = '[Camp] Load Camp';
  loadCamp(camp: Camp): Action {
    return {
      type: CampActions.LOAD_CAMP,
      payload: camp
    };
  }

}
