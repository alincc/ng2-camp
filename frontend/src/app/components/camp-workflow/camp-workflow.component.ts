import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Camp, Hotel} from '../../model/backend-typings';

@Component({
  selector: 'camp-workflow',
  template: require('./camp-workflow.component.html'),
  styles: [
    require('./camp-workflow.component.scss')
  ]
})
export class CampWorkflowComponent {

  @Input()
  camp: Camp;

  @Input()
  hotels: Observable<Hotel[]>;

  @Input()
  step: number = 0;

  changeStep(id: string) {
    let tabs:any = $('ul.tabs');
    tabs.tabs('select_tab', id);
  }
}
