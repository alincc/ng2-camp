import {Injectable, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMapTo';
import {Actions, Effect} from '@ngrx/effects';
import {RatingService} from "../shared/rating.service";
import {RatingActions} from "../actions/rating.actions";

@Injectable()
export class RatingEffects {
  constructor(private action$:Actions,
              private ratingService:RatingService,
              private ratingActions:RatingActions) {
  }

  @Effect()
  loadRatingsOnInit = Observable.of(this.ratingActions.loadRatings());

  @Effect()
  loadRatings = this.action$
    .ofType(RatingActions.LOAD_RATINGS)
    .switchMapTo(this.ratingService.getRatings())
    .map(ratings => this.ratingActions.loadRatingsSuccess(ratings));

  /*@Effect()
  saveRating = this.action$
    .ofType(RatingActions.SAVE_RATING)
    .map<Rating>(toPayload)
    .flatMap(rating => this.ratingService.saveRating(rating)
      .map(savedRating => this.ratingActions.saveRatingSuccess(savedRating))
      .catch(() => Observable.of(
        this.ratingActions.saveRatingFail(rating)
      ))
    );

  @Effect()
  saveRatingSuccess = this.action$
    .ofType(RatingActions.SAVE_RATING_SUCCESS)
    .map<Rating>(toPayload)
    .do(rating => {
      this.router.go('/ratings/' + rating.id)
    }).filter(() => false);

  @Effect()
  deleteRating = this.action$
    .ofType(RatingActions.DELETE_RATING)
    .map<Rating>(toPayload)
    .flatMap(rating => this.ratingService.deleteRating(rating.id)
      .mapTo(this.ratingActions.deleteRatingSuccess(rating))
      .catch(() => Observable.of(
        this.ratingActions.deleteRatingFail(rating)
      ))
    );*/

}
