import 'rxjs/add/operator/take';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/concat';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {AppState, getCampsLoaded, hasCamp} from '../reducers';
import {CampService} from "../shared/camp.service";
import {CampActions} from "../actions/camp.actions";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";

@Injectable()
export class CampExistsGuard implements CanActivate {
  constructor(private store: Store<AppState>,
              private campService: CampService,
              private campActions: CampActions) {
  }

  waitForCampsToLoad() {
    return this.store.let(getCampsLoaded())
      .filter(loaded => loaded)
      .take(1);
  }

  hasCampInStore(id: number){
    return this.store.let(hasCamp(id)).take(1);
  }

  hasCampInApi(id: number) {
    return this.campService.getCamp(id)
      .map(camp => this.campActions.loadCamp(camp))
      .do(action => this.store.dispatch(action))
      .map(camp => !!camp)
      .catch(() => Observable.of(false));
  }

  hasCamp(id: number) {
    return this.hasCampInStore(id)
      .switchMap(inStore => {
        if (inStore) {
          return Observable.of(inStore);
        }
        return this.hasCampInApi(id);
      });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if(route.params.campId === 'new') {
      return Observable.of(false);
    }
    return this.waitForCampsToLoad()
      .switchMapTo(this.hasCamp(route.params.campId));
  }

}
