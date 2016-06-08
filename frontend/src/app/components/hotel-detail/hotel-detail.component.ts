import {Component, OnInit} from '@angular/core';
import {RouteParams, Router} from '@ngrx/router';
import 'rxjs/add/operator/pluck';
import {HotelService} from '../../shared/hotel.service';
import {Hotel} from '../../model/backend-typings';
import * as Materialize from 'angular2-materialize/dist/index';
import {MaterializeDirective} from 'angular2-materialize/dist/index';
import {MapComponent} from './map/map.component';

@Component({
  selector: 'hotel-detail',
  directives: [MaterializeDirective, MapComponent],
  providers: [],
  template: require('./hotel-detail.component.html')
})
export class HotelDetailComponent implements  OnInit{
  hotel:Hotel = {};
  dataFetched: boolean = false;

  constructor(private routeParams:RouteParams,
              private hotelService:HotelService,
              private router:Router) {
  }
  ngOnInit():any {
    let hotelId = this.routeParams.pluck<number>('id');
    hotelId
      .filter(id => !isNaN(id))
      .flatMap(id => this.hotelService.getHotel(id))
      .subscribe((hotel:Hotel) => {
        this.hotel = hotel;
        this.dataFetched = true;
      });
  }

  editHotel() {
    if (this.hotel && this.hotel.id) {
      this.router.go(`/hotels/edit/${this.hotel.id}`);
    }
  }

  deleteHotel() {
    if (this.hotel && this.hotel.id) {
      this.hotelService.deleteHotel(this.hotel.id).subscribe(response => {
        Materialize.toast('Deleted hotel', 4000, 'rounded');
        this.router.go('/hotels');
      }, error => {
        Materialize.toast('Error: Could not delete hotel', 4000, 'rounded');
      });
    }
  }

  getHotelImage() {
    return this.hotel.pictureUrl ? this.hotel.pictureUrl : '/assets/img/default_image.png';
  }
}
