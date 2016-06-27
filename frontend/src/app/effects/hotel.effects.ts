import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {StateUpdates, Effect} from '@ngrx/effects'

@Injectable()
export class HotelEffects {
  constructor(private updates$:StateUpdates<any>) {
  }

  @Effect() login$ = this.updates$
  // Listen for the 'LOGIN' action
    .whenAction('LOGIN')
    // Map the payload into JSON to use as the request body
    .map(update => JSON.stringify(update.action.payload))
    .switchMap(payload => console.log(payload));
}
