import {Routes, Route} from "@ngrx/router";
import {HotelsComponent} from "../components/hotel-overview/hotels.component";
import {HotelDetailComponent} from "../components/hotel-detail/hotel-detail.component";
import {LoginComponent} from "../components/login/login.component";
import {AuthGuard} from "./authGuard";
import {HotelNewComponent} from "../components/hotel-new/hotel-new.component";
import {CampsComponent} from "../components/camp-overview/camps.component";

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
    path: '/hotels/new',
    component: HotelNewComponent
  },
  {
    path: '/hotels/:id',
    guards: [AuthGuard],
    component: HotelDetailComponent
  },
  {
    path: '/camps',
    guards: [AuthGuard],
    component: CampsComponent
  },
  {
    path: '/login',
    component: LoginComponent
  }
] as Route[];
