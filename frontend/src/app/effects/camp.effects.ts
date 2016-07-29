import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMapTo';
import {StateUpdates, Effect, toPayload} from '@ngrx/effects';
import {Router} from '@ngrx/router';
import {AppState} from '../reducers';
import {Camp} from '../model/backend-typings';
import {CampService} from "../shared/camp.service";
import {CampActions} from "../actions/camp.actions";

@Injectable()
export class CampEffects {
  constructor(private updates$:StateUpdates<AppState>,
              private campService:CampService,
              private router:Router,
              private campActions:CampActions) {
  }

  @Effect()
  loadCampsOnInit = Observable.of(this.campActions.loadCamps());

  @Effect()
  loadCamps = this.updates$
    .whenAction(CampActions.LOAD_CAMPS)
    .switchMapTo(this.campService.getCamps())
    .map(camps => this.campActions.loadCampsSuccess(camps));

  @Effect()
  saveCamp = this.updates$
    .whenAction(CampActions.SAVE_CAMP)
    .map<Camp>(toPayload)
    .flatMap(camp => this.campService.saveCamp(camp)
      .map(savedCamp => this.campActions.saveCampSuccess(savedCamp))
      .catch(() => Observable.of(
        this.campActions.saveCampFail(camp)
      ))
    );

  @Effect()
  saveCampSuccess = this.updates$
    .whenAction(CampActions.SAVE_CAMP_SUCCESS)
    .map<Camp>(toPayload)
    .do(camp => {
      this.router.go('/camps/' + camp.id)
    }).filter(() => false);

  @Effect()
  deleteCamp = this.updates$
    .whenAction(CampActions.DELETE_CAMP)
    .map<Camp>(toPayload)
    .flatMap(camp => this.campService.deleteCamp(camp.id)
      .mapTo(this.campActions.deleteCampSuccess(camp))
      .catch(() => Observable.of(
        this.campActions.deleteCampFail(camp)
      ))
    );

}
