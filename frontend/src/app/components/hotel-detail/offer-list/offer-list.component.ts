import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import 'rxjs/add/operator/pluck';
import {Offer} from '../../../model/backend-typings';

@Component({
  selector: 'offer-list',
  directives: [],
  providers: [],
  template: require('./offer-list.component.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferListComponent {

  @Input()
  offers: Offer[];
}
