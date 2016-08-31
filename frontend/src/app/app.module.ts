import "materialize-css";
import "angular2-materialize";
import {AuthHttp, provideAuth} from 'angular2-jwt';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {AgmCoreModule} from 'angular2-google-maps/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import {routes} from './routes/routes';
import {AuthGuard} from './routes/authGuard';
import reducer from './reducers';
import {ACTIONS} from './actions';
import services from './shared';

import { App } from './app.component';
import {MarkdownConverter} from "./components/markdown/markDownConverter";
import {CampEffects} from "./effects/camp.effects";
import {HotelEffects} from "./effects/hotel.effects";
import {OfferEffects} from "./effects/offer.effects";
import {OfferRequestEffects} from "./effects/offer-request.effects";
import {RatingEffects} from "./effects/rating.effects";
import {MaterializeDirective} from "angular2-materialize";
import {RouterModule} from "@angular/router";

@NgModule({
  bootstrap: [
    App
  ],
  declarations: [
    App,
    MaterializeDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AgmCoreModule,
    RouterModule,
    StoreModule.provideStore(reducer),
    EffectsModule.run(CampEffects),
    EffectsModule.run(HotelEffects),
    EffectsModule.run(OfferEffects),
    EffectsModule.run(OfferRequestEffects),
    EffectsModule.run(RatingEffects),
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthHttp,
    provideAuth({
      headerName: 'Authorization',
      headerPrefix: 'bearer',
      tokenName: 'token',
      tokenGetter: (() => localStorage.getItem('id_token')),
      globalHeaders: [{ 'Content-Type': 'application/json' }],
      noJwtError: false
    }),
    MarkdownConverter,
    AuthGuard,
    services,
    ...ACTIONS
  ]
})

export class AppModule {

}
