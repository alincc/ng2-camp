import {Component, Input} from '@angular/core';
import {Camp} from '../../../model/backend-typings';
import {MaterializeDirective} from 'angular2-materialize/dist/index';

@Component({
  selector: 'camp-date',
  directives: [MaterializeDirective],
  template: require('./camp-date.component.html')
})
export class CampDateComponent {

  @Input()
  camp: Camp;

  createDoodle() {
    window.open('http://doodle.com/create?type=date&locale=en'
      + '&title=' + this.camp.name
      + '&name=' + this.camp.organizer
      // + '&description=' + this.camp.notes
      ,'_blank');
  }
}
