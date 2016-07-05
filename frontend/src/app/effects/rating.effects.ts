import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMapTo';
import {StateUpdates, Effect, toPayload} from '@ngrx/effects';
import {Router} from '@ngrx/router';
import {AppState} from '../reducers';
import {Rating} from '../model/backend-typings';
import {RatingService} from "../shared/rating.service";
import {RatingActions} from "../actions/rating.actions";

@Injectable()
export class RatingEffects {
  constructor(private updates$:StateUpdates<AppState>,
              private ratingService:RatingService,
              private router:Router,
              private ratingActions:RatingActions) {
  }

  @Effect()
  loadRatingsOnInit = Observable.of(this.ratingActions.loadRatings());

  @Effect()
  loadRatings = this.updates$
    .whenAction(RatingActions.LOAD_RATINGS)
    .switchMapTo(this.ratingService.getRatings())
    .map(ratings => this.ratingActions.loadRatingsSuccess(ratings));

  /*@Effect()
  saveRating = this.updates$
    .whenAction(RatingActions.SAVE_RATING)
    .map<Rating>(toPayload)
    .flatMap(rating => this.ratingService.saveRating(rating)
      .map(savedRating => this.ratingActions.saveRatingSuccess(savedRating))
      .catch(() => Observable.of(
        this.ratingActions.saveRatingFail(rating)
      ))
    );

  @Effect()
  saveRatingSuccess = this.updates$
    .whenAction(RatingActions.SAVE_RATING_SUCCESS)
    .map<Rating>(toPayload)
    .do(rating => {
      this.router.go('/ratings/' + rating.id)
    }).filter(() => false);

  @Effect()
  deleteRating = this.updates$
    .whenAction(RatingActions.DELETE_RATING)
    .map<Rating>(toPayload)
    .flatMap(rating => this.ratingService.deleteRating(rating.id)
      .mapTo(this.ratingActions.deleteRatingSuccess(rating))
      .catch(() => Observable.of(
        this.ratingActions.deleteRatingFail(rating)
      ))
    );*/

}
