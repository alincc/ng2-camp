import "angular2-materialize";
/*
 * Providers provided by Angular
 */
import {bootstrap} from '@angular/platform-browser-dynamic';
/*
 * Platform and Environment
 * our providers/directives/pipes
 */
import {DIRECTIVES, PIPES, PROVIDERS} from './platform/browser';
import {ENV_PROVIDERS} from './platform/environment';
import {AUTH_PROVIDERS} from 'angular2-jwt';
import { provideRouter } from '@ngrx/router';
import { provideStore } from '@ngrx/store';
import { runEffects } from '@ngrx/effects';
import { routes } from 'app/routes/routes';
import { AuthGuard } from 'app/routes/authGuard';

import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';

import reducer from './app/reducers';
import effects from './app/effects';
import actions from './app/actions';
import services from './app/shared/index';

/*
 * App Component
 * our top level component that holds all of our components
 */
import {App} from './app/app.component';

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
export function main(): Promise<any> {

  return bootstrap(App, [
    ...PROVIDERS,
    ...ENV_PROVIDERS,
    ...DIRECTIVES,
    ...PIPES,
    ...AUTH_PROVIDERS,
    provideStore(reducer),
    runEffects(effects),
    ...ANGULAR2_GOOGLE_MAPS_PROVIDERS,
    provideRouter(routes),
    AuthGuard,
    actions,
    services
  ])
    .catch(err => console.error(err));

}


/*
 * Vendors
 * For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
 * You can also import them in vendors to ensure that they are bundled in one file
 * Also see custom-typings.d.ts as you also need to do `typings install x` where `x` is your module
 */


if ('development' === ENV) {
  document.addEventListener('DOMContentLoaded', () => main());
}
