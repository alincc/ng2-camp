import {Component, Input} from '@angular/core';
import {Camp, Offer} from '../../../model/backend-typings';
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
}
