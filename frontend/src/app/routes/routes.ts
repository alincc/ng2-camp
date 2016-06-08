import {Routes, Route} from "@ngrx/router";
import {LoginComponent} from "../components/login/login.component";
import {AuthGuard} from "./authGuard";
import {HotelsComponent} from "../components/hotel-overview/hotels.component";
import {HotelDetailComponent} from "../components/hotel-detail/hotel-detail.component";
import {HotelEditComponent} from "../components/hotel-edit/hotel-edit.component";
import {CampsComponent} from "../components/camp-overview/camps.component";
import {CampNewComponent} from "../components/camp-new/camp-new.component";
// import {MailTemplatesComponent} from "../components/mail-templates/mailtemplates.component";

export const routes: Routes = [
  {
    path: '/',
    redirectTo: '/hotels'
  },
  {
    path: '/hotels',
    guards: [AuthGuard],
    component: HotelsComponent
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
    component: CampsComponent
  },
  {
    path: '/camps/new',
    guards: [AuthGuard],
    component: CampNewComponent
  },
  // {
  //   path: '/mailtemplates',
  //   guards: [AuthGuard],
  //   component: MailTemplatesComponent
  // },
  {
    path: '/login',
    component: LoginComponent
  }
] as Route[];
