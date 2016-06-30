import {Routes, Route} from '@ngrx/router';
import {HotelDetailPageComponent} from '../pages/hotel-detail/hotel-detail.page.component';
import {LoginComponent} from '../components/login/login.component';
import {AuthGuard} from './authGuard';
import {CampOverviewPageComponent} from '../pages/camp-overview/camp-overview.page.component';
import {CampEditPageComponent} from '../pages/camp-edit/camp-edit.page.component';
import {HotelEditPageComponent} from '../pages/hotel-edit/hotel-edit.page.component';
import {MailTemplatesComponent} from '../components/mail-templates/mailtemplates.component';
import {CampWorkflowPageComponent} from '../pages/camp-workflow/camp-workflow.page.component';
import {OfferEditPageComponent} from '../pages/offer-edit/offer-edit.page.component';
import {OfferRequestEditPageComponent} from '../pages/offer-requests-edit/offer-request-edit.page.component.ts';
import {HotelOverviewPageComponent} from '../pages/hotel-overview/hotel-overview.page.component';

export const routes: Routes = [
  {
    path: '/',
    redirectTo: '/hotels'
  },
  {
    path: '/hotels',
    guards: [AuthGuard],
    component: HotelOverviewPageComponent
  },
  {
    path: '/hotels/:hotelId',
    guards: [AuthGuard],
    component: HotelDetailPageComponent
  },
  {
    path: '/hotels/edit/:hotelId',
    guards: [AuthGuard],
    component: HotelEditPageComponent
  },
  {
    path: '/camps',
    guards: [AuthGuard],
    component: CampOverviewPageComponent
  },
  // {
  //   path: '/camps/:campId',
  //   guards: [AuthGuard],
  //   component: CampDetailPageComponent
  // },
  {
    path: '/camps/:campId',
    guards: [AuthGuard],
    component: CampWorkflowPageComponent
  },
  {
    path: '/camps/edit/:campId',
    guards: [AuthGuard],
    component: CampEditPageComponent
  },
  {
    path: '/camps/:campId/offer-requests/edit/:offerRequestId',
    guards: [AuthGuard],
    component: OfferRequestEditPageComponent
  },
  {
    path: '/offers/edit/:offerId',
    guards: [AuthGuard],
    component: OfferEditPageComponent
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
