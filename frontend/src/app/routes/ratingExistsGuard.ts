import 'rxjs/add/operator/take';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/concat';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {Guard, TraversalCandidate} from '@ngrx/router';
import {AppState, getRatingsLoaded, hasRating} from '../reducers';
import {RatingService} from "../shared/rating.service";
import {RatingActions} from "../actions/rating.actions";

@Injectable()
export class RatingExistsGuard implements Guard {
  constructor(private store: Store<AppState>,
              private ratingService: RatingService,
              private ratingActions: RatingActions) {
  }

  waitForRatingsToLoad() {
    return this.store.let(getRatingsLoaded())
      .filter(loaded => loaded)
      .take(1);
  }

  hasRatingInStore(id: number){
    return this.store.let(hasRating(id)).take(1);
  }

  hasRatingInApi(id: number) {
    return this.ratingService.getRating(id)
      .map(rating => this.ratingActions.loadRating(rating))
      .do(action => this.store.dispatch(action))
      .map(rating => !!rating)
      .catch(() => Observable.of(false));
  }

  hasRating(id: number) {
    return this.hasRatingInStore(id)
      .switchMap(inStore => {
        if (inStore) {
          return Observable.of(inStore);
        }
        return this.hasRatingInApi(id);
      });
  }

  protectRoute(candidate: TraversalCandidate) {
    if(candidate.routeParams.ratingId === 'new') {
      return Observable.of(false);
    }
    return this.waitForRatingsToLoad()
      .switchMapTo(this.hasRating(candidate.routeParams.ratingId));
  }

}
