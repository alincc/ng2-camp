import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/pluck';
import {Hotel, Offer} from '../../../model/backend-typings';
import {OfferService} from '../../../shared/offer.service';

@Component({
  selector: 'offer-list',
  directives: [],
  providers: [OfferService],
  template: require('./offer-list.component.html')
})
export class OfferListComponent implements OnInit {

  @Input() hotelObservable: Observable<Hotel>;

  offers: Observable<Offer[]>;

  constructor(private offerService: OfferService) {
  }

  ngOnInit(): any {
    this.offers = this.hotelObservable.flatMap(hotel => this.offerService.getByHotelId(hotel.id));
  }
}
