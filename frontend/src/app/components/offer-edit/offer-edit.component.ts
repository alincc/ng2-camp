import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Offer} from '../../model/backend-typings';
import {MaterializeDirective} from 'angular2-materialize/dist/index';

@Component({
  selector: 'offer-edit',
  directives: [MaterializeDirective],
  template: require('./offer-edit.component.html')
})
export class OfferEditComponent {

  @Input()
  offer: Offer;
  @Output()
  saveOffer = new EventEmitter<Offer>();
}
