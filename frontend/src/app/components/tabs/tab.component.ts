import {Component, Input} from '@angular/core';
import {TabsComponent} from './tabs.component.ts';

@Component({
  selector: 'tab',
  styles: [`
    .pane{
      padding: 1em;
    }
  `],
  template: `
    <div [hidden]="!active" class="tab">
      <ng-content></ng-content>
    </div>
  `
})
export class TabComponent {
  @Input('tab-title') title: string;
  active: boolean;

  constructor(tabs: TabsComponent){
    tabs.addTab(this);

  }
}
