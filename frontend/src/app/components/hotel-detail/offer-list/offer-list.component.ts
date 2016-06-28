import {Component, Input} from '@angular/core';
import 'rxjs/add/operator/pluck';
import {Offer} from '../../../model/backend-typings';

@Component({
  selector: 'offer-list',
  directives: [],
  providers: [],
  template: require('./offer-list.component.html')
})
export class OfferListComponent {

  @Input()
  offers: Offer[];
}
