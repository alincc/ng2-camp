import {Component, Input} from '@angular/core';
import {Camp, RequestStatus} from '../../../model/backend-typings';
import {MaterializeDirective} from 'angular2-materialize/dist/index';
import {OfferEditComponent} from '../../offer-edit/offer-edit.component';
import {MailTemplatesComponent} from '../../mail-templates/mailtemplates.component';

@Component({
  selector: 'camp-offers',
  directives: [MaterializeDirective, OfferEditComponent, MailTemplatesComponent],
  template: require('./camp-offers.component.html')
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
