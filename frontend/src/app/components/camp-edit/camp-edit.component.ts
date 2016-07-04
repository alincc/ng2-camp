import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {Camp, CampStatus} from '../../model/backend-typings';
import {MaterializeDirective} from 'angular2-materialize';
import {NgClass} from '@angular/common';

@Component({
  selector: 'camp-edit',
  directives: [MaterializeDirective, NgClass],
  template: require('./camp-edit.component.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampEditComponent {

  @Input()
  camp:Camp;
  @Output()
  saveCamp = new EventEmitter<Camp>();

  campStates:CampStatus[] = ['CREATED_CAMP', 'CREATED_DOODLE', 'FIXED_DATE', 'GETTING_HOTEL_OFFERS', 'ACCEPTED_HOTEL_OFFER',
    'DECLINED_REMAINING_OFFERS', 'READY', 'OTHER', 'FURTHER_CLARIFICATION_NEEDED', 'CANCELLED'];
}
