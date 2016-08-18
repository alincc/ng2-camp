import "angular2-materialize";
import {AUTH_PROVIDERS} from 'angular2-jwt';
import {provideRouter, LinkTo} from '@ngrx/router';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {AgmCoreModule} from 'angular2-google-maps/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

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
    HttpModule,
    AgmCoreModule,
    StoreModule.provideStore(reducer),
    EffectsModule.run(CampEffects),/*
    EffectsModule.run(HotelEffects),
    EffectsModule.run(OfferEffects),
    EffectsModule.run(OfferRequestEffects),
    EffectsModule.run(RatingEffects)*/
  ],
  providers: [
    ...AUTH_PROVIDERS,
    MarkdownConverter,
    AuthGuard,
    services,
    ...ACTIONS,
    provideRouter(routes),
  ]
})

export class AppModule {

}
