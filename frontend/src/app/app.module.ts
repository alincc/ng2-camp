import "angular2-materialize";
import {AUTH_PROVIDERS} from 'angular2-jwt';
import {provideRouter, LinkTo} from '@ngrx/router';
import {provideStore} from '@ngrx/store';
import {runEffects} from '@ngrx/effects';
import {GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';
import {instrumentStore} from '@ngrx/store-devtools';
import {useLogMonitor} from '@ngrx/store-log-monitor';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import {routes} from './routes/routes';
import {AuthGuard} from './routes/authGuard';
import reducer from './reducers';
import {EFFECTS} from './effects';
import {ACTIONS} from './actions';
import services from './shared';

import { App } from './app.component';

@NgModule({
  bootstrap: [
    App
  ],
  declarations: [
    App,
    LinkTo
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    ...AUTH_PROVIDERS,
    ...GOOGLE_MAPS_PROVIDERS,
    AuthGuard,
    services,
    instrumentStore({
      monitor: useLogMonitor({
        position: 'right',
        visible: false,
      })
    }),
    ...ACTIONS,
    provideStore(reducer),
    runEffects(EFFECTS),
    provideRouter(routes),
  ]
})

export class AppModule {

}
