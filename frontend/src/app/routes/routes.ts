import {Routes, Route} from '@ngrx/router';
import {HotelOverviewComponent} from '../components/hotel-overview/hotel-overview.component';
import {HotelDetailComponent} from '../components/hotel-detail/hotel-detail.component';
import {LoginComponent} from '../components/login/login.component';
import {AuthGuard} from './authGuard';
import {CampOverviewComponent} from '../components/camp-overview/camp-overview.component';
import {CampEditComponent} from '../components/camp-edit/camp-edit.component';
import {HotelEditComponent} from '../components/hotel-edit/hotel-edit.component';
import {MailTemplatesComponent} from '../components/mail-templates/mailtemplates.component';
import {CampDetailComponent} from '../components/camp-detail/camp-detail.component';
import {OfferEditComponent} from '../components/offer-edit/offer-edit.component';
import {OfferRequestNewComponent} from '../components/offer-requests-new/offer-requests-new.component.ts';

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
    path: '/hotels/:hotelId',
    guards: [AuthGuard],
    component: HotelDetailComponent
  },
  {
    path: '/hotels/edit/:editHotelId',
    guards: [AuthGuard],
    component: HotelEditComponent
  },
  {
    path: '/camps',
    guards: [AuthGuard],
    component: CampOverviewComponent
  },
  {
    path: '/camps/:campId',
    guards: [AuthGuard],
    component: CampDetailComponent
  },
  {
    path: '/camps/edit/:campId',
    guards: [AuthGuard],
    component: CampEditComponent
  },
  {
    path: '/camps/:campId/offer-requests/new',
    guards: [AuthGuard],
    component: OfferRequestNewComponent
  },
  {
    path: '/offers/edit/:offerId',
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
