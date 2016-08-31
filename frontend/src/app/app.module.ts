import "materialize-css";
import "angular2-materialize";
import {AuthHttp, provideAuth} from 'angular2-jwt';
import {StoreModule} from '@ngrx/store';
import {RouterStoreModule} from '@ngrx/router-store';
import {EffectsModule} from '@ngrx/effects';
import {AgmCoreModule } from 'angular2-google-maps/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';
import {FormsModule}   from '@angular/forms';
import {routes} from './routes/routes';
import {AuthGuard} from './routes/authGuard';
import reducer from './reducers';
import {ACTIONS} from './actions';
import services from './shared';
import {App} from './app.component';
import {MarkdownConverter} from "./components/markdown/markDownConverter";
import {CampEffects} from "./effects/camp.effects";
import {HotelEffects} from "./effects/hotel.effects";
import {OfferEffects} from "./effects/offer.effects";
import {OfferRequestEffects} from "./effects/offer-request.effects";
import {RatingEffects} from "./effects/rating.effects";
import {MaterializeDirective} from "angular2-materialize";
import {RouterModule} from "@angular/router";
import {HotelExistsGuard} from "./routes/hotelExistsGuard";
import {OfferExistsGuard} from "./routes/offerExistsGuard";
import {OfferRequestExistsGuard} from "./routes/offerRequestExistsGuard";
import {RatingExistsGuard} from "./routes/ratingExistsGuard";
import {CampExistsGuard} from "./routes/campExistsGuard";
import {LoginComponent} from "./components/login/login.component";
import {MailTemplatesComponent} from "./components/mail-templates/mailtemplates.component";
import {OfferEditPageComponent} from "./pages/offer-edit/offer-edit.page.component";
import {OfferRequestEditPageComponent} from "./pages/offer-requests-edit/offer-request-edit.page.component";
import {CampWorkflowPageComponent} from "./pages/camp-workflow/camp-workflow.page.component";
import {CampOverviewPageComponent} from "./pages/camp-overview/camp-overview.page.component";
import {HotelEditPageComponent} from "./pages/hotel-edit/hotel-edit.page.component";
import {HotelDetailPageComponent} from "./pages/hotel-detail/hotel-detail.page.component";
import {HotelOverviewPageComponent} from "./pages/hotel-overview/hotel-overview.page.component";

@NgModule({
  bootstrap: [
    App
  ],
  declarations: [
    App,
    MaterializeDirective,
    HotelOverviewPageComponent,
    HotelDetailPageComponent,
    HotelEditPageComponent,
    CampOverviewPageComponent,
    CampWorkflowPageComponent,
    OfferRequestEditPageComponent,
    OfferEditPageComponent,
    MailTemplatesComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AgmCoreModule.forRoot(),
    RouterModule,
    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
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
      globalHeaders: [{'Content-Type': 'application/json'}],
      noJwtError: false
    }),
    MarkdownConverter,
    AuthGuard,
    HotelExistsGuard,
    OfferExistsGuard,
    OfferRequestExistsGuard,
    RatingExistsGuard,
    CampExistsGuard,
    services,
    ...ACTIONS
  ]
})

export class AppModule {

}
