import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import {Rating} from '../model/backend-typings';

@Injectable()
export class RatingActions {

  static LOAD_RATINGS = '[Rating] Load Ratings';
  loadRatings(): Action {
    return {
      type: RatingActions.LOAD_RATINGS
    };
  }

  static LOAD_RATINGS_SUCCESS = '[Rating] Load Ratings Success';
  loadRatingsSuccess(ratings: Rating[]): Action {
    return {
      type: RatingActions.LOAD_RATINGS_SUCCESS,
      payload: ratings
    };
  }

  static SAVE_RATING = '[Rating] Save Rating';
  saveRating(rating: Rating): Action {
    return {
      type: RatingActions.SAVE_RATING,
      payload: rating
    };
  }

  static SAVE_RATING_SUCCESS = '[Rating] Save Rating Success';
  saveRatingSuccess(rating: Rating): Action {
    return {
      type: RatingActions.SAVE_RATING_SUCCESS,
      payload: rating
    };
  }

  static SAVE_RATING_FAIL = '[Rating] Save Rating Fail';
  saveRatingFail(rating: Rating): Action {
    return {
      type: RatingActions.SAVE_RATING_FAIL,
      payload: rating
    };
  }

  static DELETE_RATING = '[Rating] Delete Rating';
  deleteRating(rating: Rating): Action {
    return {
      type: RatingActions.DELETE_RATING,
      payload: rating
    };
  }

  static DELETE_RATING_SUCCESS = '[Rating] Delete Rating Success';
  deleteRatingSuccess(rating: Rating): Action {
    return {
      type: RatingActions.DELETE_RATING_SUCCESS,
      payload: rating
    };
  }

  static DELETE_RATING_FAIL = '[Rating] Delete Rating Fail';
  deleteRatingFail(rating: Rating): Action {
    return {
      type: RatingActions.DELETE_RATING_FAIL,
      payload: rating
    };
  }

  static LOAD_RATING = '[Rating] Load Rating';
  loadRating(rating: Rating): Action {
    return {
      type: RatingActions.LOAD_RATING,
      payload: rating
    };
  }

}
