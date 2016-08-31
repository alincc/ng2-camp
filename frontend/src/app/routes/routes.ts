import {HotelDetailPageComponent} from '../pages/hotel-detail/hotel-detail.page.component';
import {LoginComponent} from '../components/login/login.component';
import {AuthGuard} from './authGuard';
import {CampOverviewPageComponent} from '../pages/camp-overview/camp-overview.page.component';
import {HotelEditPageComponent} from '../pages/hotel-edit/hotel-edit.page.component';
import {MailTemplatesComponent} from '../components/mail-templates/mailtemplates.component';
import {CampWorkflowPageComponent} from '../pages/camp-workflow/camp-workflow.page.component';
import {OfferEditPageComponent} from '../pages/offer-edit/offer-edit.page.component';
import {OfferRequestEditPageComponent} from '../pages/offer-requests-edit/offer-request-edit.page.component.ts';
import {HotelOverviewPageComponent} from '../pages/hotel-overview/hotel-overview.page.component';
import {HotelExistsGuard} from '../routes/hotelExistsGuard';
import {CampExistsGuard} from "./campExistsGuard";
import {OfferRequestExistsGuard} from "./offerRequestExistsGuard";
import {OfferExistsGuard} from "./offerExistsGuard";
import {Routes} from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'hotels',
    pathMatch: 'full'
  },
  {
    path: 'hotels',
    canActivate: [AuthGuard],
    component: HotelOverviewPageComponent
  },
  {
    path: 'hotels/:hotelId',
    canActivate: [AuthGuard, HotelExistsGuard],
    component: HotelDetailPageComponent
  },
  {
    path: 'hotels/edit/:hotelId',
    canActivate: [AuthGuard, HotelExistsGuard],
    component: HotelEditPageComponent
  },
  {
    path: 'hotels/new',
    canActivate: [AuthGuard],
    component: HotelEditPageComponent
  },
  {
    path: 'camps',
    canActivate: [AuthGuard],
    component: CampOverviewPageComponent
  },
  {
    path: 'camps/:campId',
    canActivate: [AuthGuard, CampExistsGuard],
    component: CampWorkflowPageComponent
  },
  {
    path: 'camps/:campId/offer-requests/edit/:offerRequestId',
    canActivate: [AuthGuard, OfferRequestExistsGuard],
    component: OfferRequestEditPageComponent
  },
  {
    path: 'offers/edit/:offerId',
    canActivate: [AuthGuard, OfferExistsGuard],
    component: OfferEditPageComponent
  },
  {
    path: 'mailtemplates',
    canActivate: [AuthGuard],
    component: MailTemplatesComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
