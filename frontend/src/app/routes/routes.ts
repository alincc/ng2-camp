import {Routes, Route} from "@ngrx/router";
import {HotelOverviewComponent} from "../components/hotel-overview/hotel-overview.component";
import {HotelDetailComponent} from "../components/hotel-detail/hotel-detail.component";
import {LoginComponent} from "../components/login/login.component";
import {AuthGuard} from "./authGuard";
import {CampOverviewComponent} from "../components/camp-overview/camp-overview.component";
import {CampEditComponent} from "../components/camp-edit/camp-edit.component";
import {HotelEditComponent} from "../components/hotel-edit/hotel-edit.component";
import {MailTemplatesComponent} from "../components/mail-templates/mailtemplates.component";
import {CampDetailComponent} from "../components/camp-detail/camp-detail.component";
import {OfferEditComponent} from '../components/offer-edit/offer-edit.component';

export const routes: Routes = [
  {
    path: '/',
    redirectTo: '/hotels'
  },
  {
    path: '/hotels',
    guards: [AuthGuard],
    component: HotelOverviewComponent
  },
  {
    path: '/hotels/:id',
    guards: [AuthGuard],
    component: HotelDetailComponent
  },
  {
    path: '/hotels/edit/:id',
    guards: [AuthGuard],
    component: HotelEditComponent
  },
  {
    path: '/camps',
    guards: [AuthGuard],
    component: CampOverviewComponent
  },
  {
    path: '/camps/new',
    guards: [AuthGuard],
    component: CampEditComponent
  },
  {
    path: '/camps/:id',
    guards: [AuthGuard],
    component: CampDetailComponent
  },
  {
    path: '/offers/new',
    guards: [AuthGuard],
    component: OfferEditComponent
  },
  {
    path: '/mailtemplates',
    guards: [AuthGuard],
    component: MailTemplatesComponent
  },
  {
    path: '/login',
    component: LoginComponent
  }
] as Route[];
