import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {Camp, RequestStatus} from '../../../model/backend-typings';

@Component({
  selector: 'camp-offers',
  template: require('./camp-offers.component.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampOffersComponent {

  @Input()
  camp: Camp;

  getStatusColor(status:RequestStatus) {
    switch (status) {
      case 'REQUEST_SENT':
      case 'WAITING_FOR_CLARIFCATION':
        return 'yellow accent-1';
      case 'OFFER_CONFIRMED':
        return 'light-green accent-1';
      case 'OFFER_DECLINED':
        return 'red accent-1';
      default:
        return 'light-blue accent-1';
    }
  }
}
