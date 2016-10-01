import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Hotel, OfferRequest} from '../../model/backend-typings';
import {RequestStatusEnum} from "../../model/RequestStatusEnum";

@Component({
  selector: 'offer-request-edit',
  template: require('./offer-request-edit.component.html')
})
export class OfferRequestEditComponent {

  @Input()
  hotels:Hotel[];
  @Input()
  offerRequest:OfferRequest;
  @Input()
  requestStatusList:RequestStatusEnum[];
  @Output()
  saveOfferRequest = new EventEmitter<OfferRequest>();

  statusChanged(newValue) {
    this.offerRequest.lastStatusChange = new Date();
  }
}
